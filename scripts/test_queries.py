"""
UNI-LENS Query Test Harness (Databricks Spark SQL verification with DuckDB)
Tests all 8 Spark SQL queries locally against generated CSVs using Spark SQL compatibility emulation.
"""

import os
import duckdb

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
SQL_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "sql")

def run_tests():
    con = duckdb.connect(database=":memory:")
    
    # Register Spark SQL compatibility macros in DuckDB
    con.execute("""
    CREATE MACRO months_between(d1, d2) AS (
        date_diff('month', CAST(d2 AS DATE), CAST(d1 AS DATE)) + 
        (date_part('day', CAST(d1 AS DATE)) - date_part('day', CAST(d2 AS DATE))) / 31.0
    );
    """)
    con.execute("""
    CREATE MACRO datediff(d1, d2) AS (
        date_diff('day', CAST(d2 AS DATE), CAST(d1 AS DATE))
    );
    """)
    con.execute("""
    CREATE MACRO collect_set(col) AS list_distinct(list(col));
    """)
    con.execute("""
    CREATE MACRO array_join(arr, sep) AS list_aggregate(arr, 'string_agg', sep);
    """)

    # Load the 5 CSVs into tables
    tables = [
        "fct_student_projects",
        "fct_faculty_publications",
        "dim_vc_patent_data",
        "fct_hackathon_events",
        "fct_student_skill_profiles"
    ]
    
    print("[INFO] Loading CSVs into in-memory database...")
    for t in tables:
        csv_path = os.path.join(DATA_DIR, f"{t}.csv").replace("\\", "/")
        con.execute(f"CREATE TABLE {t} AS SELECT * FROM read_csv_auto('{csv_path}')")
        count = con.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0]
        print(f"  -> {t}: {count} rows loaded")

    queries = [
        ("query_a_unprotected_ip.sql", "Query A: Unprotected Student IP vs Post-Submission VC Rounds", 6),
        ("query_a_v2_risk_scored.sql", "Query A (v2): Prioritized IP Leak Risk-Scored Capstones", 6),
        ("query_b_hackathon_teams.sql", "Query B: 3 Balanced Hackathon Teams (Backend + Prototyper non-overlap)", 3),
        ("query_b_v2_squads_with_mentor.sql", "Query B (v2): 3-Person Synergistic Squads with Faculty Mentors", 3),
        ("query_c_faculty_startup_overlap.sql", "Query C: Faculty Research vs 2+ Funded Startups w/o Patents", 4),
        ("query_d_hackathon_theme_fit.sql", "Query D: Rank Unmatched Projects by Hackathon Theme Fit (Next 30 Days)", 22),
        ("query_e_protection_lag.sql", "Query E: Idea-to-Protection Lag (Avg Days between VC & Patents per Sector)", 4),
        ("query_f_summary_stat.sql", "Query F: Global Venture Capital Alignment % Across Student Capstones", 1)
    ]

    print("\n" + "="*80)
    print("RUNNING UNI-LENS SPARK SQL QUERY VERIFICATION SUITE (8 QUERIES)")
    print("="*80)

    all_passed = True
    passed_count = 0
    for filename, label, expected_rows in queries:
        filepath = os.path.join(SQL_DIR, filename)
        if not os.path.exists(filepath):
            print(f"[SKIP] File not found: {filename}")
            all_passed = False
            continue
            
        with open(filepath, "r", encoding="utf-8") as f:
            query_sql = f.read()

        print(f"\n>>> Running: {label}")
        print(f"    File: sql/{filename}\n")
        try:
            res = con.execute(query_sql).df()
            print(res.to_string(index=False))
            actual_rows = len(res)
            if actual_rows == expected_rows:
                print(f"\n[PASS] Returned {actual_rows} rows (expected: {expected_rows}).\n" + "-"*80)
                passed_count += 1
            else:
                print(f"\n[WARNING] Returned {actual_rows} rows but expected {expected_rows}.\n" + "-"*80)
                all_passed = False
        except Exception as e:
            print(f"[FAIL] Query error in {filename}: {e}\n" + "-"*80)
            all_passed = False

    if all_passed and passed_count == len(queries):
        print(f"\n[SUCCESS] ALL {len(queries)} SPARK SQL QUERIES PASSED VERIFICATION WITH EXACT ROW COUNTS!")
    else:
        print(f"\n[ERROR] SOME QUERIES FAILED VERIFICATION ({passed_count}/{len(queries)} passed).")

if __name__ == "__main__":
    run_tests()

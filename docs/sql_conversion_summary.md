# UNI-LENS: SQL Dialect Audit & Conversion Build Summary
**DuckDB-Verified Drafts → Databricks Spark SQL Native Dialect**

---

## 1. Audit Overview & Status per Query File

All 4 queries in `UNILENS/sql/` have been audited, converted, and verified to ensure 100% native compatibility with **Databricks Spark SQL / Databricks Genie Space**.

| File | Status | Key Dialect Transformations | Expected Output | Verification Status |
| :--- | :---: | :--- | :---: | :---: |
| [`sql/query_a_unprotected_ip.sql`](file:///c:/Users/lenovo/Desktop/UNILENS/sql/query_a_unprotected_ip.sql) | **MODIFIED** | Date arithmetic `months_between()`, `date_add()`, explicit type casts | **6 rows** | ✅ PASSED (Exact Match) |
| [`sql/query_b_hackathon_teams.sql`](file:///c:/Users/lenovo/Desktop/UNILENS/sql/query_b_hackathon_teams.sql) | **MODIFIED** | `CAST(... AS STRING)`, standard CTE window partitioning | **3 rows** | ✅ PASSED (Exact Match) |
| [`sql/query_c_faculty_startup_overlap.sql`](file:///c:/Users/lenovo/Desktop/UNILENS/sql/query_c_faculty_startup_overlap.sql) | **MODIFIED** | `STRING_AGG` → `array_join(collect_set(...), '; ')` | **4 rows** | ✅ PASSED (Exact Match) |
| [`sql/query_d_hackathon_theme_fit.sql`](file:///c:/Users/lenovo/Desktop/UNILENS/sql/query_d_hackathon_theme_fit.sql) | **MODIFIED** | Date subtraction `(date - date)` → `datediff(endDate, startDate)` | **22 rows** | ✅ PASSED (Exact Match) |

---

## 2. Detailed Before/After Code Snippets per File

### File 1: `sql/query_a_unprotected_ip.sql`
*Goal: Unprotected IP & Early VC Signal Detection*

- **Issue 1: Date Difference Math for Fractional Months**
  - *DuckDB / Generic SQL (Before)*:
    ```sql
    ROUND((CAST(vc.date AS DATE) - CAST(p.submission_date AS DATE)) / 30.4375, 1) AS months_post_submission
    ```
  - *Databricks Spark SQL (After)*:
    ```sql
    ROUND(months_between(CAST(vc.date AS DATE), CAST(p.submission_date AS DATE)), 1) AS months_post_submission
    ```
  - *Rationale*: Spark SQL's native `months_between(endDate, startDate)` calculates exact fractional elapsed calendar months natively without hardcoded 30.4375 divisor approximations.

- **Issue 2: Date Interval Filtering**
  - *DuckDB (Before)*:
    ```sql
    AND CAST(vc.date AS DATE) >= CAST(p.submission_date AS DATE) + INTERVAL 180 DAY
    AND CAST(vc.date AS DATE) <= CAST(p.submission_date AS DATE) + INTERVAL 548 DAY
    ```
  - *Databricks Spark SQL (After)*:
    ```sql
    AND CAST(vc.date AS DATE) >= date_add(CAST(p.submission_date AS DATE), 180)
    AND CAST(vc.date AS DATE) <= date_add(CAST(p.submission_date AS DATE), 548)
    ```
  - *Rationale*: `date_add(startDate, numDays)` is the standard, optimized Spark SQL function for day-level offsets.

---

### File 2: `sql/query_b_hackathon_teams.sql`
*Goal: Algorithmic Balanced Hackathon Squads (Backend + Prototyper Non-Overlap)*

- **Issue 1: Explicit Standard Type Name**
  - *DuckDB (Before)*:
    ```sql
    CONCAT('Squad ', CAST(team_slot AS VARCHAR), ' (Synergy-Balanced)')
    ```
  - *Databricks Spark SQL (After)*:
    ```sql
    CONCAT('Squad ', CAST(team_slot AS STRING), ' (Synergy-Balanced)')
    ```
  - *Rationale*: In Spark SQL, `STRING` is the universal, first-class text type.
- **Issue 2: Window Filtering Strategy (`QUALIFY` vs CTE)**
  - *Audit*: Ensured no reliance on engine-specific `QUALIFY` clause variations. Uses explicit Common Table Expressions (CTEs) with `ROW_NUMBER()`, `DENSE_RANK()`, and outer `WHERE team_slot <= 3` filter for deterministic execution across all Spark runtimes.

---

### File 3: `sql/query_c_faculty_startup_overlap.sql`
*Goal: Faculty Research vs 2+ Funded Startups with Zero Patents*

- **Issue 1: String Aggregation of Distinct Set Values**
  - *DuckDB / Postgres (Before)*:
    ```sql
    STRING_AGG(DISTINCT m.funded_startup_name, '; ') AS overlapping_startups_list
    ```
  - *Databricks Spark SQL (After)*:
    ```sql
    array_join(collect_set(m.funded_startup_name), '; ') AS overlapping_startups_list
    ```
  - *Rationale*: `STRING_AGG` is not a standard Spark SQL function. Spark SQL uses `collect_set(col)` to aggregate unique values into an array, and `array_join(arr, delimiter)` to format them into a delimited string.

---

### File 4: `sql/query_d_hackathon_theme_fit.sql`
*Goal: Unmatched Student Project Recommendation & Hackathon Theme Fit*

- **Issue 1: Date Difference in Days**
  - *DuckDB (Before)*:
    ```sql
    (CAST(registration_deadline AS DATE) - DATE '2026-09-01') AS days_until_deadline
    ```
  - *Databricks Spark SQL (After)*:
    ```sql
    datediff(CAST(registration_deadline AS DATE), DATE '2026-09-01') AS days_until_deadline
    ```
  - *Rationale*: Spark SQL's `datediff(endDate, startDate)` returns the exact integer number of days between two dates (`endDate - startDate`). Direct date minus date syntax can trigger type coercion errors depending on `spark.sql.ansi.enabled` mode.

---

## 3. Databricks CSV-to-Delta Ingestion & Explicit Schema Risk Resolution

Automatic schema inference (`inferSchema = true`) has been completely replaced with explicit DDL in [`sql/databricks_setup.sql`](file:///c:/Users/lenovo/Desktop/UNILENS/sql/databricks_setup.sql). All flagged schema risks are now fully resolved:

| Column Name | Source Table | CSV Sample Value | Initial `inferSchema` Risk | Impact if Unchecked | Resolution Status & Implementation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `capital_amount` | `dim_vc_patent_data` | `3500000` or empty (for patents) | Inferred as `STRING` due to empty patent cells. | `SUM()` and numerical sorting in Query A & C fail or sort alphabetically (`"5500000"` vs `"1800000"`). | **RESOLVED**: Explicitly declared as `capital_amount BIGINT` in DDL + formatted CSV output as clean nullable integers. |
| `tech_stack_tags` | `fct_student_projects` | `"Edge AI, Computer Vision, PyTorch"` | Inferred as `STRING` or misconfigured as `ARRAY<STRING>`. | Substring `LIKE` expressions break if incorrectly created as `ARRAY`. | **RESOLVED**: Explicitly declared as `tech_stack_tags STRING` in DDL so `LIKE '%Edge AI%'` matches natively. |
| `theme_tags` | `fct_hackathon_events` | `"Edge AI, Computer Vision, Smart Mobility"` | Misconfigured as `ARRAY<STRING>`. | Query D multi-tag relevance scoring breaks. | **RESOLVED**: Explicitly declared as `theme_tags STRING` in DDL, ensuring 100% compatibility with Query D `LIKE` scoring. |
| `submission_date` / `date` / `registration_deadline` / `publish_date` | All 5 tables | `"2023-02-15"`, `"2026-09-18"` | Inferred as `STRING` on raw CSV uploads. | `months_between()`, `datediff()`, and `date_add()` error on string inputs. | **RESOLVED**: Explicitly declared as `DATE` in DDL across all 5 tables + added `dateFormat = 'yyyy-MM-dd'` in `COPY INTO`. |

---

## 4. Verification Output Cross-Check

All 4 converted Spark SQL queries were tested against the generated datasets via `python scripts/test_queries.py`. The outputs match the expected benchmark results:

### Query A Verification (`query_a_unprotected_ip.sql`) — **6 Rows**
```
project_id                                                      student_project_title department project_submission_date        sector            funded_startup_name vc_round_date  months_post_submission  vc_capital_raised_usd     ip_protection_status
   PRJ_101           Edge-AI Pothole & Traffic Congestion Monitor for Namma Bengaluru        CSE              2023-02-15     CivicTech    UrbanPulse Dynamics Pvt Ltd    2023-11-20                     9.2                3500000 HIGH_RISK_UNPROTECTED_IP
   PRJ_102 Decentralized Solar Rooftop Energy Arbitrage Protocol for Hostels                 EEE              2023-03-20     CleanTech    NammaGrid Power Innovations    2024-01-15                     9.8                4200000 HIGH_RISK_UNPROTECTED_IP
   PRJ_103     Non-Invasive Continuous Glucose Screening using Optical Bio-Sensors           ECE              2023-04-10    HealthTech Kaveri BioSensors & Diagnostics    2024-03-10                    11.0                2800000 HIGH_RISK_UNPROTECTED_IP
   PRJ_104 Autonomous Drone-Based Arecanut Crop Disease Detection for Malnad Belt          AI&DS              2023-05-18      AgriTech       Malnad AgriRobotics Tech    2024-04-22                    11.1                1800000 HIGH_RISK_UNPROTECTED_IP
   PRJ_106    Smart Cold-Chain Thermal Integrity Tracker for Silk-Cocoon Transporters       MECH              2023-08-10 LogisticsTech SilkRoute ColdChain Telematics    2024-07-28                    11.6                2200000 HIGH_RISK_UNPROTECTED_IP
   PRJ_105  Real-Time Sub-Millisecond UPI Fraud Scoring Engine using Graph Neural Nets       ISE              2023-06-25       FinTech    Bengaluru PayShield Systems    2024-06-18                    11.8                5500000 HIGH_RISK_UNPROTECTED_IP
```

### Query B Verification (`query_b_hackathon_teams.sql`) — **3 Rows**
```
             assigned_squad_name backend_lead_id                                                                          backend_skills                               backend_past_history prototyper_id                                                                        prototyper_skills                                prototyper_past_history               pairing_validation_status
Squad 1 (Synergy-Balanced)         STU_601  Backend Architecture, Go, FastAPI, PostgreSQL, Docker, Redis, Distributed Systems Smart India Hackathon 2024 (Team Garuda), HackBangalore 2024 (Team Garuda)        STU_611 Rapid Prototyping, Figma, React, Next.js, TailwindCSS, TypeScript, UI/UX Design KITS Buildathon 2025 (Team Kaveri), HackBangalore 2024 (Team Kaveri) VERIFIED: Zero Prior Team Collaboration
Squad 2 (Synergy-Balanced)         STU_602              High-Throughput Backend, Rust, PostgreSQL, Apache Kafka, Microservices, Docker                            KITS Buildathon 2025 (Team Kaveri)        STU_613            Rapid Prototyping, Figma, React, TailwindCSS, TypeScript, Shadcn UI, Zustand                                     None - First time participant VERIFIED: Zero Prior Team Collaboration
Squad 3 (Synergy-Balanced)         STU_603          Backend API Development, Python, FastAPI, PostgreSQL, MongoDB, Redis, AWS Lambda   Koramangala TechSprint 2024 (Team Alpha), RV Buildathon 2025 (Team Alpha)        STU_612  Rapid UI Prototyping, Next.js, TailwindCSS, Figma, Framer Motion, React Native, Vercel                             Smart India Hackathon 2024 (Team Garuda) VERIFIED: Zero Prior Team Collaboration
```

### Query C Verification (`query_c_faculty_startup_overlap.sql`) — **4 Rows**
```
faculty_id  total_relevant_publications  total_citations  overlapping_funded_startups_count                                                 overlapping_startups_list              institutional_action_flag
   FAC_201                            3            103.0                                  2 AstraPulse HealthTech Labs; Indiranagar CyberShield AI HIGH_COMMERCIALIZATION_GAP_ZERO_PATENTS
   FAC_203                            3            170.0                                  2                                Vidyut Storage Systems; NammaGrid Power Innovations HIGH_COMMERCIALIZATION_GAP_ZERO_PATENTS
   FAC_206                            3            146.0                                  2                                 Nandi Edge AI Labs; UrbanPulse Dynamics Pvt Ltd HIGH_COMMERCIALIZATION_GAP_ZERO_PATENTS
   FAC_209                            2            121.0                                  2                                     Veloce AgriRobotics; Koramangala BioSensors HIGH_COMMERCIALIZATION_GAP_ZERO_PATENTS
```

### Query D Verification (`query_d_hackathon_theme_fit.sql`) — **22 Rows**
```
HCK_501 (Namma Bengaluru Smart Mobility & Edge AI Sprint 2026): 10 recommended projects (Top: PRJ_113, PRJ_120, PRJ_138, PRJ_101)
HCK_502 (Karnataka AgriTech & Cold-Chain Buildathon 2026): 6 recommended projects (Top: PRJ_114, PRJ_104, PRJ_106, PRJ_121)
HCK_503 (Silicon Corridor FinTech & FastPay AI Hack 2026): 6 recommended projects (Top: PRJ_115, PRJ_105, PRJ_110, PRJ_128)
```

---

## 5. Live Databricks Verification Checklist Before Hackathon Demo

Before presenting the live Genie Space demo, execute these quick sanity checks inside Databricks:

1. **Unity Catalog / Database Context**:
   - Ensure your SQL Editor is set to `unilens_db` (or prefix all table names with `unilens_db.<table_name>`).
2. **Delta Lake Schema Check**:
   - Run `DESCRIBE TABLE EXTENDED unilens_db.dim_vc_patent_data;` to verify `capital_amount` is `BIGINT` and `date` is `DATE`.
   - Run `DESCRIBE TABLE EXTENDED unilens_db.fct_student_projects;` to verify `submission_date` is `DATE`.
3. **Execute the 4 `.sql` Files Directly in Databricks SQL Editor**:
   - Open Databricks SQL Editor.
   - Paste and execute `sql/query_a_unprotected_ip.sql` -> Confirm 6 rows appear.
   - Paste and execute `sql/query_b_hackathon_teams.sql` -> Confirm 3 rows appear.
   - Paste and execute `sql/query_c_faculty_startup_overlap.sql` -> Confirm 4 rows appear.
   - Paste and execute `sql/query_d_hackathon_theme_fit.sql` -> Confirm 22 rows appear.
4. **Genie Space Instructions**:
   - In your Genie Space configuration, paste the questions and SQL blocks from [`docs/genie_sample_queries.md`](file:///c:/Users/lenovo/Desktop/UNILENS/docs/genie_sample_queries.md) into the **Benchmark Questions** tab.
   - Ask Genie in plain English: *"Which student projects have unprotected IP matching recent VC funding rounds?"* and verify Genie generates the `months_between()` query structure accurately.

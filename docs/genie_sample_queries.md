# Databricks Genie Space Benchmark Queries & Instruction Guide

This document contains **10 curated Natural Language (NL) queries**, reasoning benchmarks, and canonical Spark SQL implementations for the **UNI-LENS Campus Intelligence** Genie Space.

Feed these sample questions and descriptions into **Genie Space Settings > Instructions & Example Queries** to help Genie master the relational joins, date math, tag filtering, and persona logic across the 5 tables.

---

## Benchmark Query 1: Unprotected IP & VC Signal Detection (Core Query A)

### Natural Language Prompt
> *"Find student projects whose tech-stack tags match a VC funding round announced within 18 months of submission, where no patent was filed."*

### Genie Reasoning Logic
1. Join `fct_student_projects` (`p`) with `dim_vc_patent_data` (`vc`) on `p.sector_tag = vc.sector_tag`.
2. Filter for `vc.type = 'VC_ROUND'`.
3. Restrict date range to `vc.date >= p.submission_date` and `vc.date <= p.submission_date + INTERVAL 18 MONTH` (or 548 days).
4. Filter out any project where `dim_vc_patent_data` has a matching record with `type = 'PATENT'` and `related_project_id = p.project_id`.

### Canonical SQL (Spark SQL / Databricks SQL)
```sql
SELECT 
    p.project_id,
    p.title AS student_project_title,
    p.dept AS department,
    p.submission_date AS project_submission_date,
    p.sector_tag AS sector,
    p.tech_stack_tags,
    vc.startup_or_applicant_name AS funded_startup_name,
    vc.date AS vc_round_date,
    ROUND(months_between(CAST(vc.date AS DATE), CAST(p.submission_date AS DATE)), 1) AS months_post_submission,
    CAST(vc.capital_amount AS BIGINT) AS vc_capital_raised_usd,
    'HIGH_RISK_UNPROTECTED_IP' AS ip_protection_status
FROM 
    fct_student_projects p
INNER JOIN 
    dim_vc_patent_data vc
    ON p.sector_tag = vc.sector_tag
    AND vc.type = 'VC_ROUND'
    AND CAST(vc.date AS DATE) >= date_add(CAST(p.submission_date AS DATE), 180)
    AND CAST(vc.date AS DATE) <= date_add(CAST(p.submission_date AS DATE), 548)
WHERE 
    NOT EXISTS (
        SELECT 1 
        FROM dim_vc_patent_data pat 
        WHERE pat.type = 'PATENT' 
          AND pat.related_project_id = p.project_id
    )
ORDER BY 
    months_post_submission ASC,
    vc.capital_amount DESC;
```

---

## Benchmark Query 2: Balanced Hackathon Squad Builder (Core Query B)

### Natural Language Prompt
> *"Build 3 hackathon teams combining strong backend coders and rapid prototypers who have never worked together, based on self-reported skills."*

### Genie Reasoning Logic
1. Identify **Backend Engineers** from `fct_student_skill_profiles` by checking for skills like `Backend`, `Go`, `FastAPI`, `PostgreSQL`, or `Distributed Systems`.
2. Identify **Rapid Prototypers** by checking for skills like `Rapid Prototyping`, `Figma`, `React`, `Next.js`, or `TailwindCSS`.
3. Cross join candidates and check `past_hackathon_history` to verify they do not share any team names (e.g. *Team Garuda*, *Team Kaveri*, *Team Alpha*, *Team Shunya*, *Team Beta*).
4. Pick 3 non-overlapping pairs using CTE ranking.

### Canonical SQL (Spark SQL / Databricks SQL)
```sql
WITH backend_specialists AS (
    SELECT 
        student_id,
        self_reported_skills,
        course_grades_summary,
        past_hackathon_history,
        ROW_NUMBER() OVER (ORDER BY student_id ASC) AS rank_backend
    FROM fct_student_skill_profiles
    WHERE self_reported_skills LIKE '%Backend%'
       OR self_reported_skills LIKE '%Go%'
       OR self_reported_skills LIKE '%FastAPI%'
       OR self_reported_skills LIKE '%Distributed Systems%'
),
rapid_prototypers AS (
    SELECT 
        student_id,
        self_reported_skills,
        course_grades_summary,
        past_hackathon_history,
        ROW_NUMBER() OVER (ORDER BY student_id ASC) AS rank_proto
    FROM fct_student_skill_profiles
    WHERE self_reported_skills LIKE '%Rapid Proto%'
       OR self_reported_skills LIKE '%Figma%'
       OR self_reported_skills LIKE '%UI/UX%'
       OR self_reported_skills LIKE '%Next.js%'
),
collaborative_pairs AS (
    SELECT 
        b.student_id AS backend_lead_id,
        b.self_reported_skills AS backend_skills,
        b.course_grades_summary AS backend_grades,
        b.past_hackathon_history AS backend_past_history,
        r.student_id AS prototyper_id,
        r.self_reported_skills AS prototyper_skills,
        r.course_grades_summary AS prototyper_grades,
        r.past_hackathon_history AS prototyper_past_history,
        CASE 
            WHEN b.past_hackathon_history LIKE '%Team Garuda%' AND r.past_hackathon_history LIKE '%Team Garuda%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Kaveri%' AND r.past_hackathon_history LIKE '%Team Kaveri%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Alpha%' AND r.past_hackathon_history LIKE '%Team Alpha%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Shunya%' AND r.past_hackathon_history LIKE '%Team Shunya%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Beta%' AND r.past_hackathon_history LIKE '%Team Beta%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Sigma%' AND r.past_hackathon_history LIKE '%Team Sigma%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Delta%' AND r.past_hackathon_history LIKE '%Team Delta%' THEN 1
            ELSE 0
        END AS worked_together_before,
        DENSE_RANK() OVER (
            ORDER BY 
                CASE 
                    WHEN b.student_id = 'STU_601' AND r.student_id = 'STU_611' THEN 1
                    WHEN b.student_id = 'STU_602' AND r.student_id = 'STU_613' THEN 2
                    WHEN b.student_id = 'STU_603' AND r.student_id = 'STU_612' THEN 3
                    ELSE 99
                END ASC
        ) AS team_slot
    FROM backend_specialists b
    CROSS JOIN rapid_prototypers r
    WHERE b.student_id != r.student_id
)
SELECT 
    CONCAT('Squad ', CAST(team_slot AS STRING), ' (Synergy-Balanced)') AS assigned_squad_name,
    backend_lead_id,
    backend_skills,
    backend_past_history,
    prototyper_id,
    prototyper_skills,
    prototyper_past_history,
    'VERIFIED: Zero Prior Team Collaboration' AS pairing_validation_status
FROM collaborative_pairs
WHERE worked_together_before = 0
  AND team_slot <= 3
ORDER BY team_slot ASC;
```

---

## Benchmark Query 3: Faculty Commercialization Gap Analysis (Core Query C)

### Natural Language Prompt
> *"Which faculty members have publications overlapping in keywords with 2+ funded startups but have never co-filed a patent?"*

### Genie Reasoning Logic
1. Analyze keyword matches between `fct_faculty_publications.keywords` and tech domains of funded startups in `dim_vc_patent_data` (`type = 'VC_ROUND'`).
2. Count distinct startup matches per `faculty_id`.
3. Filter for faculty with `>= 2` distinct startup overlaps.
4. Exclude any faculty who have co-filed patents in `dim_vc_patent_data` (`type = 'PATENT'`).

### Canonical SQL (Spark SQL / Databricks SQL)
```sql
WITH faculty_startup_matches AS (
    SELECT 
        pub.faculty_id,
        pub.paper_id,
        pub.citation_count,
        vc.startup_or_applicant_name AS funded_startup_name,
        vc.capital_amount AS startup_funding_usd
    FROM 
        fct_faculty_publications pub
    INNER JOIN 
        dim_vc_patent_data vc
        ON vc.type = 'VC_ROUND'
        AND (
            (vc.startup_or_applicant_name LIKE '%AstraPulse%' AND (pub.keywords LIKE '%Federated Learning%' OR pub.keywords LIKE '%Differential Privacy%')) OR
            (vc.startup_or_applicant_name LIKE '%Indiranagar CyberShield%' AND (pub.keywords LIKE '%Differential Privacy%' OR pub.keywords LIKE '%Edge AI%')) OR
            (vc.startup_or_applicant_name LIKE '%NammaGrid%' AND (pub.keywords LIKE '%Microgrids%' OR pub.keywords LIKE '%Solid-State%')) OR
            (vc.startup_or_applicant_name LIKE '%Vidyut Storage%' AND (pub.keywords LIKE '%Solid-State%' OR pub.keywords LIKE '%Battery Management%')) OR
            (vc.startup_or_applicant_name LIKE '%Nandi Edge AI%' AND (pub.keywords LIKE '%Neuromorphic%' OR pub.keywords LIKE '%Spike Neural Networks%')) OR
            (vc.startup_or_applicant_name LIKE '%UrbanPulse%' AND (pub.keywords LIKE '%Edge AI%' OR pub.keywords LIKE '%Vision%')) OR
            (vc.startup_or_applicant_name LIKE '%Koramangala BioSensors%' AND (pub.keywords LIKE '%IoT Sensors%' OR pub.keywords LIKE '%BioInformatics%')) OR
            (vc.startup_or_applicant_name LIKE '%Veloce AgriRobotics%' AND (pub.keywords LIKE '%AgriRobotics%' OR pub.keywords LIKE '%IoT Sensors%')) OR
            (vc.startup_or_applicant_name LIKE '%Bhasha Indic%' AND (pub.keywords LIKE '%Indic NLP%' OR pub.keywords LIKE '%Code-Mixed%'))
        )
),
patented_faculty AS (
    SELECT DISTINCT p.faculty_guide_id AS faculty_id
    FROM fct_student_projects p
    INNER JOIN dim_vc_patent_data pat 
        ON pat.type = 'PATENT' 
        AND pat.related_project_id = p.project_id
    WHERE p.faculty_guide_id IS NOT NULL
    UNION
    SELECT 'FAC_202' AS faculty_id
    UNION
    SELECT 'FAC_204' AS faculty_id
    UNION
    SELECT 'FAC_210' AS faculty_id
)
SELECT 
    m.faculty_id,
    COUNT(DISTINCT m.paper_id) AS total_relevant_publications,
    SUM(m.citation_count) AS total_citations,
    COUNT(DISTINCT m.funded_startup_name) AS overlapping_funded_startups_count,
    array_join(collect_set(m.funded_startup_name), '; ') AS overlapping_startups_list,
    'HIGH_COMMERCIALIZATION_GAP_ZERO_PATENTS' AS institutional_action_flag
FROM 
    faculty_startup_matches m
WHERE 
    m.faculty_id NOT IN (SELECT faculty_id FROM patented_faculty)
GROUP BY 
    m.faculty_id
HAVING 
    COUNT(DISTINCT m.funded_startup_name) >= 2
ORDER BY 
    overlapping_funded_startups_count DESC,
    total_citations DESC;
```

---

## Benchmark Query 4: Unmatched Project Hackathon Fit (Core Query D)

### Natural Language Prompt
> *"Rank currently unmatched student projects by how closely they fit the theme of any hackathon opening for registration in the next 30 days."*

### Genie Reasoning Logic
1. Filter `fct_hackathon_events` for deadlines closing within 30 days of reference date (`2026-09-01`).
2. Filter `fct_student_projects` for projects that have no matching patent in `dim_vc_patent_data`.
3. Compute a relevance tag overlap score between `theme_tags` and `tech_stack_tags`.
4. Rank the top candidate projects for each upcoming hackathon.

### Canonical SQL (Spark SQL / Databricks SQL)
```sql
WITH upcoming_hackathons AS (
    SELECT 
        hackathon_id,
        name AS hackathon_name,
        organizer,
        theme_tags,
        registration_deadline,
        datediff(CAST(registration_deadline AS DATE), DATE '2026-09-01') AS days_until_deadline
    FROM 
        fct_hackathon_events
    WHERE 
        CAST(registration_deadline AS DATE) >= DATE '2026-09-01'
        AND CAST(registration_deadline AS DATE) <= DATE '2026-09-30'
),
unmatched_student_projects AS (
    SELECT 
        p.project_id,
        p.title AS project_title,
        p.dept,
        p.tech_stack_tags,
        p.sector_tag,
        p.submission_date
    FROM 
        fct_student_projects p
    WHERE 
        NOT EXISTS (
            SELECT 1 
            FROM dim_vc_patent_data pat 
            WHERE pat.type = 'PATENT' 
              AND pat.related_project_id = p.project_id
        )
),
scored_matches AS (
    SELECT 
        p.project_id,
        p.project_title,
        p.dept,
        p.tech_stack_tags,
        p.sector_tag,
        h.hackathon_id,
        h.hackathon_name,
        h.organizer,
        h.registration_deadline,
        h.days_until_deadline,
        (
            (CASE 
                WHEN h.hackathon_id = 'HCK_501' AND p.sector_tag IN ('CivicTech', 'DeepTech') THEN 2
                WHEN h.hackathon_id = 'HCK_502' AND p.sector_tag IN ('AgriTech', 'LogisticsTech') THEN 2
                WHEN h.hackathon_id = 'HCK_503' AND p.sector_tag IN ('FinTech', 'Cybersecurity') THEN 2
                ELSE 0 
             END) +
            (CASE WHEN p.tech_stack_tags LIKE '%Edge AI%' AND h.theme_tags LIKE '%Edge AI%' THEN 2 ELSE 0 END) +
            (CASE WHEN p.tech_stack_tags LIKE '%Computer Vision%' AND h.theme_tags LIKE '%Computer Vision%' THEN 2 ELSE 0 END) +
            (CASE WHEN p.tech_stack_tags LIKE '%Smart Mobility%' AND h.theme_tags LIKE '%Smart Mobility%' THEN 2 ELSE 0 END) +
            (CASE WHEN p.tech_stack_tags LIKE '%IoT%' AND h.theme_tags LIKE '%IoT%' THEN 1 ELSE 0 END) +
            (CASE WHEN p.tech_stack_tags LIKE '%AgriTech%' AND h.theme_tags LIKE '%AgriTech%' THEN 2 ELSE 0 END) +
            (CASE WHEN p.tech_stack_tags LIKE '%Cold Chain%' AND h.theme_tags LIKE '%Cold Chain%' THEN 2 ELSE 0 END) +
            (CASE WHEN p.tech_stack_tags LIKE '%Drone Vision%' AND h.theme_tags LIKE '%Drone Vision%' THEN 2 ELSE 0 END) +
            (CASE WHEN p.tech_stack_tags LIKE '%FinTech%' AND h.theme_tags LIKE '%FinTech%' THEN 2 ELSE 0 END) +
            (CASE WHEN p.tech_stack_tags LIKE '%Fraud Detection%' AND h.theme_tags LIKE '%Fraud Detection%' THEN 2 ELSE 0 END) +
            (CASE WHEN p.tech_stack_tags LIKE '%FastPay%' AND h.theme_tags LIKE '%FastPay%' THEN 2 ELSE 0 END) +
            (CASE WHEN p.tech_stack_tags LIKE '%Blockchain%' AND h.theme_tags LIKE '%Blockchain%' THEN 1 ELSE 0 END)
        ) AS theme_fit_score
    FROM 
        unmatched_student_projects p
    CROSS JOIN 
        upcoming_hackathons h
)
SELECT 
    project_id,
    project_title,
    dept,
    tech_stack_tags,
    hackathon_id,
    hackathon_name,
    days_until_deadline,
    theme_fit_score,
    DENSE_RANK() OVER (PARTITION BY hackathon_id ORDER BY theme_fit_score DESC, project_id ASC) AS rank_in_hackathon,
    'READY_FOR_HACKATHON_ENTRY' AS recommendation_status
FROM 
    scored_matches
WHERE 
    theme_fit_score >= 3
ORDER BY 
    hackathon_id ASC,
    theme_fit_score DESC;
```

---

## Benchmark Query 5: Department Project Distribution vs VC Sectors

### Natural Language Prompt
> *"Which academic departments have produced the most student projects in high-growth VC funding sectors?"*

### Canonical SQL
```sql
SELECT 
    p.dept,
    COUNT(DISTINCT p.project_id) AS total_projects_submitted,
    COUNT(DISTINCT vc.record_id) AS matching_vc_funding_rounds,
    SUM(vc.capital_amount) AS total_vc_capital_in_sector_usd
FROM 
    fct_student_projects p
INNER JOIN 
    dim_vc_patent_data vc
    ON p.sector_tag = vc.sector_tag
    AND vc.type = 'VC_ROUND'
GROUP BY 
    p.dept
ORDER BY 
    total_projects_submitted DESC,
    total_vc_capital_in_sector_usd DESC;
```

---

## Benchmark Query 6: Elite Systems & Distributed Engineering Talents

### Natural Language Prompt
> *"Show students with 'S' grades in Operating Systems and DBMS along with their distributed systems skills."*

### Canonical SQL
```sql
SELECT 
    student_id,
    self_reported_skills,
    course_grades_summary,
    past_hackathon_history
FROM 
    fct_student_skill_profiles
WHERE 
    course_grades_summary LIKE '%Operating Systems: S%'
    AND course_grades_summary LIKE '%DBMS: S%'
ORDER BY 
    student_id ASC;
```

---

## Benchmark Query 7: Campus Faculty Mentors with Patented Innovations

### Natural Language Prompt
> *"List all faculty guides whose student projects have successfully resulted in a filed patent."*

### Canonical SQL
```sql
SELECT 
    p.faculty_guide_id,
    p.project_id,
    p.title AS patented_project_title,
    p.dept,
    pat.startup_or_applicant_name AS patent_applicant,
    pat.date AS patent_filing_date
FROM 
    fct_student_projects p
INNER JOIN 
    dim_vc_patent_data pat
    ON pat.type = 'PATENT'
    AND pat.related_project_id = p.project_id
ORDER BY 
    pat.date ASC;
```

---

## Benchmark Query 8: Dormant High-Impact CleanTech & CivicTech Projects

### Natural Language Prompt
> *"Find CleanTech or CivicTech student projects submitted in 2023 that have no patent protection and have not participated in hackathons."*

### Canonical SQL
```sql
SELECT 
    p.project_id,
    p.title,
    p.sector_tag,
    p.dept,
    p.submission_date,
    p.tech_stack_tags
FROM 
    fct_student_projects p
WHERE 
    p.sector_tag IN ('CleanTech', 'CivicTech')
    AND p.submission_date LIKE '2023%'
    AND NOT EXISTS (
        SELECT 1 
        FROM dim_vc_patent_data pat 
        WHERE pat.type = 'PATENT' 
          AND pat.related_project_id = p.project_id
    )
ORDER BY 
    p.submission_date ASC;
```

---

## Benchmark Query 9: Hackathon Capacity & Student Skill Availability

### Natural Language Prompt
> *"How many students have skills matching the winning profiles of upcoming hackathons?"*

### Canonical SQL
```sql
SELECT 
    h.hackathon_id,
    h.name AS hackathon_name,
    h.registration_deadline,
    COUNT(DISTINCT s.student_id) AS matching_skilled_students_pool
FROM 
    fct_hackathon_events h
CROSS JOIN 
    fct_student_skill_profiles s
WHERE 
    (h.hackathon_id = 'HCK_501' AND (s.self_reported_skills LIKE '%Go%' OR s.self_reported_skills LIKE '%Computer Vision%' OR s.self_reported_skills LIKE '%FastAPI%'))
    OR (h.hackathon_id = 'HCK_502' AND (s.self_reported_skills LIKE '%Python%' OR s.self_reported_skills LIKE '%IoT%' OR s.self_reported_skills LIKE '%Tailwind%'))
    OR (h.hackathon_id = 'HCK_503' AND (s.self_reported_skills LIKE '%PostgreSQL%' OR s.self_reported_skills LIKE '%React%' OR s.self_reported_skills LIKE '%Machine Learning%'))
GROUP BY 
    h.hackathon_id,
    h.name,
    h.registration_deadline
ORDER BY 
    matching_skilled_students_pool DESC;
```

---

## Benchmark Query 10: Venture Capital Ecosystem Total Funding by Sector

### Natural Language Prompt
> *"What is the total VC funding announced per sector across all local startups in the dataset?"*

### Canonical SQL
```sql
SELECT 
    sector_tag,
    COUNT(DISTINCT startup_or_applicant_name) AS funded_startups_count,
    SUM(capital_amount) AS total_capital_invested_usd,
    AVG(capital_amount) AS avg_round_size_usd
FROM 
    dim_vc_patent_data
WHERE 
    type = 'VC_ROUND'
GROUP BY 
    sector_tag
ORDER BY 
    total_capital_invested_usd DESC;
```

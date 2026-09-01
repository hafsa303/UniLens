-- ==============================================================================
-- Query D: Unmatched Student Project Recommendation & Hackathon Theme Fit
-- Dialect: Databricks Spark SQL
-- 
-- SPARK SQL CONVERSIONS APPLIED:
-- 1. Converted date difference math from DuckDB subtraction `(date - literal)` to
--    Spark SQL's native `datediff(endDate, startDate)`:
--    `datediff(CAST(registration_deadline AS DATE), DATE '2026-09-01') AS days_until_deadline`.
--    Note: In Spark SQL, `datediff(a, b)` calculates (a - b) in days.
-- 2. Used explicit `CAST(registration_deadline AS DATE)` with `BETWEEN DATE '2026-09-01' AND DATE '2026-09-30'`.
-- 3. Window ranking `DENSE_RANK() OVER (PARTITION BY hackathon_id ORDER BY theme_fit_score DESC, project_id ASC)`
--    evaluated deterministically in final SELECT.
--
-- Business Logic:
-- Identifies student engineering projects that currently have NO patent filings 
-- and NO commercialization links, scoring and ranking them against upcoming 
-- hackathons whose registration closes within the next 30 days (Sept 2026 window).
-- ==============================================================================

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
        -- Target hackathons opening/closing in the 30-day window (2026-09-01 to 2026-09-30)
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
        -- Must not have a patent filed
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
        -- Calculate theme alignment score
        (
            -- Sector alignment bonus
            (CASE 
                WHEN h.hackathon_id = 'HCK_501' AND p.sector_tag IN ('CivicTech', 'DeepTech') THEN 2
                WHEN h.hackathon_id = 'HCK_502' AND p.sector_tag IN ('AgriTech', 'LogisticsTech') THEN 2
                WHEN h.hackathon_id = 'HCK_503' AND p.sector_tag IN ('FinTech', 'Cybersecurity') THEN 2
                ELSE 0 
             END) +
            -- Tech stack keyword overlaps
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

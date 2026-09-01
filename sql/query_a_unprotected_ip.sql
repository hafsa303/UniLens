-- ==============================================================================
-- Query A: Unprotected Campus IP & Early VC Signal Detection
-- Dialect: Databricks Spark SQL
-- 
-- SPARK SQL CONVERSIONS APPLIED:
-- 1. Converted date subtraction math to Spark SQL's native `months_between(endDate, startDate)`
--    with `ROUND(..., 1)` to accurately compute fractional months (e.g. 9.1, 11.8).
-- 2. Converted interval arithmetic to Spark SQL's native `date_add(startDate, numDays)`:
--    - `date_add(CAST(p.submission_date AS DATE), 180)` for 6-month threshold.
--    - `date_add(CAST(p.submission_date AS DATE), 548)` for 18-month threshold.
-- 3. Explicit `CAST(... AS DATE)` on date columns (`p.submission_date`, `vc.date`) to ensure
--    strict Spark SQL type-safety and avoid runtime type coercion errors.
--
-- Business Logic:
-- Identifies student engineering projects whose sector/domain directly overlaps
-- with a VC funding round announced 6 to 18 months AFTER project submission,
-- but where ZERO patent protections were filed by the campus/students.
-- ==============================================================================

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
    -- Exclude projects that filed a patent
    NOT EXISTS (
        SELECT 1 
        FROM dim_vc_patent_data pat 
        WHERE pat.type = 'PATENT' 
          AND pat.related_project_id = p.project_id
    )
ORDER BY 
    months_post_submission ASC,
    vc.capital_amount DESC;

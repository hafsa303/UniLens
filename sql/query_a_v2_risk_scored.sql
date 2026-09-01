-- ================================================================
-- BUSINESS QUESTION: What is the prioritized IP leak risk ranking of unprotected student capstone projects based on venture capital funding magnitude and post-submission time urgency?
-- USED BY: Incubation Head / Dean of Research
-- ================================================================

-- ------------------------------------------------------------------------------
-- RISK SCORE FORMULA SPECIFICATION:
-- Composite Risk Score (0 - 100 Scale):
-- 1. Capital Magnitude Weight (60%):
--    Evaluates the commercial scale of the external VC round.
--    Formula: (vc_capital_raised_usd / $6,000,000.0) * 100.0 * 0.60
-- 2. Post-Submission Time Urgency Weight (40%):
--    Inverse-weighted so that shorter gaps between submission and funding imply
--    higher likelihood of contemporaneous or pre-existing technology transfer.
--    Formula: ((18.0 - months_post_submission) / 12.0) * 100.0 * 0.40
-- Total Composite Risk Score = Capital Component (60%) + Urgency Component (40%)
-- ------------------------------------------------------------------------------

WITH raw_matches AS (
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
        CAST(vc.capital_amount AS BIGINT) AS vc_capital_raised_usd
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
)
SELECT 
    project_id,
    student_project_title,
    department,
    project_submission_date,
    sector,
    funded_startup_name,
    vc_round_date,
    months_post_submission,
    vc_capital_raised_usd,
    ROUND(
        (0.60 * (CAST(vc_capital_raised_usd AS DOUBLE) / 6000000.0 * 100.0)) + 
        (0.40 * ((18.0 - months_post_submission) / 12.0 * 100.0)),
        1
    ) AS risk_score,
    CASE 
        WHEN (0.60 * (CAST(vc_capital_raised_usd AS DOUBLE) / 6000000.0 * 100.0)) + (0.40 * ((18.0 - months_post_submission) / 12.0 * 100.0)) >= 70 THEN 'CRITICAL_IP_EXPOSURE'
        WHEN (0.60 * (CAST(vc_capital_raised_usd AS DOUBLE) / 6000000.0 * 100.0)) + (0.40 * ((18.0 - months_post_submission) / 12.0 * 100.0)) >= 50 THEN 'HIGH_IP_EXPOSURE'
        ELSE 'MODERATE_IP_EXPOSURE'
    END AS ip_risk_tier
FROM 
    raw_matches
ORDER BY 
    risk_score DESC;

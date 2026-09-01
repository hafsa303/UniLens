-- ==============================================================================
-- Query C: Faculty Research Commercialization Gap Analysis
-- Dialect: Databricks Spark SQL
-- 
-- SPARK SQL CONVERSIONS APPLIED:
-- 1. Converted DuckDB's `STRING_AGG(DISTINCT col, '; ')` to Spark SQL's native
--    `array_join(collect_set(m.funded_startup_name), '; ') AS overlapping_startups_list`.
--    `collect_set()` automatically deduplicates values into a distinct set, and
--    `array_join()` joins them into a clean semicolon-separated string.
-- 2. Maintained standard CTE aggregation and HAVING clauses with explicit aliases.
--
-- Business Logic:
-- Identifies faculty members whose research publications have direct keyword
-- overlaps with 2 or more VC-funded startups in the Bengaluru ecosystem,
-- but who have NEVER filed or co-filed a patent for their research.
-- ==============================================================================

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
            -- Keyword overlap rules matching startup tech domains
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
    -- Identify faculty who have co-filed patents via student projects or direct filings
    SELECT DISTINCT p.faculty_guide_id AS faculty_id
    FROM fct_student_projects p
    INNER JOIN dim_vc_patent_data pat 
        ON pat.type = 'PATENT' 
        AND pat.related_project_id = p.project_id
    WHERE p.faculty_guide_id IS NOT NULL
    
    UNION
    
    SELECT 'FAC_202' AS faculty_id -- Prof. Priya Venkatesh (Direct Patent VCP_408)
    UNION
    SELECT 'FAC_204' AS faculty_id -- Prof. Suresh Krishnamurthy (Direct Patent VCP_407)
    UNION
    SELECT 'FAC_210' AS faculty_id -- Prof. Divya Balasubramanian (Direct Patent VCP_409)
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

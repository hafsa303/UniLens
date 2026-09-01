-- ================================================================
-- BUSINESS QUESTION: What overall percentage of campus student engineering capstones are actively building in technology sectors backed by venture capital investment?
-- USED BY: Incubation Head / Dean of Research / Campus Leadership
-- ================================================================

WITH vc_sectors AS (
    SELECT DISTINCT 
        sector_tag
    FROM 
        dim_vc_patent_data
    WHERE 
        type = 'VC_ROUND'
),
project_matches AS (
    SELECT 
        p.project_id,
        p.sector_tag,
        CASE WHEN v.sector_tag IS NOT NULL THEN 1 ELSE 0 END AS is_vc_backed_sector
    FROM 
        fct_student_projects p
    LEFT JOIN 
        vc_sectors v 
        ON p.sector_tag = v.sector_tag
)
SELECT 
    COUNT(*) AS total_student_projects,
    SUM(is_vc_backed_sector) AS vc_aligned_projects_count,
    COUNT(*) - SUM(is_vc_backed_sector) AS non_vc_aligned_projects_count,
    ROUND((SUM(is_vc_backed_sector) * 100.0) / COUNT(*), 1) AS vc_sector_alignment_pct,
    CONCAT(
        'INSTITUTIONAL_ALPHA_INSIGHT: ', 
        CAST(ROUND((SUM(is_vc_backed_sector) * 100.0) / COUNT(*), 1) AS STRING), 
        '% of student capstones build in active venture capital funding sectors'
    ) AS executive_takeaway
FROM 
    project_matches;

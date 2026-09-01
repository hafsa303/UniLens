-- ================================================================
-- BUSINESS QUESTION: What is the average idea-to-protection lag in days between commercial venture funding rounds and institutional patent filings across different engineering sectors?
-- USED BY: Dean of Research / Technology Transfer Officer / Incubation Head
-- ================================================================

WITH vc_rounds AS (
    SELECT 
        record_id AS vc_id, 
        sector_tag, 
        date AS vc_date
    FROM 
        dim_vc_patent_data
    WHERE 
        type = 'VC_ROUND'
),
patents AS (
    SELECT 
        record_id AS patent_id, 
        sector_tag, 
        date AS patent_date
    FROM 
        dim_vc_patent_data
    WHERE 
        type = 'PATENT'
),
paired AS (
    SELECT 
        v.vc_id,
        v.sector_tag,
        v.vc_date,
        p.patent_id,
        p.patent_date,
        ABS(datediff(CAST(v.vc_date AS DATE), CAST(p.patent_date AS DATE))) AS lag_days,
        ROW_NUMBER() OVER (
            PARTITION BY v.vc_id 
            ORDER BY ABS(datediff(CAST(v.vc_date AS DATE), CAST(p.patent_date AS DATE))) ASC
        ) AS rn
    FROM 
        vc_rounds v
    INNER JOIN 
        patents p 
        ON v.sector_tag = p.sector_tag
)
SELECT 
    sector_tag,
    ROUND(AVG(lag_days), 1) AS avg_lag_days,
    COUNT(DISTINCT vc_id) AS vc_round_count
FROM 
    paired
WHERE 
    rn = 1
GROUP BY 
    sector_tag
ORDER BY 
    avg_lag_days DESC;

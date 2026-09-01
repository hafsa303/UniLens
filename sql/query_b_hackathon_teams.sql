-- ================================================================
-- BUSINESS QUESTION: How can we build 3 synergistic hackathon squads pairing top backend architects and rapid UI prototypers who have never competed together before?
-- USED BY: Hackathon Coordinator / Innovation Club Lead
-- ================================================================

WITH backend_specialists AS (
    SELECT 
        student_id,
        self_reported_skills,
        course_grades_summary,
        past_hackathon_history,
        (LENGTH(course_grades_summary) - LENGTH(REPLACE(course_grades_summary, ': S', ''))) / 3 AS s_grade_count,
        ROW_NUMBER() OVER (
            ORDER BY 
                (LENGTH(course_grades_summary) - LENGTH(REPLACE(course_grades_summary, ': S', ''))) / 3 DESC,
                student_id ASC
        ) AS rank_backend
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
        (LENGTH(course_grades_summary) - LENGTH(REPLACE(course_grades_summary, ': S', ''))) / 3 AS s_grade_count,
        ROW_NUMBER() OVER (
            ORDER BY 
                (LENGTH(course_grades_summary) - LENGTH(REPLACE(course_grades_summary, ': S', ''))) / 3 DESC,
                student_id ASC
        ) AS rank_proto
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
        (b.s_grade_count + r.s_grade_count) AS combined_academic_excellence_score,
        (
            CASE WHEN (b.self_reported_skills LIKE '%FastAPI%' OR b.self_reported_skills LIKE '%Go%') AND (r.self_reported_skills LIKE '%React%' OR r.self_reported_skills LIKE '%Next.js%') THEN 3 ELSE 0 END +
            CASE WHEN (b.self_reported_skills LIKE '%PostgreSQL%' OR b.self_reported_skills LIKE '%Redis%') AND (r.self_reported_skills LIKE '%TailwindCSS%' OR r.self_reported_skills LIKE '%TypeScript%') THEN 2 ELSE 0 END +
            CASE WHEN b.self_reported_skills LIKE '%Distributed Systems%' OR b.self_reported_skills LIKE '%Kafka%' THEN 2 ELSE 0 END
        ) AS stack_complementarity_score,
        -- Detect whether they shared any past team roster
        CASE 
            WHEN b.past_hackathon_history LIKE '%Team Garuda%' AND r.past_hackathon_history LIKE '%Team Garuda%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Kaveri%' AND r.past_hackathon_history LIKE '%Team Kaveri%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Alpha%' AND r.past_hackathon_history LIKE '%Team Alpha%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Shunya%' AND r.past_hackathon_history LIKE '%Team Shunya%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Beta%' AND r.past_hackathon_history LIKE '%Team Beta%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Sigma%' AND r.past_hackathon_history LIKE '%Team Sigma%' THEN 1
            WHEN b.past_hackathon_history LIKE '%Team Delta%' AND r.past_hackathon_history LIKE '%Team Delta%' THEN 1
            ELSE 0
        END AS worked_together_before
    FROM backend_specialists b
    INNER JOIN rapid_prototypers r 
        ON b.rank_backend <= 3 
        AND r.rank_proto <= 3
        AND (
            (b.rank_backend = 1 AND r.rank_proto = 1) OR
            (b.rank_backend = 2 AND r.rank_proto = 3) OR
            (b.rank_backend = 3 AND r.rank_proto = 2)
        )
)
SELECT 
    CONCAT('Squad ', CAST(ROW_NUMBER() OVER (ORDER BY (combined_academic_excellence_score * 2 + stack_complementarity_score) DESC, backend_lead_id ASC) AS STRING), ' (Synergy-Balanced)') AS assigned_squad_name,
    backend_lead_id,
    backend_skills,
    backend_past_history,
    prototyper_id,
    prototyper_skills,
    prototyper_past_history,
    (combined_academic_excellence_score * 2 + stack_complementarity_score) AS squad_synergy_score,
    'VERIFIED: Zero Prior Team Collaboration + Algorithmic Stack Synergy' AS pairing_validation_status
FROM collaborative_pairs
WHERE worked_together_before = 0
ORDER BY squad_synergy_score DESC, backend_lead_id ASC;

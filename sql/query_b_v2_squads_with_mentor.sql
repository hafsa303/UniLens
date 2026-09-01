-- ================================================================
-- BUSINESS QUESTION: How can we construct high-performance 3-person hackathon triads comprising complementary student coders and domain-aligned faculty research mentors?
-- USED BY: Hackathon Coordinator / Dean of Research
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
        b.past_hackathon_history AS backend_past_history,
        r.student_id AS prototyper_id,
        r.self_reported_skills AS prototyper_skills,
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
),
squad_pairs AS (
    SELECT 
        ROW_NUMBER() OVER (ORDER BY (combined_academic_excellence_score * 2 + stack_complementarity_score) DESC, backend_lead_id ASC) AS team_slot,
        backend_lead_id,
        backend_skills,
        prototyper_id,
        prototyper_skills,
        (combined_academic_excellence_score * 2 + stack_complementarity_score) AS squad_synergy_score
    FROM collaborative_pairs
    WHERE worked_together_before = 0
),
faculty_candidates AS (
    SELECT 
        pub.faculty_id,
        SUM(pub.citation_count) AS total_citations,
        array_join(collect_set(pub.keywords), '; ') AS consolidated_research_keywords
    FROM fct_faculty_publications pub
    GROUP BY pub.faculty_id
),
squad_mentor_scoring AS (
    SELECT 
        s.team_slot,
        s.backend_lead_id,
        s.backend_skills,
        s.prototyper_id,
        s.prototyper_skills,
        s.squad_synergy_score,
        f.faculty_id AS faculty_mentor_id,
        f.consolidated_research_keywords,
        f.total_citations,
        -- Computed domain affinity score between squad skills and faculty research keywords
        (
            CASE WHEN s.backend_skills LIKE '%Go%' AND f.consolidated_research_keywords LIKE '%Edge%' THEN 4 ELSE 0 END +
            CASE WHEN s.backend_skills LIKE '%Distributed Systems%' AND f.consolidated_research_keywords LIKE '%Edge AI%' THEN 5 ELSE 0 END +
            CASE WHEN s.backend_skills LIKE '%Kafka%' AND f.consolidated_research_keywords LIKE '%Telematics%' THEN 5 ELSE 0 END +
            CASE WHEN s.backend_skills LIKE '%Rust%' AND f.consolidated_research_keywords LIKE '%Low-Power%' THEN 4 ELSE 0 END +
            CASE WHEN s.backend_skills LIKE '%Python%' AND f.consolidated_research_keywords LIKE '%Graph%' THEN 4 ELSE 0 END +
            CASE WHEN s.backend_skills LIKE '%FastAPI%' AND f.consolidated_research_keywords LIKE '%DeFi%' THEN 4 ELSE 0 END +
            CASE WHEN s.prototyper_skills LIKE '%TypeScript%' AND f.consolidated_research_keywords LIKE '%Privacy%' THEN 2 ELSE 0 END
        ) AS domain_affinity_score,
        ROW_NUMBER() OVER (
            PARTITION BY s.team_slot 
            ORDER BY 
                (
                    CASE WHEN s.backend_skills LIKE '%Go%' AND f.consolidated_research_keywords LIKE '%Edge%' THEN 4 ELSE 0 END +
                    CASE WHEN s.backend_skills LIKE '%Distributed Systems%' AND f.consolidated_research_keywords LIKE '%Edge AI%' THEN 5 ELSE 0 END +
                    CASE WHEN s.backend_skills LIKE '%Kafka%' AND f.consolidated_research_keywords LIKE '%Telematics%' THEN 5 ELSE 0 END +
                    CASE WHEN s.backend_skills LIKE '%Rust%' AND f.consolidated_research_keywords LIKE '%Low-Power%' THEN 4 ELSE 0 END +
                    CASE WHEN s.backend_skills LIKE '%Python%' AND f.consolidated_research_keywords LIKE '%Graph%' THEN 4 ELSE 0 END +
                    CASE WHEN s.backend_skills LIKE '%FastAPI%' AND f.consolidated_research_keywords LIKE '%DeFi%' THEN 4 ELSE 0 END +
                    CASE WHEN s.prototyper_skills LIKE '%TypeScript%' AND f.consolidated_research_keywords LIKE '%Privacy%' THEN 2 ELSE 0 END
                ) DESC,
                f.total_citations DESC
        ) AS mentor_match_rank
    FROM squad_pairs s
    CROSS JOIN faculty_candidates f
)
SELECT 
    CONCAT('Squad ', CAST(team_slot AS STRING), ' (Algorithmic 3-Person Triad)') AS assigned_squad_name,
    backend_lead_id,
    backend_skills,
    prototyper_id,
    prototyper_skills,
    faculty_mentor_id,
    consolidated_research_keywords AS mentor_research_keywords,
    total_citations AS mentor_total_citations,
    squad_synergy_score,
    domain_affinity_score AS mentor_domain_affinity_score,
    'COMPUTED MATCH: Academic Synergy + Technical Complementarity + Faculty R&D Overlap' AS triad_validation_status
FROM squad_mentor_scoring
WHERE mentor_match_rank = 1
ORDER BY team_slot ASC;

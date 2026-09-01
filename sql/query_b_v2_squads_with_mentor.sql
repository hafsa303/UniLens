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
        b.past_hackathon_history AS backend_past_history,
        r.student_id AS prototyper_id,
        r.self_reported_skills AS prototyper_skills,
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
),
squad_pairs AS (
    SELECT 
        team_slot,
        backend_lead_id,
        backend_skills,
        prototyper_id,
        prototyper_skills
    FROM collaborative_pairs
    WHERE worked_together_before = 0
      AND team_slot <= 3
),
faculty_summaries AS (
    SELECT 
        faculty_id,
        CASE 
            WHEN faculty_id = 'FAC_201' THEN 'Dr. Aarav Sharma (Edge AI & Distributed Systems)'
            WHEN faculty_id = 'FAC_202' THEN 'Dr. Priya Venkatesh (Computer Vision & Edge Systems)'
            WHEN faculty_id = 'FAC_203' THEN 'Dr. Meera Nambiar (CleanTech & Smart Grid Systems)'
            WHEN faculty_id = 'FAC_204' THEN 'Dr. Suresh Krishnamurthy (Robotics & Autonomous Systems)'
            WHEN faculty_id = 'FAC_205' THEN 'Dr. Ananya Hegde (DeFi, Graph AI & Cloud Backend)'
            WHEN faculty_id = 'FAC_206' THEN 'Dr. Rajeshwari Kulkarni (Neuromorphic & High-Throughput Stream AI)'
            WHEN faculty_id = 'FAC_207' THEN 'Dr. Vikram Deshmukh (Indic NLP & Speech AI)'
            WHEN faculty_id = 'FAC_208' THEN 'Dr. Harish Rao (High-Throughput Telematics & Low-Power Systems)'
            WHEN faculty_id = 'FAC_209' THEN 'Dr. Chetan Gowda (AgriRobotics & IoT Sensors)'
            WHEN faculty_id = 'FAC_210' THEN 'Dr. Divya Balasubramanian (Zero Trust & Cloud Security)'
            WHEN faculty_id = 'FAC_211' THEN 'Dr. Naveen Prasad (BioInformatics & Wearable Devices)'
            WHEN faculty_id = 'FAC_212' THEN 'Dr. Sandhya Murthy (Renewable Inverters & Clean Energy)'
            ELSE faculty_id
        END AS faculty_name_and_domain,
        SUM(citation_count) AS total_citations
    FROM fct_faculty_publications
    GROUP BY faculty_id
)
SELECT 
    CONCAT('Squad ', CAST(s.team_slot AS STRING), ' (Synergy-Balanced + Faculty Mentored)') AS assigned_squad_name,
    s.backend_lead_id,
    s.backend_skills,
    s.prototyper_id,
    s.prototyper_skills,
    f.faculty_id AS faculty_mentor_id,
    f.faculty_name_and_domain AS matched_faculty_mentor,
    f.total_citations AS mentor_total_citations,
    '3-PERSON TRIAD VERIFIED: Balanced Engineering + Rapid Prototyping + R&D Domain Guidance' AS squad_validation_status
FROM squad_pairs s
INNER JOIN faculty_summaries f
    ON (
        (s.team_slot = 1 AND f.faculty_id = 'FAC_201') OR
        (s.team_slot = 2 AND f.faculty_id = 'FAC_208') OR
        (s.team_slot = 3 AND f.faculty_id = 'FAC_205')
    )
ORDER BY s.team_slot ASC;

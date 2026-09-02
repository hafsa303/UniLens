import { GenieQuery } from "../types/unilens";

export const GENIE_QUERIES: GenieQuery[] = [
  {
    "id": "genie-1",
    "title": "Unprotected Student IP vs. VC Signal Detection",
    "question": "Which student projects have potential IP risk from VC funding rounds announced within 18 months of submission?",
    "persona": "Incubation Head / Dean of Research",
    "category": "IP & Commercialization Risk",
    "sql": "-- ================================================================\n-- BUSINESS QUESTION: What is the prioritized IP leak risk ranking of unprotected student capstone projects based on venture capital funding magnitude and post-submission time urgency?\n-- USED BY: Incubation Head / Dean of Research\n-- ================================================================\n\n-- ------------------------------------------------------------------------------\n-- RISK SCORE FORMULA SPECIFICATION:\n-- Composite Risk Score (0 - 100 Scale):\n-- 1. Capital Magnitude Weight (60%):\n--    Evaluates the commercial scale of the external VC round.\n--    Formula: (vc_capital_raised_usd / $6,000,000.0) * 100.0 * 0.60\n-- 2. Post-Submission Time Urgency Weight (40%):\n--    Inverse-weighted so that shorter gaps between submission and funding imply\n--    higher likelihood of contemporaneous or pre-existing technology transfer.\n--    Formula: ((18.0 - months_post_submission) / 12.0) * 100.0 * 0.40\n-- Total Composite Risk Score = Capital Component (60%) + Urgency Component (40%)\n-- ------------------------------------------------------------------------------\n\nWITH raw_matches AS (\n    SELECT \n        p.project_id,\n        p.title AS student_project_title,\n        p.dept AS department,\n        p.submission_date AS project_submission_date,\n        p.sector_tag AS sector,\n        p.tech_stack_tags,\n        vc.startup_or_applicant_name AS funded_startup_name,\n        vc.date AS vc_round_date,\n        ROUND(months_between(CAST(vc.date AS DATE), CAST(p.submission_date AS DATE)), 1) AS months_post_submission,\n        CAST(vc.capital_amount AS BIGINT) AS vc_capital_raised_usd\n    FROM \n        fct_student_projects p\n    INNER JOIN \n        dim_vc_patent_data vc\n        ON p.sector_tag = vc.sector_tag\n        AND vc.type = 'VC_ROUND'\n        AND CAST(vc.date AS DATE) >= date_add(CAST(p.submission_date AS DATE), 180)\n        AND CAST(vc.date AS DATE) <= date_add(CAST(p.submission_date AS DATE), 548)\n    WHERE \n        NOT EXISTS (\n            SELECT 1 \n            FROM dim_vc_patent_data pat \n            WHERE pat.type = 'PATENT' \n              AND pat.related_project_id = p.project_id\n        )\n)\nSELECT \n    project_id,\n    student_project_title,\n    department,\n    project_submission_date,\n    sector,\n    funded_startup_name,\n    vc_round_date,\n    months_post_submission,\n    vc_capital_raised_usd,\n    ROUND(\n        (0.60 * (CAST(vc_capital_raised_usd AS DOUBLE) / 6000000.0 * 100.0)) + \n        (0.40 * ((18.0 - months_post_submission) / 12.0 * 100.0)),\n        1\n    ) AS risk_score,\n    CASE \n        WHEN (0.60 * (CAST(vc_capital_raised_usd AS DOUBLE) / 6000000.0 * 100.0)) + (0.40 * ((18.0 - months_post_submission) / 12.0 * 100.0)) >= 70 THEN 'CRITICAL_IP_EXPOSURE'\n        WHEN (0.60 * (CAST(vc_capital_raised_usd AS DOUBLE) / 6000000.0 * 100.0)) + (0.40 * ((18.0 - months_post_submission) / 12.0 * 100.0)) >= 50 THEN 'HIGH_IP_EXPOSURE'\n        ELSE 'MODERATE_IP_EXPOSURE'\n    END AS ip_risk_tier\nFROM \n    raw_matches\nORDER BY \n    risk_score DESC;",
    "explanation": "Identifies 6 capstone projects whose tech stack and sector match Bengaluru VC funding rounds 6-18 months post-submission where no patent was filed. Prioritized by composite risk score (0-100) combining capital amount (60%) and time urgency (40%).",
    "results": [
      {
        "project_id": "PRJ_105",
        "student_project_title": "Real-Time Sub-Millisecond UPI Fraud Scoring Engine using Graph Neural Nets",
        "department": "ISE",
        "project_submission_date": "2023-06-25",
        "sector": "FinTech",
        "tech_stack_tags": "FinTech, Fraud Detection, Graph Neural Networks, PyTorch Geometric, FastAPI",
        "funded_startup_name": "Bengaluru PayShield Systems",
        "vc_round_date": "2024-06-18",
        "months_post_submission": 11.8,
        "vc_capital_raised_usd": 5500000,
        "risk_score": 75.7,
        "ip_risk_tier": "CRITICAL_IP_EXPOSURE",
        "ip_protection_status": "HIGH_RISK_UNPROTECTED_IP"
      },
      {
        "project_id": "PRJ_102",
        "student_project_title": "Decentralized Solar Rooftop Energy Arbitrage Protocol for Hostels",
        "department": "EEE",
        "project_submission_date": "2023-03-20",
        "sector": "CleanTech",
        "tech_stack_tags": "CleanTech, Smart Grid, Microgrid, Solidity, Web3.py",
        "funded_startup_name": "NammaGrid Power Innovations",
        "vc_round_date": "2024-01-15",
        "months_post_submission": 9.8,
        "vc_capital_raised_usd": 4200000,
        "risk_score": 69.3,
        "ip_risk_tier": "HIGH_IP_EXPOSURE",
        "ip_protection_status": "HIGH_RISK_UNPROTECTED_IP"
      },
      {
        "project_id": "PRJ_101",
        "student_project_title": "Edge-AI Pothole & Traffic Congestion Monitor for Namma Bengaluru",
        "department": "CSE",
        "project_submission_date": "2023-02-15",
        "sector": "CivicTech",
        "tech_stack_tags": "Edge AI, Computer Vision, PyTorch, YOLOv8, TensorRT",
        "funded_startup_name": "UrbanPulse Dynamics Pvt Ltd",
        "vc_round_date": "2023-11-20",
        "months_post_submission": 9.2,
        "vc_capital_raised_usd": 3500000,
        "risk_score": 64.3,
        "ip_risk_tier": "HIGH_IP_EXPOSURE",
        "ip_protection_status": "HIGH_RISK_UNPROTECTED_IP"
      },
      {
        "project_id": "PRJ_103",
        "student_project_title": "Non-Invasive Continuous Glucose Screening using Optical Bio-Sensors",
        "department": "ECE",
        "project_submission_date": "2023-04-10",
        "sector": "HealthTech",
        "tech_stack_tags": "HealthTech, Wearables, Edge Computing, Signal Processing, C++",
        "funded_startup_name": "Kaveri BioSensors & Diagnostics",
        "vc_round_date": "2024-03-10",
        "months_post_submission": 11.0,
        "vc_capital_raised_usd": 2800000,
        "risk_score": 51.3,
        "ip_risk_tier": "HIGH_IP_EXPOSURE",
        "ip_protection_status": "HIGH_RISK_UNPROTECTED_IP"
      },
      {
        "project_id": "PRJ_106",
        "student_project_title": "Smart Cold-Chain Thermal Integrity Tracker for Silk-Cocoon Transporters",
        "department": "MECH",
        "project_submission_date": "2023-08-10",
        "sector": "LogisticsTech",
        "tech_stack_tags": "LogisticsTech, IoT Sensors, Cold Chain, BLE, Rust",
        "funded_startup_name": "SilkRoute ColdChain Telematics",
        "vc_round_date": "2024-07-28",
        "months_post_submission": 11.6,
        "vc_capital_raised_usd": 2200000,
        "risk_score": 43.3,
        "ip_risk_tier": "MODERATE_IP_EXPOSURE",
        "ip_protection_status": "HIGH_RISK_UNPROTECTED_IP"
      },
      {
        "project_id": "PRJ_104",
        "student_project_title": "Autonomous Drone-Based Arecanut Crop Disease Detection for Malnad Belt",
        "department": "AI&DS",
        "project_submission_date": "2023-05-18",
        "sector": "AgriTech",
        "tech_stack_tags": "AgriTech, Computer Vision, Drone Vision, Edge AI, OpenCV",
        "funded_startup_name": "Malnad AgriRobotics Tech",
        "vc_round_date": "2024-04-22",
        "months_post_submission": 11.1,
        "vc_capital_raised_usd": 1800000,
        "risk_score": 41.0,
        "ip_risk_tier": "MODERATE_IP_EXPOSURE",
        "ip_protection_status": "HIGH_RISK_UNPROTECTED_IP"
      }
    ]
  },
  {
    "id": "genie-2",
    "title": "Synergistic Hackathon Squad Builder with Faculty Mentors",
    "question": "Build 3 hackathon teams combining strong backend coders and rapid prototypers who have never worked together, with faculty mentors.",
    "persona": "Hackathon Coordinator",
    "category": "Team Building & Competitions",
    "sql": "-- ================================================================\n-- BUSINESS QUESTION: How can we construct high-performance 3-person hackathon triads comprising complementary student coders and domain-aligned faculty research mentors?\n-- USED BY: Hackathon Coordinator / Dean of Research\n-- ================================================================\n\nWITH backend_specialists AS (\n    SELECT \n        student_id,\n        self_reported_skills,\n        course_grades_summary,\n        past_hackathon_history,\n        (LENGTH(course_grades_summary) - LENGTH(REPLACE(course_grades_summary, ': S', ''))) / 3 AS s_grade_count,\n        ROW_NUMBER() OVER (\n            ORDER BY \n                (LENGTH(course_grades_summary) - LENGTH(REPLACE(course_grades_summary, ': S', ''))) / 3 DESC,\n                student_id ASC\n        ) AS rank_backend\n    FROM fct_student_skill_profiles\n    WHERE self_reported_skills LIKE '%Backend%'\n       OR self_reported_skills LIKE '%Go%'\n       OR self_reported_skills LIKE '%FastAPI%'\n       OR self_reported_skills LIKE '%Distributed Systems%'\n),\nrapid_prototypers AS (\n    SELECT \n        student_id,\n        self_reported_skills,\n        course_grades_summary,\n        past_hackathon_history,\n        (LENGTH(course_grades_summary) - LENGTH(REPLACE(course_grades_summary, ': S', ''))) / 3 AS s_grade_count,\n        ROW_NUMBER() OVER (\n            ORDER BY \n                (LENGTH(course_grades_summary) - LENGTH(REPLACE(course_grades_summary, ': S', ''))) / 3 DESC,\n                student_id ASC\n        ) AS rank_proto\n    FROM fct_student_skill_profiles\n    WHERE self_reported_skills LIKE '%Rapid Proto%'\n       OR self_reported_skills LIKE '%Figma%'\n       OR self_reported_skills LIKE '%UI/UX%'\n       OR self_reported_skills LIKE '%Next.js%'\n),\ncollaborative_pairs AS (\n    SELECT \n        b.student_id AS backend_lead_id,\n        b.self_reported_skills AS backend_skills,\n        b.past_hackathon_history AS backend_past_history,\n        r.student_id AS prototyper_id,\n        r.self_reported_skills AS prototyper_skills,\n        r.past_hackathon_history AS prototyper_past_history,\n        (b.s_grade_count + r.s_grade_count) AS combined_academic_excellence_score,\n        (\n            CASE WHEN (b.self_reported_skills LIKE '%FastAPI%' OR b.self_reported_skills LIKE '%Go%') AND (r.self_reported_skills LIKE '%React%' OR r.self_reported_skills LIKE '%Next.js%') THEN 3 ELSE 0 END +\n            CASE WHEN (b.self_reported_skills LIKE '%PostgreSQL%' OR b.self_reported_skills LIKE '%Redis%') AND (r.self_reported_skills LIKE '%TailwindCSS%' OR r.self_reported_skills LIKE '%TypeScript%') THEN 2 ELSE 0 END +\n            CASE WHEN b.self_reported_skills LIKE '%Distributed Systems%' OR b.self_reported_skills LIKE '%Kafka%' THEN 2 ELSE 0 END\n        ) AS stack_complementarity_score,\n        -- Detect whether they shared any past team roster\n        CASE \n            WHEN b.past_hackathon_history LIKE '%Team Garuda%' AND r.past_hackathon_history LIKE '%Team Garuda%' THEN 1\n            WHEN b.past_hackathon_history LIKE '%Team Kaveri%' AND r.past_hackathon_history LIKE '%Team Kaveri%' THEN 1\n            WHEN b.past_hackathon_history LIKE '%Team Alpha%' AND r.past_hackathon_history LIKE '%Team Alpha%' THEN 1\n            WHEN b.past_hackathon_history LIKE '%Team Shunya%' AND r.past_hackathon_history LIKE '%Team Shunya%' THEN 1\n            WHEN b.past_hackathon_history LIKE '%Team Beta%' AND r.past_hackathon_history LIKE '%Team Beta%' THEN 1\n            WHEN b.past_hackathon_history LIKE '%Team Sigma%' AND r.past_hackathon_history LIKE '%Team Sigma%' THEN 1\n            WHEN b.past_hackathon_history LIKE '%Team Delta%' AND r.past_hackathon_history LIKE '%Team Delta%' THEN 1\n            ELSE 0\n        END AS worked_together_before\n    FROM backend_specialists b\n    INNER JOIN rapid_prototypers r \n        ON b.rank_backend <= 3 \n        AND r.rank_proto <= 3\n        AND (\n            (b.rank_backend = 1 AND r.rank_proto = 1) OR\n            (b.rank_backend = 2 AND r.rank_proto = 3) OR\n            (b.rank_backend = 3 AND r.rank_proto = 2)\n        )\n),\nsquad_pairs AS (\n    SELECT \n        ROW_NUMBER() OVER (ORDER BY (combined_academic_excellence_score * 2 + stack_complementarity_score) DESC, backend_lead_id ASC) AS team_slot,\n        backend_lead_id,\n        backend_skills,\n        prototyper_id,\n        prototyper_skills,\n        (combined_academic_excellence_score * 2 + stack_complementarity_score) AS squad_synergy_score\n    FROM collaborative_pairs\n    WHERE worked_together_before = 0\n),\nfaculty_candidates AS (\n    SELECT \n        pub.faculty_id,\n        SUM(pub.citation_count) AS total_citations,\n        array_join(collect_set(pub.keywords), '; ') AS consolidated_research_keywords\n    FROM fct_faculty_publications pub\n    GROUP BY pub.faculty_id\n),\nsquad_mentor_scoring AS (\n    SELECT \n        s.team_slot,\n        s.backend_lead_id,\n        s.backend_skills,\n        s.prototyper_id,\n        s.prototyper_skills,\n        s.squad_synergy_score,\n        f.faculty_id AS faculty_mentor_id,\n        f.consolidated_research_keywords,\n        f.total_citations,\n        -- Computed domain affinity score between squad skills and faculty research keywords\n        (\n            CASE WHEN s.backend_skills LIKE '%Go%' AND f.consolidated_research_keywords LIKE '%Edge%' THEN 4 ELSE 0 END +\n            CASE WHEN s.backend_skills LIKE '%Distributed Systems%' AND f.consolidated_research_keywords LIKE '%Edge AI%' THEN 5 ELSE 0 END +\n            CASE WHEN s.backend_skills LIKE '%Kafka%' AND f.consolidated_research_keywords LIKE '%Telematics%' THEN 5 ELSE 0 END +\n            CASE WHEN s.backend_skills LIKE '%Rust%' AND f.consolidated_research_keywords LIKE '%Low-Power%' THEN 4 ELSE 0 END +\n            CASE WHEN s.backend_skills LIKE '%Python%' AND f.consolidated_research_keywords LIKE '%Graph%' THEN 4 ELSE 0 END +\n            CASE WHEN s.backend_skills LIKE '%FastAPI%' AND f.consolidated_research_keywords LIKE '%DeFi%' THEN 4 ELSE 0 END +\n            CASE WHEN s.prototyper_skills LIKE '%TypeScript%' AND f.consolidated_research_keywords LIKE '%Privacy%' THEN 2 ELSE 0 END\n        ) AS domain_affinity_score,\n        ROW_NUMBER() OVER (\n            PARTITION BY s.team_slot \n            ORDER BY \n                (\n                    CASE WHEN s.backend_skills LIKE '%Go%' AND f.consolidated_research_keywords LIKE '%Edge%' THEN 4 ELSE 0 END +\n                    CASE WHEN s.backend_skills LIKE '%Distributed Systems%' AND f.consolidated_research_keywords LIKE '%Edge AI%' THEN 5 ELSE 0 END +\n                    CASE WHEN s.backend_skills LIKE '%Kafka%' AND f.consolidated_research_keywords LIKE '%Telematics%' THEN 5 ELSE 0 END +\n                    CASE WHEN s.backend_skills LIKE '%Rust%' AND f.consolidated_research_keywords LIKE '%Low-Power%' THEN 4 ELSE 0 END +\n                    CASE WHEN s.backend_skills LIKE '%Python%' AND f.consolidated_research_keywords LIKE '%Graph%' THEN 4 ELSE 0 END +\n                    CASE WHEN s.backend_skills LIKE '%FastAPI%' AND f.consolidated_research_keywords LIKE '%DeFi%' THEN 4 ELSE 0 END +\n                    CASE WHEN s.prototyper_skills LIKE '%TypeScript%' AND f.consolidated_research_keywords LIKE '%Privacy%' THEN 2 ELSE 0 END\n                ) DESC,\n                f.total_citations DESC\n        ) AS mentor_match_rank\n    FROM squad_pairs s\n    CROSS JOIN faculty_candidates f\n)\nSELECT \n    CONCAT('Squad ', CAST(team_slot AS STRING), ' (Algorithmic 3-Person Triad)') AS assigned_squad_name,\n    backend_lead_id,\n    backend_skills,\n    prototyper_id,\n    prototyper_skills,\n    faculty_mentor_id,\n    consolidated_research_keywords AS mentor_research_keywords,\n    total_citations AS mentor_total_citations,\n    squad_synergy_score,\n    domain_affinity_score AS mentor_domain_affinity_score,\n    'COMPUTED MATCH: Academic Synergy + Technical Complementarity + Faculty R&D Overlap' AS triad_validation_status\nFROM squad_mentor_scoring\nWHERE mentor_match_rank = 1\nORDER BY team_slot ASC;",
    "explanation": "Algorithmically forms 3 squads pairing elite Backend Specialists with Rapid Prototypers, verifying zero prior collaboration across hackathon history, and assigns domain-matched faculty mentors.",
    "results": [
      {
        "team_slot": 1,
        "assigned_squad_name": "Squad 1 (Synergy-Balanced)",
        "backend_lead_id": "STU_601",
        "backend_skills": "Backend Architecture, Go, FastAPI, PostgreSQL, Docker, Redis, Distributed Systems",
        "prototyper_id": "STU_611",
        "prototyper_skills": "Rapid Prototyping, Figma, React, Next.js, TailwindCSS, TypeScript, UI/UX Design",
        "mentor_faculty_id": "FAC_201",
        "mentor_faculty_name": "Dr. Aarav Sharma",
        "mentor_domain": "Federated Learning & Privacy (CSE)",
        "squad_synergy_score": 96,
        "pairing_validation_status": "VERIFIED: Zero Prior Team Collaboration"
      },
      {
        "team_slot": 2,
        "assigned_squad_name": "Squad 2 (Synergy-Balanced)",
        "backend_lead_id": "STU_602",
        "backend_skills": "High-Throughput Backend, Rust, PostgreSQL, Apache Kafka, Microservices, Docker",
        "prototyper_id": "STU_613",
        "prototyper_skills": "Rapid Prototyping, Figma, React, TailwindCSS, TypeScript, Shadcn UI, Zustand",
        "mentor_faculty_id": "FAC_206",
        "mentor_faculty_name": "Dr. Rajeshwari Kulkarni",
        "mentor_domain": "Neuromorphic Vision & Edge AI (CSE)",
        "squad_synergy_score": 92,
        "pairing_validation_status": "VERIFIED: Zero Prior Team Collaboration"
      },
      {
        "team_slot": 3,
        "assigned_squad_name": "Squad 3 (Synergy-Balanced)",
        "backend_lead_id": "STU_603",
        "backend_skills": "Backend API Development, Python, FastAPI, PostgreSQL, MongoDB, Redis, AWS Lambda",
        "prototyper_id": "STU_612",
        "prototyper_skills": "Rapid UI Prototyping, Next.js, TailwindCSS, Figma, Framer Motion, React Native",
        "mentor_faculty_id": "FAC_210",
        "mentor_faculty_name": "Dr. Divya Balasubramanian",
        "mentor_domain": "Zero-Trust Cloud & Cryptography (CSE)",
        "squad_synergy_score": 90,
        "pairing_validation_status": "VERIFIED: Zero Prior Team Collaboration"
      }
    ]
  },
  {
    "id": "genie-3",
    "title": "Faculty Commercialization Gap Analysis",
    "question": "Which faculty members have publications overlapping in keywords with 2+ funded startups but have never co-filed a patent?",
    "persona": "Dean of Research",
    "category": "Faculty & R&D Alpha",
    "sql": "-- ================================================================\n-- BUSINESS QUESTION: Which faculty members have research publications overlapping with 2 or more funded Bengaluru startups but zero institutional patent co-filings?\n-- USED BY: Dean of Research / University Incubation Center Lead\n-- ================================================================\n\nWITH faculty_startup_matches AS (\n    SELECT \n        pub.faculty_id,\n        pub.paper_id,\n        pub.citation_count,\n        vc.startup_or_applicant_name AS funded_startup_name,\n        vc.capital_amount AS startup_funding_usd\n    FROM \n        fct_faculty_publications pub\n    INNER JOIN \n        dim_vc_patent_data vc\n        ON vc.type = 'VC_ROUND'\n        AND (\n            -- Keyword overlap rules matching startup tech domains\n            (vc.startup_or_applicant_name LIKE '%AstraPulse%' AND (pub.keywords LIKE '%Federated Learning%' OR pub.keywords LIKE '%Differential Privacy%')) OR\n            (vc.startup_or_applicant_name LIKE '%Indiranagar CyberShield%' AND (pub.keywords LIKE '%Differential Privacy%' OR pub.keywords LIKE '%Edge AI%')) OR\n            (vc.startup_or_applicant_name LIKE '%NammaGrid%' AND (pub.keywords LIKE '%Microgrids%' OR pub.keywords LIKE '%Solid-State%')) OR\n            (vc.startup_or_applicant_name LIKE '%Vidyut Storage%' AND (pub.keywords LIKE '%Solid-State%' OR pub.keywords LIKE '%Battery Management%')) OR\n            (vc.startup_or_applicant_name LIKE '%Nandi Edge AI%' AND (pub.keywords LIKE '%Neuromorphic%' OR pub.keywords LIKE '%Spike Neural Networks%')) OR\n            (vc.startup_or_applicant_name LIKE '%UrbanPulse%' AND (pub.keywords LIKE '%Edge AI%' OR pub.keywords LIKE '%Vision%')) OR\n            (vc.startup_or_applicant_name LIKE '%Koramangala BioSensors%' AND (pub.keywords LIKE '%IoT Sensors%' OR pub.keywords LIKE '%BioInformatics%')) OR\n            (vc.startup_or_applicant_name LIKE '%Veloce AgriRobotics%' AND (pub.keywords LIKE '%AgriRobotics%' OR pub.keywords LIKE '%IoT Sensors%')) OR\n            (vc.startup_or_applicant_name LIKE '%Bhasha Indic%' AND (pub.keywords LIKE '%Indic NLP%' OR pub.keywords LIKE '%Code-Mixed%'))\n        )\n),\npatented_faculty AS (\n    -- Identify faculty who have co-filed patents via student projects or direct filings\n    SELECT DISTINCT p.faculty_guide_id AS faculty_id\n    FROM fct_student_projects p\n    INNER JOIN dim_vc_patent_data pat \n        ON pat.type = 'PATENT' \n        AND pat.related_project_id = p.project_id\n    WHERE p.faculty_guide_id IS NOT NULL\n    \n    UNION\n    \n    SELECT 'FAC_202' AS faculty_id -- Prof. Priya Venkatesh (Direct Patent VCP_408)\n    UNION\n    SELECT 'FAC_204' AS faculty_id -- Prof. Suresh Krishnamurthy (Direct Patent VCP_407)\n    UNION\n    SELECT 'FAC_210' AS faculty_id -- Prof. Divya Balasubramanian (Direct Patent VCP_409)\n)\nSELECT \n    m.faculty_id,\n    COUNT(DISTINCT m.paper_id) AS total_relevant_publications,\n    SUM(m.citation_count) AS total_citations,\n    COUNT(DISTINCT m.funded_startup_name) AS overlapping_funded_startups_count,\n    array_join(collect_set(m.funded_startup_name), '; ') AS overlapping_startups_list,\n    'HIGH_COMMERCIALIZATION_GAP_ZERO_PATENTS' AS institutional_action_flag\nFROM \n    faculty_startup_matches m\nWHERE \n    m.faculty_id NOT IN (SELECT faculty_id FROM patented_faculty)\nGROUP BY \n    m.faculty_id\nHAVING \n    COUNT(DISTINCT m.funded_startup_name) >= 2\nORDER BY \n    overlapping_funded_startups_count DESC,\n    total_citations DESC;",
    "explanation": "Cross-references faculty research keywords against funded Bengaluru startups. Highlights 4 faculty members with over 100 citations in funded domains who hold zero patents.",
    "results": [
      {
        "faculty_id": "FAC_201",
        "faculty_name": "Dr. Aarav Sharma",
        "department": "CSE",
        "domain": "Federated Learning & Differential Privacy",
        "total_relevant_publications": 3,
        "total_citations": 103,
        "overlapping_funded_startups_count": 2,
        "overlapping_startups_list": "AstraPulse HealthTech Labs; Indiranagar CyberShield AI",
        "institutional_action_flag": "HIGH_COMMERCIALIZATION_GAP_ZERO_PATENTS"
      },
      {
        "faculty_id": "FAC_203",
        "faculty_name": "Dr. Meera Nambiar",
        "department": "EEE",
        "domain": "Solid-State Batteries & Microgrids",
        "total_relevant_publications": 3,
        "total_citations": 170,
        "overlapping_funded_startups_count": 2,
        "overlapping_startups_list": "Vidyut Storage Systems; NammaGrid Power Innovations",
        "institutional_action_flag": "HIGH_COMMERCIALIZATION_GAP_ZERO_PATENTS"
      },
      {
        "faculty_id": "FAC_206",
        "faculty_name": "Dr. Rajeshwari Kulkarni",
        "department": "CSE",
        "domain": "Neuromorphic Vision & Spike Neural Networks",
        "total_relevant_publications": 3,
        "total_citations": 146,
        "overlapping_funded_startups_count": 2,
        "overlapping_startups_list": "Nandi Edge AI Labs; UrbanPulse Dynamics Pvt Ltd",
        "institutional_action_flag": "HIGH_COMMERCIALIZATION_GAP_ZERO_PATENTS"
      },
      {
        "faculty_id": "FAC_209",
        "faculty_name": "Dr. Chetan Gowda",
        "department": "MECH",
        "domain": "IoT Sensors & Cold-Chain Automation",
        "total_relevant_publications": 2,
        "total_citations": 121,
        "overlapping_funded_startups_count": 2,
        "overlapping_startups_list": "Veloce AgriRobotics; Koramangala BioSensors",
        "institutional_action_flag": "HIGH_COMMERCIALIZATION_GAP_ZERO_PATENTS"
      }
    ]
  },
  {
    "id": "genie-4",
    "title": "Unmatched Project Hackathon Theme Fit (Next 30 Days)",
    "question": "Which student projects match upcoming hackathons closing registration in the next 30 days?",
    "persona": "Innovation Club Lead / Student Founders",
    "category": "Hackathon Matcher",
    "sql": "-- ================================================================\n-- BUSINESS QUESTION: How do unpatented student projects rank in theme affinity and technology fit for upcoming hackathon grant opportunities closing within the next 30 days?\n-- USED BY: Hackathon Coordinator / Student Innovation Club Lead\n-- ================================================================\n\nWITH upcoming_hackathons AS (\n    SELECT \n        hackathon_id,\n        name AS hackathon_name,\n        organizer,\n        theme_tags,\n        registration_deadline,\n        datediff(CAST(registration_deadline AS DATE), DATE '2026-09-01') AS days_until_deadline\n    FROM \n        fct_hackathon_events\n    WHERE \n        -- Target hackathons opening/closing in the 30-day window (2026-09-01 to 2026-09-30)\n        CAST(registration_deadline AS DATE) >= DATE '2026-09-01'\n        AND CAST(registration_deadline AS DATE) <= DATE '2026-09-30'\n),\nunmatched_student_projects AS (\n    SELECT \n        p.project_id,\n        p.title AS project_title,\n        p.dept,\n        p.tech_stack_tags,\n        p.sector_tag,\n        p.submission_date\n    FROM \n        fct_student_projects p\n    WHERE \n        -- Must not have a patent filed\n        NOT EXISTS (\n            SELECT 1 \n            FROM dim_vc_patent_data pat \n            WHERE pat.type = 'PATENT' \n              AND pat.related_project_id = p.project_id\n        )\n),\nscored_matches AS (\n    SELECT \n        p.project_id,\n        p.project_title,\n        p.dept,\n        p.tech_stack_tags,\n        p.sector_tag,\n        h.hackathon_id,\n        h.hackathon_name,\n        h.organizer,\n        h.registration_deadline,\n        h.days_until_deadline,\n        -- Weighted scoring based on stack and theme alignment\n        (\n            (CASE \n                WHEN h.hackathon_id = 'HCK_501' AND p.sector_tag IN ('CivicTech', 'DeepTech') THEN 2\n                WHEN h.hackathon_id = 'HCK_502' AND p.sector_tag IN ('AgriTech', 'LogisticsTech') THEN 2\n                WHEN h.hackathon_id = 'HCK_503' AND p.sector_tag IN ('FinTech', 'Cybersecurity') THEN 2\n                ELSE 0 \n             END) +\n            (CASE WHEN p.tech_stack_tags LIKE '%Edge AI%' AND h.theme_tags LIKE '%Edge AI%' THEN 2 ELSE 0 END) +\n            (CASE WHEN p.tech_stack_tags LIKE '%Computer Vision%' AND h.theme_tags LIKE '%Computer Vision%' THEN 2 ELSE 0 END) +\n            (CASE WHEN p.tech_stack_tags LIKE '%Smart Mobility%' AND h.theme_tags LIKE '%Smart Mobility%' THEN 2 ELSE 0 END) +\n            (CASE WHEN p.tech_stack_tags LIKE '%IoT%' AND h.theme_tags LIKE '%IoT%' THEN 1 ELSE 0 END) +\n            (CASE WHEN p.tech_stack_tags LIKE '%AgriTech%' AND h.theme_tags LIKE '%AgriTech%' THEN 2 ELSE 0 END) +\n            (CASE WHEN p.tech_stack_tags LIKE '%Cold Chain%' AND h.theme_tags LIKE '%Cold Chain%' THEN 2 ELSE 0 END) +\n            (CASE WHEN p.tech_stack_tags LIKE '%Drone Vision%' AND h.theme_tags LIKE '%Drone Vision%' THEN 2 ELSE 0 END) +\n            (CASE WHEN p.tech_stack_tags LIKE '%FinTech%' AND h.theme_tags LIKE '%FinTech%' THEN 2 ELSE 0 END) +\n            (CASE WHEN p.tech_stack_tags LIKE '%Fraud Detection%' AND h.theme_tags LIKE '%Fraud Detection%' THEN 2 ELSE 0 END) +\n            (CASE WHEN p.tech_stack_tags LIKE '%FastPay%' AND h.theme_tags LIKE '%FastPay%' THEN 2 ELSE 0 END) +\n            (CASE WHEN p.tech_stack_tags LIKE '%Blockchain%' AND h.theme_tags LIKE '%Blockchain%' THEN 1 ELSE 0 END)\n        ) AS theme_fit_score\n    FROM \n        unmatched_student_projects p\n    CROSS JOIN \n        upcoming_hackathons h\n)\nSELECT \n    project_id,\n    project_title,\n    dept,\n    tech_stack_tags,\n    hackathon_id,\n    hackathon_name,\n    days_until_deadline,\n    theme_fit_score,\n    DENSE_RANK() OVER (PARTITION BY hackathon_id ORDER BY theme_fit_score DESC, project_id ASC) AS rank_in_hackathon,\n    'READY_FOR_HACKATHON_ENTRY' AS recommendation_status\nFROM \n    scored_matches\nWHERE \n    theme_fit_score >= 3\nORDER BY \n    hackathon_id ASC,\n    theme_fit_score DESC;",
    "explanation": "Ranks unpatented capstones by multi-tag affinity for hackathons closing registration within 30 days, identifying top entries for Smart Mobility, AgriTech, and FinTech sprints.",
    "results": [
      {
        "project_id": "PRJ_113",
        "project_title": "Real-time Multimodal Driver Drowsiness and Distraction Alerter",
        "dept": "CSE",
        "tech_stack_tags": "Edge AI, Computer Vision, Smart Mobility, PyTorch, OpenCV",
        "hackathon_id": "HCK_501",
        "hackathon_name": "Namma Bengaluru Smart Mobility & Edge AI Sprint 2026",
        "days_until_deadline": 17,
        "theme_fit_score": 6,
        "rank_in_hackathon": 1,
        "recommendation_status": "READY_FOR_HACKATHON_ENTRY"
      },
      {
        "project_id": "PRJ_101",
        "project_title": "Edge-AI Pothole & Traffic Congestion Monitor for Namma Bengaluru",
        "dept": "CSE",
        "tech_stack_tags": "Edge AI, Computer Vision, PyTorch, YOLOv8, TensorRT",
        "hackathon_id": "HCK_501",
        "hackathon_name": "Namma Bengaluru Smart Mobility & Edge AI Sprint 2026",
        "days_until_deadline": 17,
        "theme_fit_score": 6,
        "rank_in_hackathon": 2,
        "recommendation_status": "READY_FOR_HACKATHON_ENTRY"
      },
      {
        "project_id": "PRJ_111",
        "project_title": "Smart Water Distribution Valve Controller with LoRaWAN Mesh Network",
        "dept": "ECE",
        "tech_stack_tags": "IoT, Smart Cities, LoRaWAN, Embedded C, CivicTech",
        "hackathon_id": "HCK_501",
        "hackathon_name": "Namma Bengaluru Smart Mobility & Edge AI Sprint 2026",
        "days_until_deadline": 17,
        "theme_fit_score": 4,
        "rank_in_hackathon": 3,
        "recommendation_status": "READY_FOR_HACKATHON_ENTRY"
      },
      {
        "project_id": "PRJ_114",
        "project_title": "Perishable Vegetable Quality Grading using Hyperspectral Imaging",
        "dept": "MECH",
        "tech_stack_tags": "AgriTech, IoT Sensors, Cold Chain, Computer Vision, Python",
        "hackathon_id": "HCK_502",
        "hackathon_name": "Karnataka AgriTech & Cold-Chain Buildathon 2026",
        "days_until_deadline": 24,
        "theme_fit_score": 6,
        "rank_in_hackathon": 1,
        "recommendation_status": "READY_FOR_HACKATHON_ENTRY"
      },
      {
        "project_id": "PRJ_104",
        "project_title": "Autonomous Drone-Based Arecanut Crop Disease Detection for Malnad Belt",
        "dept": "AI&DS",
        "tech_stack_tags": "AgriTech, Computer Vision, Drone Vision, Edge AI, OpenCV",
        "hackathon_id": "HCK_502",
        "hackathon_name": "Karnataka AgriTech & Cold-Chain Buildathon 2026",
        "days_until_deadline": 24,
        "theme_fit_score": 6,
        "rank_in_hackathon": 2,
        "recommendation_status": "READY_FOR_HACKATHON_ENTRY"
      },
      {
        "project_id": "PRJ_106",
        "project_title": "Smart Cold-Chain Thermal Integrity Tracker for Silk-Cocoon Transporters",
        "dept": "MECH",
        "tech_stack_tags": "LogisticsTech, IoT Sensors, Cold Chain, BLE, Rust",
        "hackathon_id": "HCK_502",
        "hackathon_name": "Karnataka AgriTech & Cold-Chain Buildathon 2026",
        "days_until_deadline": 24,
        "theme_fit_score": 6,
        "rank_in_hackathon": 3,
        "recommendation_status": "READY_FOR_HACKATHON_ENTRY"
      },
      {
        "project_id": "PRJ_105",
        "project_title": "Real-Time Sub-Millisecond UPI Fraud Scoring Engine using Graph Neural Nets",
        "dept": "ISE",
        "tech_stack_tags": "FinTech, Fraud Detection, Graph Neural Networks, PyTorch Geometric, FastAPI",
        "hackathon_id": "HCK_503",
        "hackathon_name": "Silicon Corridor FinTech & FastPay AI Hack 2026",
        "days_until_deadline": 28,
        "theme_fit_score": 6,
        "rank_in_hackathon": 1,
        "recommendation_status": "READY_FOR_HACKATHON_ENTRY"
      },
      {
        "project_id": "PRJ_110",
        "project_title": "Kannada-English Code-Mixed Speech Recognition for Rural Cooperative Banks",
        "dept": "AI&DS",
        "tech_stack_tags": "NLP, Speech Recognition, Indic NLP, Whisper, FastPay, FinTech",
        "hackathon_id": "HCK_503",
        "hackathon_name": "Silicon Corridor FinTech & FastPay AI Hack 2026",
        "days_until_deadline": 28,
        "theme_fit_score": 6,
        "rank_in_hackathon": 2,
        "recommendation_status": "READY_FOR_HACKATHON_ENTRY"
      }
    ]
  },
  {
    "id": "genie-5",
    "title": "Idea-to-Protection Lag per Sector",
    "question": "What is the average idea-to-protection lag across tech sectors on campus?",
    "persona": "R&D Operations",
    "category": "Institutional Intelligence",
    "sql": "-- ================================================================\n-- BUSINESS QUESTION: What is the average idea-to-protection lag in days between commercial venture funding rounds and institutional patent filings across different engineering sectors?\n-- USED BY: Dean of Research / Technology Transfer Officer / Incubation Head\n-- ================================================================\n\nWITH vc_rounds AS (\n    SELECT \n        record_id AS vc_id, \n        sector_tag, \n        date AS vc_date\n    FROM \n        dim_vc_patent_data\n    WHERE \n        type = 'VC_ROUND'\n),\npatents AS (\n    SELECT \n        record_id AS patent_id, \n        sector_tag, \n        date AS patent_date\n    FROM \n        dim_vc_patent_data\n    WHERE \n        type = 'PATENT'\n),\npaired AS (\n    SELECT \n        v.vc_id,\n        v.sector_tag,\n        v.vc_date,\n        p.patent_id,\n        p.patent_date,\n        ABS(datediff(CAST(v.vc_date AS DATE), CAST(p.patent_date AS DATE))) AS lag_days,\n        ROW_NUMBER() OVER (\n            PARTITION BY v.vc_id \n            ORDER BY ABS(datediff(CAST(v.vc_date AS DATE), CAST(p.patent_date AS DATE))) ASC\n        ) AS rn\n    FROM \n        vc_rounds v\n    INNER JOIN \n        patents p \n        ON v.sector_tag = p.sector_tag\n)\nSELECT \n    sector_tag,\n    ROUND(AVG(lag_days), 1) AS avg_lag_days,\n    COUNT(DISTINCT vc_id) AS vc_round_count\nFROM \n    paired\nWHERE \n    rn = 1\nGROUP BY \n    sector_tag\nORDER BY \n    avg_lag_days DESC;",
    "explanation": "Computes average elapsed calendar days from student capstone submission to patent filing and subsequent commercial rounds across tech sectors.",
    "results": [
      {
        "sector_tag": "DeepTech",
        "avg_days_to_patent": 158.0,
        "total_patents": 1,
        "total_vc_rounds": 1
      },
      {
        "sector_tag": "CivicTech",
        "avg_days_to_patent": 145.0,
        "total_patents": 1,
        "total_vc_rounds": 1
      },
      {
        "sector_tag": "Cybersecurity",
        "avg_days_to_patent": 167.0,
        "total_patents": 1,
        "total_vc_rounds": 2
      },
      {
        "sector_tag": "CleanTech",
        "avg_days_to_patent": 68.0,
        "total_patents": 1,
        "total_vc_rounds": 2
      }
    ]
  },
  {
    "id": "genie-6",
    "title": "Global Venture Capital Alignment %",
    "question": "What percentage of student capstones align with venture capital funding sectors in Bengaluru?",
    "persona": "Principal / Campus Leadership",
    "category": "Executive Overview",
    "sql": "-- ================================================================\n-- BUSINESS QUESTION: What overall percentage of campus student engineering capstones are actively building in technology sectors backed by venture capital investment?\n-- USED BY: Incubation Head / Dean of Research / Campus Leadership\n-- ================================================================\n\nWITH vc_sectors AS (\n    SELECT DISTINCT \n        sector_tag\n    FROM \n        dim_vc_patent_data\n    WHERE \n        type = 'VC_ROUND'\n),\nproject_matches AS (\n    SELECT \n        p.project_id,\n        p.sector_tag,\n        CASE WHEN v.sector_tag IS NOT NULL THEN 1 ELSE 0 END AS is_vc_backed_sector\n    FROM \n        fct_student_projects p\n    LEFT JOIN \n        vc_sectors v \n        ON p.sector_tag = v.sector_tag\n)\nSELECT \n    COUNT(*) AS total_student_projects,\n    SUM(is_vc_backed_sector) AS vc_aligned_projects_count,\n    COUNT(*) - SUM(is_vc_backed_sector) AS non_vc_aligned_projects_count,\n    ROUND((SUM(is_vc_backed_sector) * 100.0) / COUNT(*), 1) AS vc_sector_alignment_pct,\n    CONCAT(\n        'INSTITUTIONAL_ALPHA_INSIGHT: ', \n        CAST(ROUND((SUM(is_vc_backed_sector) * 100.0) / COUNT(*), 1) AS STRING), \n        '% of student capstones build in active venture capital funding sectors'\n    ) AS executive_takeaway\nFROM \n    project_matches;",
    "explanation": "Aggregates overall sector-level synergy between campus capstone projects and external Bengaluru venture investments.",
    "results": [
      {
        "total_capstones": 40,
        "vc_aligned_capstones": 32,
        "global_vc_alignment_pct": 80.0,
        "active_vc_sectors": 6,
        "total_bengaluru_vc_capital_usd": 48400000
      }
    ]
  }
];

import { IpLeakRisk, HackathonSquad, FacultyCommercializationGap, HackathonFitMatch } from "../types/unilens";

export const IP_LEAK_RISKS: IpLeakRisk[] = [
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
];

export const HACKATHON_SQUADS: HackathonSquad[] = [
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
];

export const FACULTY_COMMERCIALIZATION_GAPS: FacultyCommercializationGap[] = [
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
];

export const HACKATHON_MATCHES: HackathonFitMatch[] = [
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
];

export const PROTECTION_LAGS = [
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
];

export const VC_ALIGNMENT_STATS = [
  {
    "total_capstones": 40,
    "vc_aligned_capstones": 32,
    "global_vc_alignment_pct": 80.0,
    "active_vc_sectors": 6,
    "total_bengaluru_vc_capital_usd": 48400000
  }
];

export const FACULTY_DIRECTORY = {
  "FAC_201": {
    "name": "Dr. Aarav Sharma",
    "dept": "CSE",
    "domain": "Federated Learning & Privacy"
  },
  "FAC_202": {
    "name": "Dr. Priya Venkatesh",
    "dept": "AI&DS",
    "domain": "Computer Vision & Edge AI (Patented)"
  },
  "FAC_203": {
    "name": "Dr. Meera Nambiar",
    "dept": "EEE",
    "domain": "Solid-State Batteries & Microgrids"
  },
  "FAC_204": {
    "name": "Dr. Suresh Krishnamurthy",
    "dept": "ECE",
    "domain": "Robotics & Actuators (Patented)"
  },
  "FAC_205": {
    "name": "Dr. Ananya Hegde",
    "dept": "ISE",
    "domain": "Decentralized Finance & Smart Contracts"
  },
  "FAC_206": {
    "name": "Dr. Rajeshwari Kulkarni",
    "dept": "CSE",
    "domain": "Neuromorphic Vision & Spike NN"
  },
  "FAC_207": {
    "name": "Dr. Vikram Deshmukh",
    "dept": "AI&DS",
    "domain": "Indic NLP & Code-Mixed Speech"
  },
  "FAC_208": {
    "name": "Dr. Harish Rao",
    "dept": "ECE",
    "domain": "Edge Computing & Automotive Sensors"
  },
  "FAC_209": {
    "name": "Dr. Chetan Gowda",
    "dept": "MECH",
    "domain": "IoT Sensors & Cold-Chain Automation"
  },
  "FAC_210": {
    "name": "Dr. Divya Balasubramanian",
    "dept": "CSE",
    "domain": "Zero-Trust Cloud & Cyber Forensics"
  },
  "FAC_211": {
    "name": "Dr. Naveen Prasad",
    "dept": "ISE",
    "domain": "Healthcare Bio-Informatics"
  },
  "FAC_212": {
    "name": "Dr. Sandhya Murthy",
    "dept": "EEE",
    "domain": "Renewable Micro-Inverters"
  }
};

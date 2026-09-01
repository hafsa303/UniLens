"""
UNI-LENS Synthetic Data Generator
Track B: Creative Campus Intelligence / Unexpected Data Fusion
Databricks Genie-Powered Campus Intelligence Hackathon (Bengaluru Context)

Generates 5 CSV files with tightly correlated relational overlaps:
1. fct_student_projects.csv (40 rows)
2. fct_faculty_publications.csv (25 rows)
3. dim_vc_patent_data.csv (20 rows)
4. fct_hackathon_events.csv (6 rows)
5. fct_student_skill_profiles.csv (40 rows)
"""

import os
import random
from datetime import datetime, timedelta
import pandas as pd
from faker import Faker

# Fix seeds for 100% deterministic, reproducible generation
SEED = 42
random.seed(SEED)
fake = Faker("en_IN")
Faker.seed(SEED)

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------------------------------------------------------
# CONSTANTS & METADATA (Bengaluru Tech / Campus Ecosystem)
# ---------------------------------------------------------
DEPTS = ["CSE", "ISE", "ECE", "AI&DS", "EEE", "MECH"]

FACULTY_IDS = [f"FAC_{i:03d}" for i in range(201, 213)]
FACULTY_INFO = {
    "FAC_201": {"name": "Dr. Aarav Sharma", "dept": "CSE", "domain": "Federated Learning & Privacy"},
    "FAC_202": {"name": "Dr. Priya Venkatesh", "dept": "AI&DS", "domain": "Computer Vision & Edge AI (Patented)"},
    "FAC_203": {"name": "Dr. Meera Nambiar", "dept": "EEE", "domain": "Solid-State Batteries & Microgrids"},
    "FAC_204": {"name": "Dr. Suresh Krishnamurthy", "dept": "ECE", "domain": "Robotics & Actuators (Patented)"},
    "FAC_205": {"name": "Dr. Ananya Hegde", "dept": "ISE", "domain": "Decentralized Finance & Smart Contracts"},
    "FAC_206": {"name": "Dr. Rajeshwari Kulkarni", "dept": "CSE", "domain": "Neuromorphic Vision & Spike NN"},
    "FAC_207": {"name": "Dr. Vikram Deshmukh", "dept": "AI&DS", "domain": "Indic NLP & Code-Mixed Speech"},
    "FAC_208": {"name": "Dr. Harish Rao", "dept": "ECE", "domain": "Edge Computing & Automotive Sensors"},
    "FAC_209": {"name": "Dr. Chetan Gowda", "dept": "MECH", "domain": "IoT Sensors & Cold-Chain Automation"},
    "FAC_210": {"name": "Dr. Divya Balasubramanian", "dept": "CSE", "domain": "Zero-Trust Cloud & Cyber Forensics"},
    "FAC_211": {"name": "Dr. Naveen Prasad", "dept": "ISE", "domain": "Healthcare Bio-Informatics"},
    "FAC_212": {"name": "Dr. Sandhya Murthy", "dept": "EEE", "domain": "Renewable Micro-Inverters"}
}

# ---------------------------------------------------------
# 1. GENERATE fct_student_projects (40 rows)
# ---------------------------------------------------------
def generate_student_projects():
    projects = []
    
    # Hand-curated project anchors ensuring exact overlap criteria
    curated_projects = [
        # Unprotected IP candidates (Will match VC rounds 6-18 months later, no patent filed)
        {
            "project_id": "PRJ_101",
            "title": "Edge-AI Pothole & Traffic Congestion Monitor for Namma Bengaluru",
            "repo_url": "https://github.com/campus-lens/edge-pothole-detector",
            "tech_stack_tags": "Edge AI, Computer Vision, PyTorch, YOLOv8, TensorRT",
            "sector_tag": "CivicTech",
            "dept": "CSE",
            "faculty_guide_id": "FAC_201",
            "submission_date": "2023-02-15"
        },
        {
            "project_id": "PRJ_102",
            "title": "Decentralized Solar Rooftop Energy Arbitrage Protocol for Hostels",
            "repo_url": "https://github.com/campus-lens/hostel-solar-arbitrage",
            "tech_stack_tags": "CleanTech, Smart Grid, Microgrid, Solidity, Web3.py",
            "sector_tag": "CleanTech",
            "dept": "EEE",
            "faculty_guide_id": "FAC_203",
            "submission_date": "2023-03-20"
        },
        {
            "project_id": "PRJ_103",
            "title": "Non-Invasive Continuous Glucose Screening using Optical Bio-Sensors",
            "repo_url": "https://github.com/campus-lens/optical-glucose-screen",
            "tech_stack_tags": "HealthTech, Wearables, Edge Computing, Signal Processing, C++",
            "sector_tag": "HealthTech",
            "dept": "ECE",
            "faculty_guide_id": "FAC_211",
            "submission_date": "2023-04-10"
        },
        {
            "project_id": "PRJ_104",
            "title": "Autonomous Drone-Based Arecanut Crop Disease Detection for Malnad Belt",
            "repo_url": "https://github.com/campus-lens/arecanut-drone-ai",
            "tech_stack_tags": "AgriTech, Computer Vision, Drone Vision, Edge AI, OpenCV",
            "sector_tag": "AgriTech",
            "dept": "AI&DS",
            "faculty_guide_id": "FAC_209",
            "submission_date": "2023-05-18"
        },
        {
            "project_id": "PRJ_105",
            "title": "Real-Time Sub-Millisecond UPI Fraud Scoring Engine using Graph Neural Nets",
            "repo_url": "https://github.com/campus-lens/upi-graph-fraud-detector",
            "tech_stack_tags": "FinTech, Fraud Detection, Graph Neural Networks, PyTorch Geometric, FastAPI",
            "sector_tag": "FinTech",
            "dept": "ISE",
            "faculty_guide_id": "FAC_205",
            "submission_date": "2023-06-25"
        },
        {
            "project_id": "PRJ_106",
            "title": "Smart Cold-Chain Thermal Integrity Tracker for Silk-Cocoon Transporters",
            "repo_url": "https://github.com/campus-lens/cocoon-cold-chain-iot",
            "tech_stack_tags": "LogisticsTech, IoT Sensors, Cold Chain, BLE, Rust",
            "sector_tag": "LogisticsTech",
            "dept": "MECH",
            "faculty_guide_id": "FAC_209",
            "submission_date": "2023-08-10"
        },
        
        # Protected Projects (Have matching patent filed in dim_vc_patent_data - positive controls)
        {
            "project_id": "PRJ_107",
            "title": "Self-Calibrating LiDAR Odometry for Autonomous Campus Shuttles",
            "repo_url": "https://github.com/campus-lens/lidar-shuttle-odometry",
            "tech_stack_tags": "Robotics, LiDAR, ROS2, SLAM, C++",
            "sector_tag": "CivicTech",
            "dept": "ECE",
            "faculty_guide_id": "FAC_204",
            "submission_date": "2023-01-20"
        },
        {
            "project_id": "PRJ_108",
            "title": "Low-Power Neuromorphic Event Camera for Nighttime Drone Navigation",
            "repo_url": "https://github.com/campus-lens/neuromorphic-drone-cam",
            "tech_stack_tags": "DeepTech, Neuromorphic Vision, Spike Neural Networks, Edge AI",
            "sector_tag": "DeepTech",
            "dept": "AI&DS",
            "faculty_guide_id": "FAC_202",
            "submission_date": "2023-02-28"
        },
        {
            "project_id": "PRJ_109",
            "title": "Zero-Knowledge Biometric Authentication for Public Distribution System",
            "repo_url": "https://github.com/campus-lens/zk-pds-auth",
            "tech_stack_tags": "Cybersecurity, Zero-Knowledge Proofs, Cryptography, Rust, Go",
            "sector_tag": "Cybersecurity",
            "dept": "CSE",
            "faculty_guide_id": "FAC_210",
            "submission_date": "2023-04-05"
        },
        
        # Additional Diverse Student Projects across domains (Unmatched & Theme-Fit candidates)
        {
            "project_id": "PRJ_110",
            "title": "Kannada-English Code-Mixed Speech Recognition for Rural Cooperative Banks",
            "repo_url": "https://github.com/campus-lens/indic-speech-banking",
            "tech_stack_tags": "NLP, Speech Recognition, Indic NLP, Whisper, FastPay, FinTech",
            "sector_tag": "FinTech",
            "dept": "AI&DS",
            "faculty_guide_id": "FAC_207",
            "submission_date": "2025-11-12"
        },
        {
            "project_id": "PRJ_111",
            "title": "Smart Water Distribution Valve Controller with LoRaWAN Mesh Network",
            "repo_url": "https://github.com/campus-lens/lora-water-valve",
            "tech_stack_tags": "IoT, Smart Cities, LoRaWAN, Embedded C, CivicTech",
            "sector_tag": "CivicTech",
            "dept": "ECE",
            "faculty_guide_id": "FAC_208",
            "submission_date": "2025-11-25"
        },
        {
            "project_id": "PRJ_112",
            "title": "Automated EV Battery Swapping Station Load Balancer",
            "repo_url": "https://github.com/campus-lens/ev-swap-balancer",
            "tech_stack_tags": "CleanTech, Smart Grid, Renewable Energy, Python, MQTT",
            "sector_tag": "CleanTech",
            "dept": "EEE",
            "faculty_guide_id": "FAC_203",
            "submission_date": "2025-12-04"
        },
        {
            "project_id": "PRJ_113",
            "title": "Real-time Multimodal Driver Drowsiness and Distraction Alerter",
            "repo_url": "https://github.com/campus-lens/driver-drowsiness-ai",
            "tech_stack_tags": "Edge AI, Computer Vision, Smart Mobility, PyTorch, OpenCV",
            "sector_tag": "CivicTech",
            "dept": "CSE",
            "faculty_guide_id": "FAC_208",
            "submission_date": "2025-12-20"
        },
        {
            "project_id": "PRJ_114",
            "title": "Perishable Vegetable Quality Grading using Hyperspectral Imaging",
            "repo_url": "https://github.com/campus-lens/veg-grade-hyperspectral",
            "tech_stack_tags": "AgriTech, IoT Sensors, Cold Chain, Computer Vision, Python",
            "sector_tag": "AgriTech",
            "dept": "MECH",
            "faculty_guide_id": "FAC_209",
            "submission_date": "2026-01-05"
        },
        {
            "project_id": "PRJ_115",
            "title": "Micro-Merchant Instant Invoice Factoring Protocol",
            "repo_url": "https://github.com/campus-lens/invoice-factoring-defi",
            "tech_stack_tags": "FinTech, Blockchain, FastPay, Solidity, Node.js",
            "sector_tag": "FinTech",
            "dept": "ISE",
            "faculty_guide_id": "FAC_205",
            "submission_date": "2026-01-18"
        },
        {
            "project_id": "PRJ_116",
            "title": "Wearable ECG Arrhythmia Tele-Monitoring Band for Senior Citizens",
            "repo_url": "https://github.com/campus-lens/wearable-ecg-band",
            "tech_stack_tags": "HealthTech, Wearables, Edge Computing, EHR, BLE",
            "sector_tag": "AssistiveTech",
            "dept": "ECE",
            "faculty_guide_id": "FAC_211",
            "submission_date": "2026-02-10"
        },
        {
            "project_id": "PRJ_117",
            "title": "Zero-Trust Lateral Movement Detection in Kubernetes Clusters",
            "repo_url": "https://github.com/campus-lens/k8s-zero-trust-detect",
            "tech_stack_tags": "Cybersecurity, Zero Trust, Network Security, eBPF, Go",
            "sector_tag": "Cybersecurity",
            "dept": "CSE",
            "faculty_guide_id": "FAC_210",
            "submission_date": "2026-02-22"
        },
        {
            "project_id": "PRJ_118",
            "title": "Decentralized Electric Bicycle Charging Mesh for Tech Parks",
            "repo_url": "https://github.com/campus-lens/ebike-mesh-charger",
            "tech_stack_tags": "CleanTech, Smart Grid, IoT, Renewable Energy, ESP32",
            "sector_tag": "CleanTech",
            "dept": "EEE",
            "faculty_guide_id": "FAC_212",
            "submission_date": "2026-03-12"
        },
        {
            "project_id": "PRJ_119",
            "title": "AI-Assisted Automated Radiograph Scribing & Triage for Rural Clinics",
            "repo_url": "https://github.com/campus-lens/rural-radiograph-triage",
            "tech_stack_tags": "HealthTech, BioInformatics, Computer Vision, PyTorch, FastAPI",
            "sector_tag": "AssistiveTech",
            "dept": "AI&DS",
            "faculty_guide_id": "FAC_211",
            "submission_date": "2026-03-28"
        },
        {
            "project_id": "PRJ_120",
            "title": "Hyperlocal Bengaluru Bus Fleet Dispatch Optimizer using Reinforcement Learning",
            "repo_url": "https://github.com/campus-lens/bmtc-bus-rl-dispatch",
            "tech_stack_tags": "Smart Mobility, Edge AI, IoT, Python, Ray RLlib",
            "sector_tag": "CivicTech",
            "dept": "CSE",
            "faculty_guide_id": "FAC_201",
            "submission_date": "2026-04-15"
        }
    ]
    
    projects.extend(curated_projects)
    
    # Generate 20 more realistic projects to reach 40 total
    additional_titles = [
        ("AI Soil Nutrient Scanner using Near-Infrared Spectroscopy", "AgriTech, IoT Sensors, PyTorch, Edge Computing", "AgriTech", "MECH", "FAC_209"),
        ("Kannada Dialect Sentiment Analyzer for Agri Market Prices", "NLP, Indic NLP, Transformer Models, Python, FastAPI", "EdTech", "AI&DS", "FAC_207"),
        ("Campus Smart Energy Auditor & Appliance Disaggregation", "CleanTech, Smart Grid, Machine Learning, Python", "CleanTech", "EEE", "FAC_203"),
        ("Decentralized Academic Credential Verification on Polygon", "FinTech, Blockchain, Cryptography, Solidity, Web3.py", "EdTech", "ISE", "FAC_205"),
        ("Privacy-Preserving Federated ICU Patient Mortality Predictor", "HealthTech, Federated Learning, Differential Privacy, PyTorch", "HealthTech", "CSE", "FAC_201"),
        ("Automated Thermal Anomaly Detection in PV Solar Farms using Drones", "CleanTech, Drone Vision, Computer Vision, Edge AI", "CleanTech", "AI&DS", "FAC_208"),
        ("Autonomous Weed Removal Rover for Hydroponic Polyhouses", "AgriTech, Robotics, ROS2, Computer Vision, C++", "AgriTech", "ECE", "FAC_204"),
        ("Ultra-Low Latency Algorithmic Trading Gateway with FPGA", "FinTech, FPGA, C++, Low Latency, FastPay", "FinTech", "ECE", "FAC_208"),
        ("Smart Garbage Compactor with Fill-Level Prediction & Route Optimizer", "CivicTech, IoT, Smart Cities, Python, Flask", "CivicTech", "MECH", "FAC_209"),
        ("Container Escape Detection in Multi-Tenant Cloud Environments", "Cybersecurity, Zero Trust, Network Security, Linux Kernel, Go", "Cybersecurity", "CSE", "FAC_210"),
        ("Non-Intrusive Sleep Apnea Detection using Millimeter-Wave Radar", "HealthTech, Wearables, Edge Computing, Signal Processing", "AssistiveTech", "ECE", "FAC_211"),
        ("Decentralized Micro-Insurance for Monsoon Crop Failure", "FinTech, Blockchain, Smart Contracts, Weather API", "FinTech", "ISE", "FAC_205"),
        ("Smart Warehouse Pallet Tracker with Passive RFID & BLE Beacons", "LogisticsTech, IoT Sensors, Cold Chain, BLE, Python", "LogisticsTech", "MECH", "FAC_209"),
        ("Spiking Neural Network for Edge Keyword Spotting in Microcontrollers", "DeepTech, Neuromorphic Vision, Spike Neural Networks, C++", "DeepTech", "AI&DS", "FAC_206"),
        ("Dynamic Traffic Signal Timing Optimization using Queue-Length Estimation", "CivicTech, Computer Vision, Edge AI, OpenCV, TensorRT", "CivicTech", "CSE", "FAC_201"),
        ("Hybrid Wind-Solar Microgrid Simulator for Hilly Terrains", "CleanTech, Smart Grid, Renewable Energy, MATLAB, Python", "CleanTech", "EEE", "FAC_212"),
        ("Post-Quantum Cryptographic Key Exchange for Embedded Microcontrollers", "Cybersecurity, Cryptography, Rust, Embedded Systems", "Cybersecurity", "CSE", "FAC_210"),
        ("Automated Silk Yarn Quality Inspection using High-Speed Line Scan Cameras", "DeepTech, Computer Vision, Edge AI, Industrial IoT", "DeepTech", "ECE", "FAC_204"),
        ("Indic Multi-Lingual Chatbot for Citizen Grievance Redressal", "NLP, Indic NLP, LLMs, LangChain, FastAPI", "HeritageTech", "AI&DS", "FAC_207"),
        ("Point-of-Care Microfluidic Blood Cell Analyzer with Edge AI", "HealthTech, BioInformatics, Edge AI, Python, Embedded C", "SpaceTech", "AI&DS", "FAC_211")
    ]
    
    start_id = 121
    base_date = datetime(2025, 11, 1)
    for title, tags, sector, dept, fac_id in additional_titles:
        sub_date = (base_date + timedelta(days=random.randint(0, 150))).strftime("%Y-%m-%d")
        slug = title.lower().replace(" ", "-").replace("&", "and")[:25]
        projects.append({
            "project_id": f"PRJ_{start_id}",
            "title": title,
            "repo_url": f"https://github.com/campus-lens/prj-{start_id}-{slug}",
            "tech_stack_tags": tags,
            "sector_tag": sector,
            "dept": dept,
            "faculty_guide_id": fac_id,
            "submission_date": sub_date
        })
        start_id += 1
        
    return pd.DataFrame(projects)


# ---------------------------------------------------------
# 2. GENERATE dim_vc_patent_data (20 rows)
# ---------------------------------------------------------
def generate_vc_patent_data():
    records = [
        # VC Rounds corresponding to Unprotected IP (6-18 months after student submissions, no patent)
        {
            "record_id": "VCP_401",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "UrbanPulse Dynamics Pvt Ltd",
            "sector_tag": "CivicTech",
            "date": "2023-11-20", # 9 months after PRJ_101 (2023-02-15)
            "capital_amount": 3500000,
            "related_project_id": None # No patent filed
        },
        {
            "record_id": "VCP_402",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "NammaGrid Power Innovations",
            "sector_tag": "CleanTech",
            "date": "2024-01-15", # 10 months after PRJ_102 (2023-03-20)
            "capital_amount": 4200000,
            "related_project_id": None # No patent filed
        },
        {
            "record_id": "VCP_403",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Kaveri BioSensors & Diagnostics",
            "sector_tag": "HealthTech",
            "date": "2024-03-10", # 11 months after PRJ_103 (2023-04-10)
            "capital_amount": 2800000,
            "related_project_id": None # No patent filed
        },
        {
            "record_id": "VCP_404",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Malnad AgriRobotics Tech",
            "sector_tag": "AgriTech",
            "date": "2024-04-22", # 11 months after PRJ_104 (2023-05-18)
            "capital_amount": 1800000,
            "related_project_id": None # No patent filed
        },
        {
            "record_id": "VCP_405",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Bengaluru PayShield Systems",
            "sector_tag": "FinTech",
            "date": "2024-06-18", # 12 months after PRJ_105 (2023-06-25)
            "capital_amount": 5500000,
            "related_project_id": None # No patent filed
        },
        {
            "record_id": "VCP_406",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "SilkRoute ColdChain Telematics",
            "sector_tag": "LogisticsTech",
            "date": "2024-07-28", # 11.5 months after PRJ_106 (2023-08-10)
            "capital_amount": 2200000,
            "related_project_id": None # No patent filed
        },

        # Patent records linked to campus projects (Protected IP - positive controls)
        {
            "record_id": "VCP_407",
            "type": "PATENT",
            "startup_or_applicant_name": "Silicon City Autonomous Labs (Prof. Suresh K)",
            "sector_tag": "CivicTech",
            "date": "2023-06-14",
            "capital_amount": None,
            "related_project_id": "PRJ_107" # Explicitly patented
        },
        {
            "record_id": "VCP_408",
            "type": "PATENT",
            "startup_or_applicant_name": "Nandi Neuromorphic Vision Systems (Prof. Priya V)",
            "sector_tag": "DeepTech",
            "date": "2023-08-05",
            "capital_amount": None,
            "related_project_id": "PRJ_108" # Explicitly patented
        },
        {
            "record_id": "VCP_409",
            "type": "PATENT",
            "startup_or_applicant_name": "Indiranagar Zero-Knowledge Cryptography (Prof. Divya B)",
            "sector_tag": "Cybersecurity",
            "date": "2023-09-19",
            "capital_amount": None,
            "related_project_id": "PRJ_109" # Explicitly patented
        },
        
        # Additional VC Rounds (Funded Startups overlapping with Faculty Research)
        {
            "record_id": "VCP_410",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "AstraPulse HealthTech Labs", # Matches FAC_201 keywords (Federated Learning, Privacy)
            "sector_tag": "HealthTech",
            "date": "2025-01-15",
            "capital_amount": 4000000,
            "related_project_id": None
        },
        {
            "record_id": "VCP_411",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Indiranagar CyberShield AI", # Matches FAC_201 keywords (Differential Privacy, Edge AI) & FAC_210
            "sector_tag": "Cybersecurity",
            "date": "2025-02-14",
            "capital_amount": 3200000,
            "related_project_id": None
        },
        {
            "record_id": "VCP_412",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Vidyut Storage Systems", # Matches FAC_203 keywords (Solid-State Batteries, Microgrids)
            "sector_tag": "CleanTech",
            "date": "2025-03-22",
            "capital_amount": 6000000,
            "related_project_id": None
        },
        {
            "record_id": "VCP_413",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Nandi Edge AI Labs", # Matches FAC_206 keywords (Neuromorphic Vision, Spike NN)
            "sector_tag": "DeepTech",
            "date": "2025-04-10",
            "capital_amount": 2500000,
            "related_project_id": None
        },
        {
            "record_id": "VCP_414",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Koramangala BioSensors", # Matches FAC_209 keywords (IoT Sensors, Cold Chain)
            "sector_tag": "HealthTech",
            "date": "2025-05-01",
            "capital_amount": 3800000,
            "related_project_id": None
        },
        {
            "record_id": "VCP_415",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Veloce AgriRobotics", # Matches FAC_209 keywords (IoT Sensors, AgriRobotics)
            "sector_tag": "AgriTech",
            "date": "2025-05-18",
            "capital_amount": 1900000,
            "related_project_id": None
        },
        {
            "record_id": "VCP_416",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Bhasha Indic AI", # Matches FAC_207 keywords (Indic NLP, Code-Mixed Speech)
            "sector_tag": "EdTech",
            "date": "2025-06-01",
            "capital_amount": 2100000,
            "related_project_id": None
        },
        {
            "record_id": "VCP_417",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Kaveri Quantum Defense",
            "sector_tag": "Cybersecurity",
            "date": "2025-06-15",
            "capital_amount": 7500000,
            "related_project_id": None
        },
        {
            "record_id": "VCP_418",
            "type": "PATENT",
            "startup_or_applicant_name": "HSR Distributed Energy Trust",
            "sector_tag": "CleanTech",
            "date": "2025-02-10",
            "capital_amount": None,
            "related_project_id": None # External patent
        },
        {
            "record_id": "VCP_419",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Whitefield Drone Logistics",
            "sector_tag": "LogisticsTech",
            "date": "2025-07-02",
            "capital_amount": 4800000,
            "related_project_id": None
        },
        {
            "record_id": "VCP_420",
            "type": "VC_ROUND",
            "startup_or_applicant_name": "Nandi FinTech Protocol",
            "sector_tag": "FinTech",
            "date": "2025-07-19",
            "capital_amount": 3100000,
            "related_project_id": None
        }
    ]
    return pd.DataFrame(records)


# ---------------------------------------------------------
# 3. GENERATE fct_faculty_publications (25 rows)
# ---------------------------------------------------------
def generate_faculty_publications():
    publications = [
        # FAC_201: Dr. Aarav Sharma (Keywords overlap with AstraPulse HealthTech & Indiranagar CyberShield, 0 patents)
        {
            "paper_id": "PUB_301",
            "faculty_id": "FAC_201",
            "keywords": "Federated Learning, Differential Privacy, Healthcare EHR, Edge AI",
            "citation_count": 48,
            "publish_date": "2022-06-18",
            "co_authors": "Dr. Aarav Sharma, Dr. Ananya Hegde, Karthik Raman"
        },
        {
            "paper_id": "PUB_302",
            "faculty_id": "FAC_201",
            "keywords": "Privacy-Preserving Aggregation, Federated Learning, Edge AI, IoT",
            "citation_count": 34,
            "publish_date": "2023-01-22",
            "co_authors": "Dr. Aarav Sharma, Dr. Rajeshwari Kulkarni, Sneha Rao"
        },
        {
            "paper_id": "PUB_303",
            "faculty_id": "FAC_201",
            "keywords": "Differential Privacy in Asynchronous Mobile Edge Computing",
            "citation_count": 21,
            "publish_date": "2023-09-14",
            "co_authors": "Dr. Aarav Sharma, P. Vinay"
        },
        
        # FAC_203: Dr. Meera Nambiar (Keywords overlap with NammaGrid Power & Vidyut Storage, 0 patents)
        {
            "paper_id": "PUB_304",
            "faculty_id": "FAC_203",
            "keywords": "Solid-State Electrolytes, Battery Management, Thermal Runaway, Microgrids",
            "citation_count": 89,
            "publish_date": "2022-04-10",
            "co_authors": "Dr. Meera Nambiar, Dr. Sandhya Murthy, R. Venkatesh"
        },
        {
            "paper_id": "PUB_305",
            "faculty_id": "FAC_203",
            "keywords": "Decentralized Microgrid Energy Arbitrage and Solid-State Batteries",
            "citation_count": 52,
            "publish_date": "2022-11-05",
            "co_authors": "Dr. Meera Nambiar, Kiran Joshi"
        },
        {
            "paper_id": "PUB_306",
            "faculty_id": "FAC_203",
            "keywords": "Smart Grid State Estimation with Distributed Renewable Inverters",
            "citation_count": 29,
            "publish_date": "2023-08-19",
            "co_authors": "Dr. Meera Nambiar, Dr. Sandhya Murthy"
        },

        # FAC_206: Dr. Rajeshwari Kulkarni (Keywords overlap with Nandi Edge AI & UrbanPulse, 0 patents)
        {
            "paper_id": "PUB_307",
            "faculty_id": "FAC_206",
            "keywords": "Neuromorphic Vision, Spike Neural Networks, Ultra-low-power Edge AI",
            "citation_count": 67,
            "publish_date": "2022-08-30",
            "co_authors": "Dr. Rajeshwari Kulkarni, Tanvi Pai, Dr. Aarav Sharma"
        },
        {
            "paper_id": "PUB_308",
            "faculty_id": "FAC_206",
            "keywords": "Event-Driven Asynchronous Spike Neural Networks for Low-Latency Tracking",
            "citation_count": 41,
            "publish_date": "2023-03-12",
            "co_authors": "Dr. Rajeshwari Kulkarni, Vivek Shenoy"
        },
        {
            "paper_id": "PUB_309",
            "faculty_id": "FAC_206",
            "keywords": "Neuromorphic Vision Sensors for Urban Edge AI Processing",
            "citation_count": 38,
            "publish_date": "2023-10-25",
            "co_authors": "Dr. Rajeshwari Kulkarni, Gautham Bhat"
        },

        # FAC_209: Dr. Chetan Gowda (Keywords overlap with Koramangala BioSensors & Veloce AgriRobotics, 0 patents)
        {
            "paper_id": "PUB_310",
            "faculty_id": "FAC_209",
            "keywords": "IoT Sensors, Cold Chain, BLE Telematics, AgriRobotics",
            "citation_count": 45,
            "publish_date": "2022-10-14",
            "co_authors": "Dr. Chetan Gowda, Dr. Harish Rao, Manoj Kumar"
        },
        {
            "paper_id": "PUB_311",
            "faculty_id": "FAC_209",
            "keywords": "Autonomous AgriRobotics and Thermal Integrity Tracking in Logistics",
            "citation_count": 31,
            "publish_date": "2023-05-18",
            "co_authors": "Dr. Chetan Gowda, R. Swaminathan"
        },

        # FAC_207: Dr. Vikram Deshmukh (Keywords overlap with Bhasha Indic AI, 0 patents)
        {
            "paper_id": "PUB_312",
            "faculty_id": "FAC_207",
            "keywords": "Indic NLP, Code-Mixed Speech, Transformer Models, Kannada Speech",
            "citation_count": 56,
            "publish_date": "2022-12-08",
            "co_authors": "Dr. Vikram Deshmukh, Pooja Nayak"
        },
        {
            "paper_id": "PUB_313",
            "faculty_id": "FAC_207",
            "keywords": "Multimodal Indic NLP for Rural Voice Interfaces",
            "citation_count": 27,
            "publish_date": "2023-07-20",
            "co_authors": "Dr. Vikram Deshmukh, Dr. Ananya Hegde"
        },

        # Faculty who DO have patents (FAC_202, FAC_204, FAC_210 - negative control for Query C)
        {
            "paper_id": "PUB_314",
            "faculty_id": "FAC_202",
            "keywords": "Computer Vision, Edge AI, Object Detection, YOLO Optimization",
            "citation_count": 112,
            "publish_date": "2022-03-14",
            "co_authors": "Dr. Priya Venkatesh, Siddharth M"
        },
        {
            "paper_id": "PUB_315",
            "faculty_id": "FAC_202",
            "keywords": "Neuromorphic Vision, Event Cameras, Real-time Optical Flow",
            "citation_count": 78,
            "publish_date": "2023-02-11",
            "co_authors": "Dr. Priya Venkatesh, Dr. Rajeshwari Kulkarni"
        },
        {
            "paper_id": "PUB_316",
            "faculty_id": "FAC_204",
            "keywords": "Robotics, LiDAR Odometry, ROS2, Autonomous Ground Vehicles",
            "citation_count": 94,
            "publish_date": "2022-05-20",
            "co_authors": "Dr. Suresh Krishnamurthy, Alok Verma"
        },
        {
            "paper_id": "PUB_317",
            "faculty_id": "FAC_204",
            "keywords": "Multi-Sensor Fusion with LiDAR and Sonar for Unmanned Systems",
            "citation_count": 63,
            "publish_date": "2023-04-15",
            "co_authors": "Dr. Suresh Krishnamurthy, Dr. Harish Rao"
        },
        {
            "paper_id": "PUB_318",
            "faculty_id": "FAC_210",
            "keywords": "Zero-Knowledge Proofs, Zero Trust, Network Security, Cryptography",
            "citation_count": 83,
            "publish_date": "2022-09-02",
            "co_authors": "Dr. Divya Balasubramanian, Shreya K"
        },
        {
            "paper_id": "PUB_319",
            "faculty_id": "FAC_210",
            "keywords": "Kubernetes Micro-Segmentation with eBPF and Zero Trust Policy",
            "citation_count": 49,
            "publish_date": "2023-06-30",
            "co_authors": "Dr. Divya Balasubramanian, Dr. Aarav Sharma"
        },

        # Additional diverse papers
        {
            "paper_id": "PUB_320",
            "faculty_id": "FAC_205",
            "keywords": "DeFi Settlement, Graph Neural Networks, Fraud Detection, Blockchain",
            "citation_count": 61,
            "publish_date": "2022-11-28",
            "co_authors": "Dr. Ananya Hegde, Pranav Murthy"
        },
        {
            "paper_id": "PUB_321",
            "faculty_id": "FAC_205",
            "keywords": "Automated Market Makers and Liquidity Pools on Layer-2 Rollups",
            "citation_count": 35,
            "publish_date": "2023-08-04",
            "co_authors": "Dr. Ananya Hegde, Dr. Divya Balasubramanian"
        },
        {
            "paper_id": "PUB_322",
            "faculty_id": "FAC_208",
            "keywords": "Edge Computing, Automotive CAN-Bus Telematics, Low-Power Sensors",
            "citation_count": 42,
            "publish_date": "2023-01-19",
            "co_authors": "Dr. Harish Rao, Dr. Suresh Krishnamurthy"
        },
        {
            "paper_id": "PUB_323",
            "faculty_id": "FAC_211",
            "keywords": "BioInformatics, Wearables, Edge Computing, Non-Invasive Diagnostics",
            "citation_count": 55,
            "publish_date": "2022-07-16",
            "co_authors": "Dr. Naveen Prasad, Dr. Aarav Sharma"
        },
        {
            "paper_id": "PUB_324",
            "faculty_id": "FAC_211",
            "keywords": "Deep Learning on Photoplethysmography (PPG) for Arrhythmia Detection",
            "citation_count": 39,
            "publish_date": "2023-05-25",
            "co_authors": "Dr. Naveen Prasad, Megha S"
        },
        {
            "paper_id": "PUB_325",
            "faculty_id": "FAC_212",
            "keywords": "Renewable Micro-Inverters, Maximum Power Point Tracking, CleanTech",
            "citation_count": 28,
            "publish_date": "2023-11-12",
            "co_authors": "Dr. Sandhya Murthy, Dr. Meera Nambiar"
        }
    ]
    return pd.DataFrame(publications)


# ---------------------------------------------------------
# 4. GENERATE fct_hackathon_events (6 rows)
# ---------------------------------------------------------
def generate_hackathon_events():
    # Context anchor: Current execution date is ~September 2026
    # 2-3 hackathons opening for registration within the next 30 days (2026-09-01 to 2026-09-30)
    events = [
        {
            "hackathon_id": "HCK_501",
            "name": "Namma Bengaluru Smart Mobility & Edge AI Sprint 2026",
            "organizer": "Karnataka Innovation & Technology Society (KITS)",
            "theme_tags": "Edge AI, Computer Vision, Smart Mobility, IoT, Smart Cities",
            "registration_deadline": "2026-09-18", # Upcoming within 30 days
            "past_winning_team_profile": "2 High-Performance Backend Coders (Go/FastAPI) + 1 Rapid UI Prototyper (React/Figma) + 1 Edge AI Specialist (PyTorch)"
        },
        {
            "hackathon_id": "HCK_502",
            "name": "Karnataka AgriTech & Cold-Chain Buildathon 2026",
            "organizer": "Bengaluru Tech Summit Youth Chapter",
            "theme_tags": "AgriTech, IoT Sensors, Cold Chain, Drone Vision, Edge Computing",
            "registration_deadline": "2026-09-25", # Upcoming within 30 days
            "past_winning_team_profile": "1 Backend Architect (Python/FastAPI) + 1 Rapid UI/UX Prototyper (Tailwind/Next.js) + 1 Embedded Systems Dev"
        },
        {
            "hackathon_id": "HCK_503",
            "name": "Silicon Corridor FinTech & FastPay AI Hack 2026",
            "organizer": "Koramangala VC Consortium",
            "theme_tags": "FinTech, Fraud Detection, FastPay, Blockchain, Graph Neural Networks",
            "registration_deadline": "2026-09-29", # Upcoming within 30 days
            "past_winning_team_profile": "2 Backend Engineers (Go/PostgreSQL) + 1 Frontend UI Prototyper (React/TypeScript) + 1 ML Engineer"
        },
        {
            "hackathon_id": "HCK_504",
            "name": "Nandi Clean Energy & Microgrid Challenge 2026",
            "organizer": "Nandi Hills Innovation Council",
            "theme_tags": "CleanTech, Smart Grid, Microgrid, Renewable Energy, IoT",
            "registration_deadline": "2026-11-15", # Later (>60 days)
            "past_winning_team_profile": "1 Power Systems Specialist + 1 Full-Stack Prototyper + 1 Backend Architect"
        },
        {
            "hackathon_id": "HCK_505",
            "name": "Whitefield Zero-Trust CyberShield Summit 2026",
            "organizer": "Whitefield Founders Forum",
            "theme_tags": "Cybersecurity, Zero Trust, Network Security, eBPF, Cryptography",
            "registration_deadline": "2026-12-05", # Later
            "past_winning_team_profile": "2 Systems/Security Coders (Rust/C++) + 1 Cloud/UI Prototyper"
        },
        {
            "hackathon_id": "HCK_506",
            "name": "Koramangala HealthAI & Wearable Diagnostics Hackathon 2026",
            "organizer": "Silicon City Makers Collective",
            "theme_tags": "HealthTech, Wearables, BioInformatics, Edge Computing, EHR",
            "registration_deadline": "2026-08-10", # Past event (Closed)
            "past_winning_team_profile": "1 Bio-Signals Specialist + 1 Rapid Frontend Prototyper + 1 Backend Engineer"
        }
    ]
    return pd.DataFrame(events)


# ---------------------------------------------------------
# 5. GENERATE fct_student_skill_profiles (40 rows)
# ---------------------------------------------------------
def generate_student_skill_profiles():
    students = [
        # --- TOP BACKEND SPECIALISTS ---
        {
            "student_id": "STU_601",
            "self_reported_skills": "Backend Architecture, Go, FastAPI, PostgreSQL, Docker, Redis, Distributed Systems",
            "course_grades_summary": "Data Structures: S, Operating Systems: S, DBMS: S, Cloud Computing: A, Computer Networks: S",
            "past_hackathon_history": "Smart India Hackathon 2024 (Team Garuda), HackBangalore 2024 (Team Garuda)"
        },
        {
            "student_id": "STU_602",
            "self_reported_skills": "High-Throughput Backend, Rust, PostgreSQL, Apache Kafka, Microservices, Docker",
            "course_grades_summary": "Data Structures: S, Operating Systems: S, DBMS: A, Distributed Systems: S, Algorithms: S",
            "past_hackathon_history": "KITS Buildathon 2025 (Team Kaveri)"
        },
        {
            "student_id": "STU_603",
            "self_reported_skills": "Backend API Development, Python, FastAPI, PostgreSQL, MongoDB, Redis, AWS Lambda",
            "course_grades_summary": "Data Structures: A, DBMS: S, Cloud Architecture: S, Operating Systems: A, Web Eng: S",
            "past_hackathon_history": "Koramangala TechSprint 2024 (Team Alpha), RV Buildathon 2025 (Team Alpha)"
        },
        {
            "student_id": "STU_604",
            "self_reported_skills": "Distributed Systems, Go, gRPC, PostgreSQL, Kubernetes, TimescaleDB",
            "course_grades_summary": "Operating Systems: S, DBMS: S, Computer Networks: S, Data Structures: S, Cloud: A",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_605",
            "self_reported_skills": "Backend Scalability, Java Spring Boot, PostgreSQL, Docker, RabbitMQ, Redis",
            "course_grades_summary": "Data Structures: A, DBMS: S, OOP: S, Software Engineering: S, OS: A",
            "past_hackathon_history": "Nandi Hack 2024 (Team Shunya)"
        },
        {
            "student_id": "STU_606",
            "self_reported_skills": "Backend Systems, Node.js, Express, PostgreSQL, Redis, Docker, Microservices",
            "course_grades_summary": "Data Structures: S, DBMS: A, Computer Networks: A, OS: S, Cloud: A",
            "past_hackathon_history": "HackBangalore 2024 (Team Beta)"
        },
        {
            "student_id": "STU_607",
            "self_reported_skills": "Backend Engineering, Go, FastAPI, SQLite, Docker, Celery, REST APIs",
            "course_grades_summary": "Data Structures: A, DBMS: A, Operating Systems: A, Web Technologies: S",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_608",
            "self_reported_skills": "High Performance Backend, C++, Go, PostgreSQL, Memory Optimization, Linux Internals",
            "course_grades_summary": "Operating Systems: S, System Programming: S, Data Structures: S, DBMS: A",
            "past_hackathon_history": "KITS Buildathon 2025 (Team Sigma)"
        },
        {
            "student_id": "STU_609",
            "self_reported_skills": "Cloud Backend, Python, Django REST, PostgreSQL, Docker, Elasticsearch",
            "course_grades_summary": "DBMS: S, Data Structures: A, Cloud Computing: S, Software Testing: A",
            "past_hackathon_history": "Smart India Hackathon 2024 (Team Delta)"
        },
        {
            "student_id": "STU_610",
            "self_reported_skills": "API Architecture, FastAPI, Go, GraphQL, PostgreSQL, Redis",
            "course_grades_summary": "Data Structures: S, DBMS: S, Operating Systems: A, Algorithms: S",
            "past_hackathon_history": "None - First time participant"
        },

        # --- TOP RAPID PROTOTYPERS / FRONTEND SPECIALISTS ---
        {
            "student_id": "STU_611",
            "self_reported_skills": "Rapid Prototyping, Figma, React, Next.js, TailwindCSS, TypeScript, UI/UX Design",
            "course_grades_summary": "Web Architecture: S, Human Computer Interaction: S, User Interface Design: S, Frontend Eng: S",
            "past_hackathon_history": "KITS Buildathon 2025 (Team Kaveri), HackBangalore 2024 (Team Kaveri)"
        },
        {
            "student_id": "STU_612",
            "self_reported_skills": "Rapid UI Prototyping, Next.js, TailwindCSS, Figma, Framer Motion, React Native, Vercel",
            "course_grades_summary": "UI/UX Design: S, Mobile App Dev: S, Web Technologies: S, HCI: A, Computer Graphics: S",
            "past_hackathon_history": "Smart India Hackathon 2024 (Team Garuda)"
        },
        {
            "student_id": "STU_613",
            "self_reported_skills": "Rapid Prototyping, Figma, React, TailwindCSS, TypeScript, Shadcn UI, Zustand",
            "course_grades_summary": "Frontend Architecture: S, User Experience Design: S, Web Dev: S, HCI: S",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_614",
            "self_reported_skills": "UI/UX Design, Rapid Prototyping, Vue.js, TailwindCSS, Figma, Adobe XD, Storybook",
            "course_grades_summary": "Human Computer Interaction: S, Web Systems: A, Visual Design: S, Multimedia: S",
            "past_hackathon_history": "Koramangala TechSprint 2024 (Team Alpha)"
        },
        {
            "student_id": "STU_615",
            "self_reported_skills": "Interactive UI Prototyping, React, TailwindCSS, Three.js, Canvas, Figma, TypeScript",
            "course_grades_summary": "Computer Graphics: S, UI Design: S, Web Engineering: S, HCI: A",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_616",
            "self_reported_skills": "Rapid Prototyping, SvelteKit, TailwindCSS, Figma, Flutter, Responsive UI",
            "course_grades_summary": "Mobile Dev: S, Web Development: S, HCI: A, Software Design: A",
            "past_hackathon_history": "Nandi Hack 2024 (Team Shunya)"
        },
        {
            "student_id": "STU_617",
            "self_reported_skills": "Frontend Rapid Prototyping, React, Next.js, Chakra UI, Figma, Redux Toolkit",
            "course_grades_summary": "Web Architecture: A, UI/UX Design: S, Frontend Engineering: S, HCI: A",
            "past_hackathon_history": "HackBangalore 2024 (Team Beta)"
        },
        {
            "student_id": "STU_618",
            "self_reported_skills": "UI/UX & Product Prototyping, Figma, TailwindCSS, HTML5 Canvas, WebGL, React",
            "course_grades_summary": "Visual Design: S, User Interaction: S, Web Technologies: A, Graphics: S",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_619",
            "self_reported_skills": "Rapid Prototyping, React Native, TailwindCSS, Figma, Expo, Supabase",
            "course_grades_summary": "Mobile Engineering: S, UI Design: S, Database Systems: A, Web Dev: A",
            "past_hackathon_history": "Smart India Hackathon 2024 (Team Delta)"
        },
        {
            "student_id": "STU_620",
            "self_reported_skills": "Design Systems, Figma to Code, React, TailwindCSS, Next.js, Storybook",
            "course_grades_summary": "UI/UX Design: S, Human Centered Design: S, Web Architecture: S, HCI: S",
            "past_hackathon_history": "None - First time participant"
        },

        # --- AI / ML SPECIALISTS ---
        {
            "student_id": "STU_621",
            "self_reported_skills": "Machine Learning, PyTorch, LangChain, Databricks, Computer Vision, YOLOv8, MLflow",
            "course_grades_summary": "Machine Learning: S, Deep Learning: S, Mathematics for ML: S, Python Programming: S",
            "past_hackathon_history": "Smart India Hackathon 2024 (Team Garuda)"
        },
        {
            "student_id": "STU_622",
            "self_reported_skills": "Computer Vision, Edge AI, TensorRT, PyTorch, OpenCV, Embedded Linux",
            "course_grades_summary": "Computer Vision: S, Digital Signal Processing: S, Deep Learning: A, Embedded Systems: S",
            "past_hackathon_history": "KITS Buildathon 2025 (Team Kaveri)"
        },
        {
            "student_id": "STU_623",
            "self_reported_skills": "NLP, HuggingFace Transformers, Indic NLP, LangChain, Vector Databases, Python",
            "course_grades_summary": "Natural Language Processing: S, Deep Learning: S, AI Ethics: A, Linear Algebra: S",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_624",
            "self_reported_skills": "Deep Learning, PyTorch Geometric, Graph Neural Networks, Scikit-Learn, Pandas",
            "course_grades_summary": "Graph Theory: S, Machine Learning: S, Algorithms: S, Statistics: S",
            "past_hackathon_history": "Koramangala TechSprint 2024 (Team Alpha)"
        },
        {
            "student_id": "STU_625",
            "self_reported_skills": "Generative AI, LLMs, Prompt Engineering, RAG Pipelines, Databricks, LangChain",
            "course_grades_summary": "Artificial Intelligence: S, Cloud Data Engineering: S, Machine Learning: A",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_626",
            "self_reported_skills": "Time Series Forecasting, Anomaly Detection, PyTorch, TensorFlow, Edge ML",
            "course_grades_summary": "Time Series Analysis: S, Statistical Inference: S, Pattern Recognition: A",
            "past_hackathon_history": "Nandi Hack 2024 (Team Shunya)"
        },
        {
            "student_id": "STU_627",
            "self_reported_skills": "BioInformatics ML, Signal Processing, Scipy, PyTorch, Wearable Sensor Analytics",
            "course_grades_summary": "Bio-Medical Signals: S, Machine Learning: S, DSP: S, Data Structures: A",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_628",
            "self_reported_skills": "Reinforcement Learning, Robotics Control, ROS2, PyTorch, Simulation (Gazebo)",
            "course_grades_summary": "Robotics: S, Control Systems: S, Reinforcement Learning: S, Algorithms: A",
            "past_hackathon_history": "KITS Buildathon 2025 (Team Sigma)"
        },
        {
            "student_id": "STU_629",
            "self_reported_skills": "Data Engineering, Databricks, Apache Spark, SQL, Delta Lake, Python",
            "course_grades_summary": "Big Data Analytics: S, DBMS: S, Data Warehousing: S, Distributed Systems: A",
            "past_hackathon_history": "Smart India Hackathon 2024 (Team Delta)"
        },
        {
            "student_id": "STU_630",
            "self_reported_skills": "Speech Processing, Audio ML, Whisper Fine-Tuning, PyTorch, Python",
            "course_grades_summary": "Speech & Audio Processing: S, Deep Learning: S, Information Theory: A",
            "past_hackathon_history": "None - First time participant"
        },

        # --- FULL-STACK / EMBEDDED / SYSTEMS GENERALISTS ---
        {
            "student_id": "STU_631",
            "self_reported_skills": "Full-Stack Web, Node.js, React, MongoDB, Express, Docker, AWS",
            "course_grades_summary": "Web Development: S, DBMS: A, Cloud Architecture: A, Software Eng: S",
            "past_hackathon_history": "HackBangalore 2024 (Team Beta)"
        },
        {
            "student_id": "STU_632",
            "self_reported_skills": "Embedded Systems, C, ESP32, LoRaWAN, MQTT, FreeRTOS, Hardware Debugging",
            "course_grades_summary": "Microcontrollers: S, Embedded Systems: S, Computer Networks: A, Circuit Design: S",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_633",
            "self_reported_skills": "Smart Contract Dev, Solidity, Web3.js, Hardhat, Ethereum, DeFi Protocols",
            "course_grades_summary": "Cryptography: S, Distributed Ledgers: S, Network Security: A, DBMS: A",
            "past_hackathon_history": "Koramangala TechSprint 2024 (Team Alpha)"
        },
        {
            "student_id": "STU_634",
            "self_reported_skills": "Cybersecurity, Penetration Testing, eBPF, Linux Kernel, Wireshark, Python",
            "course_grades_summary": "Network Security: S, Operating Systems: S, Ethical Hacking: S, Computer Networks: S",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_635",
            "self_reported_skills": "DevOps & Cloud, Kubernetes, Terraform, GitHub Actions, Docker, Prometheus",
            "course_grades_summary": "Cloud Infrastructure: S, OS: S, System Administration: S, Networks: A",
            "past_hackathon_history": "Smart India Hackathon 2024 (Team Garuda)"
        },
        {
            "student_id": "STU_636",
            "self_reported_skills": "Full-Stack Mobile, Flutter, Firebase, Dart, Node.js, REST APIs",
            "course_grades_summary": "Mobile Dev: S, OOP: S, Database Systems: A, Web Eng: A",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_637",
            "self_reported_skills": "IoT Edge Engineering, Raspberry Pi, Python, OpenCV, MQTT, BLE",
            "course_grades_summary": "Sensors & Actuators: S, Embedded Linux: S, Microprocessors: A",
            "past_hackathon_history": "KITS Buildathon 2025 (Team Kaveri)"
        },
        {
            "student_id": "STU_638",
            "self_reported_skills": "Full-Stack Development, Next.js, Django, PostgreSQL, TailwindCSS, Docker",
            "course_grades_summary": "Software Eng: S, DBMS: S, Web Tech: S, OS: A",
            "past_hackathon_history": "None - First time participant"
        },
        {
            "student_id": "STU_639",
            "self_reported_skills": "Firmware Engineering, Embedded C++, ARM Cortex-M, CAN Bus, RTOS",
            "course_grades_summary": "Embedded C: S, Digital Electronics: S, Microcontrollers: S, OS: A",
            "past_hackathon_history": "Nandi Hack 2024 (Team Shunya)"
        },
        {
            "student_id": "STU_640",
            "self_reported_skills": "Full-Stack Engineering, TypeScript, React, Go, PostgreSQL, GraphQL",
            "course_grades_summary": "Web Systems: S, DBMS: S, Data Structures: S, Algorithms: A",
            "past_hackathon_history": "None - First time participant"
        }
    ]
    return pd.DataFrame(students)


# ---------------------------------------------------------
# MAIN EXECUTION
# ---------------------------------------------------------
def main():
    print("[INFO] Generating UNI-LENS Synthetic Datasets...")
    
    df_projects = generate_student_projects()
    df_vc_patents = generate_vc_patent_data()
    df_pubs = generate_faculty_publications()
    df_hackathons = generate_hackathon_events()
    df_skills = generate_student_skill_profiles()
    
    # Save CSVs
    p_proj = os.path.join(OUTPUT_DIR, "fct_student_projects.csv")
    p_vc = os.path.join(OUTPUT_DIR, "dim_vc_patent_data.csv")
    p_pub = os.path.join(OUTPUT_DIR, "fct_faculty_publications.csv")
    p_hack = os.path.join(OUTPUT_DIR, "fct_hackathon_events.csv")
    p_skill = os.path.join(OUTPUT_DIR, "fct_student_skill_profiles.csv")
    
    df_vc_patents['capital_amount'] = df_vc_patents['capital_amount'].astype('Int64')
    
    df_projects.to_csv(p_proj, index=False)
    df_vc_patents.to_csv(p_vc, index=False)
    df_pubs.to_csv(p_pub, index=False)
    df_hackathons.to_csv(p_hack, index=False)
    df_skills.to_csv(p_skill, index=False)
    
    print(f"[SUCCESS] Generated fct_student_projects.csv ({len(df_projects)} rows)")
    print(f"[SUCCESS] Generated dim_vc_patent_data.csv ({len(df_vc_patents)} rows)")
    print(f"[SUCCESS] Generated fct_faculty_publications.csv ({len(df_pubs)} rows)")
    print(f"[SUCCESS] Generated fct_hackathon_events.csv ({len(df_hackathons)} rows)")
    print(f"[SUCCESS] Generated fct_student_skill_profiles.csv ({len(df_skills)} rows)")
    print(f"\n[DONE] All CSV files written to: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()

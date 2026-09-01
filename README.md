# UNI-LENS: Genie-Powered Campus Intelligence

> **Hackathon Track**: Track B — Creative Campus Intelligence / Unexpected Data Fusion  
> **Ecosystem Context**: Bengaluru Engineering College & Startup Ecosystem  
> **Platform**: Databricks (Free Edition / Community Edition / Standard) + Databricks Genie Space (NL-to-SQL)  
> **Target Audience**: Technology Transfer Offices (TTO), Incubation Cells, Student Hackathon Teams, Academic Deans, and Campus IP Officers.

---

## 1. Executive Summary

**UNI-LENS** is a unified campus intelligence engine designed to bridge the gap between academic student innovation, faculty research, venture capital funding trends, and competitive hackathon events in Bengaluru.

In typical universities, massive amounts of student intellectual property (IP) and faculty breakthroughs remain siloed inside GitHub repositories and PDF publications. Meanwhile, local venture capital firms in Koramangala and Indiranagar invest millions into startups tackling identical problems just 6 to 18 months later. Furthermore, students form hackathon teams through arbitrary social circles rather than complementary skill matrixes, and mature capstone projects sit idle instead of competing in upcoming hackathons.

UNI-LENS fuses 5 disparate campus and industry datasets into a relational graph powering **Databricks Genie**, enabling natural language discovery of:
1. **Unprotected Intellectual Property (IP Leakage)**: Student projects submitted 6–18 months before matching VC funding rounds without patent protection.
2. **Algorithmic Hackathon Squads**: Optimal pairing of high-performance backend architects and rapid UI/UX prototypers who have never collaborated before.
3. **Faculty Commercialization Gaps**: Professors publishing in hot tech domains overlapping with multiple funded startups but with zero co-filed patents.
4. **Hackathon Opportunity Alignment**: Automated matching and ranking of unmatched student repositories to hackathons closing registration in the next 30 days.

---

## 2. Data Architecture & Entity Relationship Model

```
                    ┌──────────────────────────────┐
                    │      fct_student_projects    │
                    ├──────────────────────────────┤
                    │ project_id (PK)              │
                    │ title                        │
                    │ repo_url                     │
                    │ tech_stack_tags              │
                    │ sector_tag ───────────┐      │
                    │ dept                  │      │
                    │ faculty_guide_id ─────┼───┐  │
                    │ submission_date       │   │  │
                    └───────────────┬───────┘   │  │
                                    │           │  │
                        related_    │           │  │
                       project_id   │           │  │
                                    ▼           │  │
                    ┌────────────────────────┐  │  │
                    │   dim_vc_patent_data   │  │  │
                    ├────────────────────────┤  │  │
                    │ record_id (PK)         │  │  │
                    │ type [VC_ROUND|PATENT] │  │  │
                    │ startup_or_applicant   │  │  │
                    │ sector_tag ◄───────────┘  │  │
                    │ date                      │  │
                    │ capital_amount            │  │
                    │ related_project_id (FK)   │  │
                    └────────────────────────┘  │  │
                                                │  │
                                                │  │
    ┌──────────────────────────────┐            │  │
    │ fct_faculty_publications     │            │  │
    ├──────────────────────────────┤            │  │
    │ paper_id (PK)                │            │  │
    │ faculty_id (FK) ◄────────────┼────────────┘  │
    │ keywords                     │               │
    │ citation_count               │               │
    │ publish_date                 │               │
    │ co_authors                   │               │
    └──────────────────────────────┘               │
                                                   │
    ┌──────────────────────────────┐               │
    │ fct_hackathon_events         │               │
    ├──────────────────────────────┤               │
    │ hackathon_id (PK)            │               │
    │ name                         │               │
    │ organizer                    │               │
    │ theme_tags                   │               │
    │ registration_deadline        │               │
    │ past_winning_team_profile    │               │
    └──────────────────────────────┘               │
                                                   │
    ┌──────────────────────────────┐               │
    │ fct_student_skill_profiles   │               │
    ├──────────────────────────────┤               │
    │ student_id (PK)              │               │
    │ self_reported_skills         │               │
    │ course_grades_summary        │               │
    │ past_hackathon_history       │               │
    └──────────────────────────────┘               │
```

---

## 3. Detailed Data Dictionary

### Table 1: `fct_student_projects` (40 records)
*Granularity: 1 row per final-year engineering student project / capstone repo.*

| Column Name | Data Type | Sample Value | Description |
| :--- | :--- | :--- | :--- |
| `project_id` | STRING | `PRJ_101` | Unique project identifier |
| `title` | STRING | `Edge-AI Pothole & Traffic Congestion Monitor for Namma Bengaluru` | Descriptive project title |
| `repo_url` | STRING | `https://github.com/campus-lens/edge-pothole-detector` | Fictional GitHub repository link |
| `tech_stack_tags` | STRING | `Edge AI, Computer Vision, PyTorch, YOLOv8, TensorRT` | Comma-separated tech keywords |
| `sector_tag` | STRING | `CivicTech` | Industry domain classification |
| `dept` | STRING | `CSE` | Academic department (`CSE`, `ISE`, `ECE`, `AI&DS`, `EEE`, `MECH`) |
| `faculty_guide_id` | STRING | `FAC_201` | Foreign key to faculty advisor |
| `submission_date` | DATE / STRING | `2023-02-15` | Official date project was submitted |

---

### Table 2: `dim_vc_patent_data` (20 records)
*Granularity: 1 row per local Bengaluru VC funding round or Indian patent filing record.*

| Column Name | Data Type | Sample Value | Description |
| :--- | :--- | :--- | :--- |
| `record_id` | STRING | `VCP_401` | Unique record identifier |
| `type` | STRING | `VC_ROUND` / `PATENT` | Type of record |
| `startup_or_applicant_name` | STRING | `UrbanPulse Dynamics Pvt Ltd` | Name of startup or patent applicant |
| `sector_tag` | STRING | `CivicTech` | Domain sector matching student projects |
| `date` | DATE / STRING | `2023-11-20` | Date of funding round or patent filing |
| `capital_amount` | BIGINT / NULL | `3500000` | Capital raised in USD (NULL for patents) |
| `related_project_id` | STRING / NULL | `PRJ_107` | Project ID if patent was filed for campus project; NULL otherwise |

---

### Table 3: `fct_faculty_publications` (25 records)
*Granularity: 1 row per peer-reviewed research paper authored by college faculty.*

| Column Name | Data Type | Sample Value | Description |
| :--- | :--- | :--- | :--- |
| `paper_id` | STRING | `PUB_301` | Unique publication identifier |
| `faculty_id` | STRING | `FAC_201` | Unique faculty identifier (`FAC_201` to `FAC_212`) |
| `keywords` | STRING | `Federated Learning, Differential Privacy, Healthcare EHR, Edge AI` | Technical keywords extracted from abstract |
| `citation_count` | INT | `48` | Total academic citations |
| `publish_date` | DATE / STRING | `2022-06-18` | Publication date |
| `co_authors` | STRING | `Dr. Aarav Sharma, Dr. Ananya Hegde, Karthik Raman` | Full author list |

---

### Table 4: `fct_hackathon_events` (6 records)
*Granularity: 1 row per regional or national hackathon event.*

| Column Name | Data Type | Sample Value | Description |
| :--- | :--- | :--- | :--- |
| `hackathon_id` | STRING | `HCK_501` | Unique event identifier |
| `name` | STRING | `Namma Bengaluru Smart Mobility & Edge AI Sprint 2026` | Hackathon title |
| `organizer` | STRING | `Karnataka Innovation & Technology Society (KITS)` | Organizing body or VC consortium |
| `theme_tags` | STRING | `Edge AI, Computer Vision, Smart Mobility, IoT, Smart Cities` | Focus tracks for the hackathon |
| `registration_deadline` | DATE / STRING | `2026-09-18` | Deadline for team registrations |
| `past_winning_team_profile` | STRING | `2 High-Performance Backend Coders (Go) + 1 Rapid UI Prototyper (React)` | Archetype of historically winning teams |

---

### Table 5: `fct_student_skill_profiles` (40 records)
*Granularity: 1 row per active undergraduate engineering student.*

| Column Name | Data Type | Sample Value | Description |
| :--- | :--- | :--- | :--- |
| `student_id` | STRING | `STU_601` | Unique student identifier |
| `self_reported_skills` | STRING | `Backend Architecture, Go, FastAPI, PostgreSQL, Docker, Redis` | Self-reported programming tools & proficiencies |
| `course_grades_summary` | STRING | `Data Structures: S, Operating Systems: S, DBMS: S, Networks: S` | Academic performance in core subjects |
| `past_hackathon_history` | STRING | `Smart India Hackathon 2024 (Team Garuda), HackBangalore 2024 (Team Garuda)` | Past teams and competitions (used for collaboration tracking) |

---

## 4. Realistic Relational Overlap Mechanics

The synthetic data is deterministically wired to produce non-trivial, realistic data fusions:

1. **Unprotected IP Signal (Query A Overlap)**:
   - 6 projects (`PRJ_101` to `PRJ_106`) across `CivicTech`, `CleanTech`, `HealthTech`, `AgriTech`, `FinTech`, and `LogisticsTech` were submitted in 2023.
   - Corresponding VC funding rounds (`VCP_401` to `VCP_406`) took place **9 to 12 months after project submission** for startups like *UrbanPulse Dynamics*, *NammaGrid Power*, and *Bengaluru PayShield*.
   - Zero patent records were filed for these projects (`related_project_id` is NULL), flagging severe campus IP leak risk.
   - Positive controls (`PRJ_107`, `PRJ_108`, `PRJ_109`) have matching patents in `dim_vc_patent_data` and are properly excluded.

2. **Faculty Commercialization Gap (Query C Overlap)**:
   - Professors like **Dr. Aarav Sharma (`FAC_201`)**, **Dr. Meera Nambiar (`FAC_203`)**, **Dr. Rajeshwari Kulkarni (`FAC_206`)**, and **Dr. Chetan Gowda (`FAC_209`)** possess high citation publications in domains that overlap with 2+ heavily funded Bengaluru startups (*AstraPulse HealthTech*, *Indiranagar CyberShield*, *Vidyut Storage*, *Veloce AgriRobotics*).
   - None of these faculty members have ever co-filed a patent, highlighting institutional incubation opportunities.

3. **Hackathon Theme Alignment (Query D Overlap)**:
   - 3 hackathons (`HCK_501`, `HCK_502`, `HCK_503`) close registration within **17 to 28 days** (September 2026).
   - High-affinity unmatched student projects (e.g. `PRJ_113`, `PRJ_120`, `PRJ_114`, `PRJ_115`) achieve top fit scores (6–8 points) based on exact multi-tag overlaps.

4. **Skill-Matrix Team Formation (Query B Overlap)**:
   - 40 student profiles are categorized into Backend Specialists, Rapid Prototypers, AI/ML Engineers, and Full-Stack generalists.
   - Historical hackathon team rosters (e.g., *Team Garuda*, *Team Kaveri*, *Team Alpha*, *Team Shunya*) are cross-checked to guarantee that newly recommended squads have **zero prior collaboration history**.

---

## 5. Databricks Step-by-Step Deployment Guide (Free Edition / Delta Lake)

Follow these instructions to ingest the CSV files into Databricks and create Delta tables for Genie.

### Step 5.1: Create a Catalog / Schema (or use `default`)
Open **Databricks SQL Editor** or a **Notebook** and run:
```sql
CREATE DATABASE IF NOT EXISTS unilens_db;
USE unilens_db;
```

---

### Step 5.2: Upload CSV Files to Databricks
1. In the Databricks left navigation menu, click **Catalog** (or **Data**).
2. Click **+ Add** -> **Add or upload data** -> **Upload data**.
3. Select and upload the 5 CSV files from your local `UNILENS/data/` folder:
   - `fct_student_projects.csv`
   - `fct_faculty_publications.csv`
   - `dim_vc_patent_data.csv`
   - `fct_hackathon_events.csv`
   - `fct_student_skill_profiles.csv`
4. Databricks will place them in a Unity Catalog Volume or DBFS path (e.g., `/Volumes/unilens_db/default/raw_data/` or `dbfs:/FileStore/tables/`).

---

### Step 5.3: Execute SQL DDL Statements (Delta Table Creation)

Run the following SQL script in Databricks SQL Editor to create managed Delta tables with explicit schemas and descriptive column comments:

```sql
-- 1. Student Projects Delta Table
CREATE OR REPLACE TABLE unilens_db.fct_student_projects (
    project_id STRING COMMENT 'Unique identifier for student project (e.g. PRJ_101)',
    title STRING COMMENT 'Full title of the student engineering capstone project',
    repo_url STRING COMMENT 'GitHub repository URL',
    tech_stack_tags STRING COMMENT 'Comma-separated technical tags and frameworks used',
    sector_tag STRING COMMENT 'Industry sector domain (CivicTech, CleanTech, HealthTech, etc.)',
    dept STRING COMMENT 'Engineering department (CSE, ISE, ECE, AI&DS, EEE, MECH)',
    faculty_guide_id STRING COMMENT 'Faculty mentor ID (FAC_201 to FAC_212)',
    submission_date DATE COMMENT 'Date when project was submitted and published on campus'
) USING DELTA;

-- 2. VC and Patent Data Delta Table
CREATE OR REPLACE TABLE unilens_db.dim_vc_patent_data (
    record_id STRING COMMENT 'Unique record ID (VCP_401 to VCP_420)',
    type STRING COMMENT 'Record category: VC_ROUND or PATENT',
    startup_or_applicant_name STRING COMMENT 'Name of funded startup or patent applicant',
    sector_tag STRING COMMENT 'Industry domain tag',
    date DATE COMMENT 'Date of VC funding round announcement or patent filing',
    capital_amount BIGINT COMMENT 'Venture funding amount in USD (NULL for patents)',
    related_project_id STRING COMMENT 'Foreign key to fct_student_projects.project_id if protected'
) USING DELTA;

-- 3. Faculty Publications Delta Table
CREATE OR REPLACE TABLE unilens_db.fct_faculty_publications (
    paper_id STRING COMMENT 'Unique publication ID (PUB_301 to PUB_325)',
    faculty_id STRING COMMENT 'Faculty author identifier (FAC_201 to FAC_212)',
    keywords STRING COMMENT 'Research keywords extracted from paper',
    citation_count INT COMMENT 'Total citations accumulated',
    publish_date DATE COMMENT 'Date of publication',
    co_authors STRING COMMENT 'Full list of author names'
) USING DELTA;

-- 4. Hackathon Events Delta Table
CREATE OR REPLACE TABLE unilens_db.fct_hackathon_events (
    hackathon_id STRING COMMENT 'Unique event ID (HCK_501 to HCK_506)',
    name STRING COMMENT 'Official hackathon title',
    organizer STRING COMMENT 'Organizing committee or ecosystem partner',
    theme_tags STRING COMMENT 'Key themes and eligible tech stacks',
    registration_deadline DATE COMMENT 'Registration close date',
    past_winning_team_profile STRING COMMENT 'Persona makeup of past winner teams'
) USING DELTA;

-- 5. Student Skill Profiles Delta Table
CREATE OR REPLACE TABLE unilens_db.fct_student_skill_profiles (
    student_id STRING COMMENT 'Unique student ID (STU_601 to STU_640)',
    self_reported_skills STRING COMMENT 'Self-reported skills, languages, and frameworks',
    course_grades_summary STRING COMMENT 'Summary of course grades (S/A/B)',
    past_hackathon_history STRING COMMENT 'History of past hackathon participation and team names'
) USING DELTA;
```

---

### Step 5.4: Ingest Data from Uploaded Files

> **Tip**: You can run the unified setup script [`sql/databricks_setup.sql`](file:///c:/Users/lenovo/Desktop/UNILENS/sql/databricks_setup.sql) which creates all tables and executes all `COPY INTO` commands in a single click.

```sql
COPY INTO unilens_db.fct_student_projects
FROM '/Volumes/unilens_db/default/raw_data/fct_student_projects.csv'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true', 'dateFormat' = 'yyyy-MM-dd');

COPY INTO unilens_db.dim_vc_patent_data
FROM '/Volumes/unilens_db/default/raw_data/dim_vc_patent_data.csv'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true', 'dateFormat' = 'yyyy-MM-dd');

COPY INTO unilens_db.fct_faculty_publications
FROM '/Volumes/unilens_db/default/raw_data/fct_faculty_publications.csv'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true', 'dateFormat' = 'yyyy-MM-dd');

COPY INTO unilens_db.fct_hackathon_events
FROM '/Volumes/unilens_db/default/raw_data/fct_hackathon_events.csv'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true', 'dateFormat' = 'yyyy-MM-dd');

COPY INTO unilens_db.fct_student_skill_profiles
FROM '/Volumes/unilens_db/default/raw_data/fct_student_skill_profiles.csv'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true');
```

---

## 6. Setting Up Databricks Genie Space

1. In Databricks, navigate to **Genie** in the left sidebar.
2. Click **New Genie Space**.
3. Name the Space: `UNI-LENS Campus Intelligence`.
4. Add the 5 tables from `unilens_db` into the Space.
5. In **Genie Space Instructions**, paste the contents of `docs/genie_sample_queries.md` to train Genie's reasoning logic on domain terms, time windows, and table join relationships.
6. Test natural-language queries directly in the chat window!

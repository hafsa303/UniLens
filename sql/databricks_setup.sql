-- ==============================================================================
-- UNI-LENS: Complete Databricks Setup Script (Catalog, Schema, Delta Tables & Ingestion)
-- Platform: Databricks Free Edition / Community Edition / Standard / Enterprise
-- Dialect: Databricks Spark SQL (Unity Catalog)
-- 
-- USAGE INSTRUCTIONS:
-- 1. Open Databricks SQL Editor or a Databricks Notebook.
-- 2. Paste and run this entire script to create `unilens_db` catalog, `default` schema,
--    `raw_data` volume, and all 5 populated Delta tables.
-- 3. Update the volume path in the COPY INTO statements if your upload location differs:
--    - Unity Catalog Volumes default: '/Volumes/unilens_db/default/raw_data/'
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- STEP 1: Unity Catalog, Schema, and Volume Initialization
-- ------------------------------------------------------------------------------
-- NOTE: In Databricks Unity Catalog, `/Volumes/unilens_db/default/raw_data/` requires
-- `unilens_db` to be a CATALOG with a `default` SCHEMA and a `raw_data` VOLUME.
-- Creating a CATALOG requires workspace-level admin or catalog creation permissions.

CREATE CATALOG IF NOT EXISTS unilens_db;
CREATE SCHEMA IF NOT EXISTS unilens_db.default;
CREATE VOLUME IF NOT EXISTS unilens_db.default.raw_data;
USE CATALOG unilens_db;
USE SCHEMA default;

-- ==============================================================================
-- FALLBACK FOR WORKSPACES WITH RESTRICTED CATALOG PERMISSIONS:
-- If Databricks Free Edition / Workspace restricts CREATE CATALOG, use the pre-existing
-- default catalog (e.g. `workspace` or `main`) by running this fallback instead:
--
-- CREATE SCHEMA IF NOT EXISTS main.unilens_campus;
-- CREATE VOLUME IF NOT EXISTS main.unilens_campus.raw_data;
-- USE CATALOG main;
-- USE SCHEMA unilens_campus;
-- (Then replace `/Volumes/unilens_db/default/` with `/Volumes/main/unilens_campus/`)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- STEP 2: Explicit DDL for Table 1 - fct_student_projects
-- ------------------------------------------------------------------------------
CREATE OR REPLACE TABLE unilens_db.default.fct_student_projects (
    project_id STRING COMMENT 'Unique student project ID (e.g. PRJ_101)',
    title STRING COMMENT 'Full capstone project title',
    repo_url STRING COMMENT 'GitHub repository URL',
    tech_stack_tags STRING COMMENT 'Comma-separated keywords (typed as STRING for LIKE matching)',
    sector_tag STRING COMMENT 'Industry sector domain (CivicTech, CleanTech, HealthTech, etc.)',
    dept STRING COMMENT 'Department code (CSE, ISE, ECE, AI&DS, EEE, MECH)',
    faculty_guide_id STRING COMMENT 'Faculty mentor ID (FAC_201 to FAC_212)',
    submission_date DATE COMMENT 'Official capstone submission date'
) 
USING DELTA
COMMENT 'Final-year student engineering projects and capstone repositories';

COPY INTO unilens_db.default.fct_student_projects
FROM '/Volumes/unilens_db/default/raw_data/fct_student_projects.csv'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true', 'dateFormat' = 'yyyy-MM-dd');

-- ------------------------------------------------------------------------------
-- STEP 3: Explicit DDL for Table 2 - dim_vc_patent_data
-- ------------------------------------------------------------------------------
CREATE OR REPLACE TABLE unilens_db.default.dim_vc_patent_data (
    record_id STRING COMMENT 'Unique record ID (VCP_401 to VCP_420)',
    type STRING COMMENT 'Record category: VC_ROUND or PATENT',
    startup_or_applicant_name STRING COMMENT 'Name of funded startup or patent applicant',
    sector_tag STRING COMMENT 'Industry domain sector',
    date DATE COMMENT 'Date of VC funding announcement or patent filing',
    capital_amount BIGINT COMMENT 'Venture funding amount in USD (NULL for patents)',
    related_project_id STRING COMMENT 'Foreign key to fct_student_projects.project_id if campus-patented'
) 
USING DELTA
COMMENT 'Local VC funding rounds and Indian patent filing records';

COPY INTO unilens_db.default.dim_vc_patent_data
FROM '/Volumes/unilens_db/default/raw_data/dim_vc_patent_data.csv'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true', 'dateFormat' = 'yyyy-MM-dd');

-- ------------------------------------------------------------------------------
-- STEP 4: Explicit DDL for Table 3 - fct_faculty_publications
-- ------------------------------------------------------------------------------
CREATE OR REPLACE TABLE unilens_db.default.fct_faculty_publications (
    paper_id STRING COMMENT 'Unique publication ID (PUB_301 to PUB_325)',
    faculty_id STRING COMMENT 'Faculty author identifier (FAC_201 to FAC_212)',
    keywords STRING COMMENT 'Research keywords extracted from abstract (typed as STRING)',
    citation_count INT COMMENT 'Total academic citations accumulated',
    publish_date DATE COMMENT 'Date of publication',
    co_authors STRING COMMENT 'Full list of author names'
) 
USING DELTA
COMMENT 'Peer-reviewed research publications authored by campus engineering faculty';

COPY INTO unilens_db.default.fct_faculty_publications
FROM '/Volumes/unilens_db/default/raw_data/fct_faculty_publications.csv'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true', 'dateFormat' = 'yyyy-MM-dd');

-- ------------------------------------------------------------------------------
-- STEP 5: Explicit DDL for Table 4 - fct_hackathon_events
-- ------------------------------------------------------------------------------
CREATE OR REPLACE TABLE unilens_db.default.fct_hackathon_events (
    hackathon_id STRING COMMENT 'Unique event ID (HCK_501 to HCK_506)',
    name STRING COMMENT 'Official hackathon event title',
    organizer STRING COMMENT 'Organizing body or VC consortium',
    theme_tags STRING COMMENT 'Key themes and eligible tech stacks (typed as STRING)',
    registration_deadline DATE COMMENT 'Registration close date',
    past_winning_team_profile STRING COMMENT 'Persona makeup of past winning teams'
) 
USING DELTA
COMMENT 'Regional and national hackathon events and competitive sprints';

COPY INTO unilens_db.default.fct_hackathon_events
FROM '/Volumes/unilens_db/default/raw_data/fct_hackathon_events.csv'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true', 'dateFormat' = 'yyyy-MM-dd');

-- ------------------------------------------------------------------------------
-- STEP 6: Explicit DDL for Table 5 - fct_student_skill_profiles
-- ------------------------------------------------------------------------------
CREATE OR REPLACE TABLE unilens_db.default.fct_student_skill_profiles (
    student_id STRING COMMENT 'Unique student identifier (STU_601 to STU_640)',
    self_reported_skills STRING COMMENT 'Self-reported programming tools, languages, and proficiencies',
    course_grades_summary STRING COMMENT 'Summary of academic course grades (S/A/B)',
    past_hackathon_history STRING COMMENT 'History of past hackathon participation and team names'
) 
USING DELTA
COMMENT 'Student skill proficiencies, academic grades, and hackathon team histories';

COPY INTO unilens_db.default.fct_student_skill_profiles
FROM '/Volumes/unilens_db/default/raw_data/fct_student_skill_profiles.csv'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true');

-- ------------------------------------------------------------------------------
-- STEP 7: Table Population & Row Count Sanity Check
-- ------------------------------------------------------------------------------
SELECT 'fct_student_projects' AS table_name, COUNT(*) AS row_count FROM unilens_db.default.fct_student_projects
UNION ALL
SELECT 'dim_vc_patent_data' AS table_name, COUNT(*) AS row_count FROM unilens_db.default.dim_vc_patent_data
UNION ALL
SELECT 'fct_faculty_publications' AS table_name, COUNT(*) AS row_count FROM unilens_db.default.fct_faculty_publications
UNION ALL
SELECT 'fct_hackathon_events' AS table_name, COUNT(*) AS row_count FROM unilens_db.default.fct_hackathon_events
UNION ALL
SELECT 'fct_student_skill_profiles' AS table_name, COUNT(*) AS row_count FROM unilens_db.default.fct_student_skill_profiles;

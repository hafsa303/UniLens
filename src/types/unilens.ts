export interface StudentProject {
  project_id: string;
  title: string;
  repo_url: string;
  tech_stack_tags: string;
  sector_tag: string;
  dept: string;
  faculty_guide_id: string;
  submission_date: string;
}

export interface StudentSkillProfile {
  student_id: string;
  self_reported_skills: string;
  course_grades_summary: string;
  past_hackathon_history: string;
}

export interface FacultyPublication {
  paper_id: string;
  faculty_id: string;
  keywords: string;
  citation_count: number;
  publish_date: string;
  co_authors: string;
}

export interface HackathonEvent {
  hackathon_id: string;
  name: string;
  organizer: string;
  theme_tags: string;
  registration_deadline: string;
  past_winning_team_profile: string;
}

export interface VcPatentRecord {
  record_id: string;
  type: 'VC_ROUND' | 'PATENT';
  startup_or_applicant_name: string;
  sector_tag: string;
  date: string;
  capital_amount: number | null;
  related_project_id: string | null;
}

export interface IpLeakRisk {
  project_id: string;
  student_project_title: string;
  department: string;
  project_submission_date: string;
  sector: string;
  tech_stack_tags?: string;
  funded_startup_name: string;
  vc_round_date: string;
  months_post_submission: number;
  vc_capital_raised_usd: number;
  risk_score: number;
  ip_risk_tier: 'CRITICAL_IP_EXPOSURE' | 'HIGH_IP_EXPOSURE' | 'MODERATE_IP_EXPOSURE';
  ip_protection_status: string;
}

export interface HackathonSquad {
  team_slot: number;
  assigned_squad_name: string;
  backend_lead_id: string;
  backend_skills: string;
  prototyper_id: string;
  prototyper_skills: string;
  mentor_faculty_id?: string;
  mentor_faculty_name?: string;
  mentor_domain?: string;
  squad_synergy_score?: number;
  pairing_validation_status: string;
}

export interface FacultyCommercializationGap {
  faculty_id: string;
  faculty_name: string;
  department: string;
  domain?: string;
  total_relevant_publications: number;
  total_citations: number;
  overlapping_funded_startups_count: number;
  overlapping_startups_list: string;
  institutional_action_flag: string;
}

export interface HackathonFitMatch {
  project_id: string;
  project_title: string;
  dept: string;
  tech_stack_tags: string;
  hackathon_id: string;
  hackathon_name: string;
  days_until_deadline: number;
  theme_fit_score: number;
  rank_in_hackathon: number;
  recommendation_status: string;
}

export interface GenieQuery {
  id: string;
  title: string;
  question: string;
  persona: string;
  category: string;
  sql: string;
  explanation: string;
  results: any[];
}

export type UserRole = 'Student' | 'Faculty' | 'Placement Team' | 'Administrator';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;
  avatar?: string;
  department?: string;
  semester?: string;
  cgpa?: string;
  skills?: string;
  internshipStatus?: string;
  placementStatus?: string;
  designation?: string;
  organization?: string;
}

// Centralized Campus Intelligence Data Layer for UNI LENS
// Structured as pure typed datasets that can later be connected to Databricks Unity Catalog / Genie.

export interface CampusPulseItem {
  id: string;
  icon: string;
  color: string;
  text: string;
  category: string;
  time: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  dept: 'CSE' | 'ISE' | 'ECE' | 'ME' | 'CV' | 'EEE';
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
  attendance: number;
  cgpa: number;
  readiness: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  skills: string[];
  internship: string;
  placementStatus: string;
  email: string;
}

export interface CompanyHiringRecord {
  company: string;
  logoColor: string;
  roles: string;
  eligible: number;
  applications: number;
  selected: number;
  avgCtc: string;
  status: 'Completed' | 'In Progress' | 'Scheduled';
}

export interface LabFacilityRecord {
  id: string;
  name: string;
  dept: string;
  utilization: number;
  status: 'Available' | 'Busy' | 'Maintenance';
  activeBookings: number;
  capacity: number;
  equipmentHealth: number;
  leadFaculty: string;
}

export interface ClubEventRecord {
  id: string;
  title: string;
  club: string;
  date: string;
  time: string;
  category: string;
  registrations: number;
  capacity: number;
  color: string;
  icon: string;
}

export interface CampusAlertRecord {
  id: string;
  title: string;
  category: 'Academics' | 'Placements' | 'Facilities' | 'Engagement';
  severity: 'Critical' | 'Needs Attention' | 'Monitor' | 'Resolved';
  timestamp: string;
  description: string;
  actionRequired: string;
}

export interface ReportTemplate {
  id: string;
  title: string;
  category: string;
  generatedDate: string;
  status: 'Ready' | 'Generating' | 'Updated';
  pages: number;
  summary: string;
  keyMetric: string;
  metricLabel: string;
}

// 1. CAMPUS PULSE INSIGHTS
export const CAMPUS_PULSE_INSIGHTS: CampusPulseItem[] = [
  {
    id: 'cp_1',
    icon: 'trending_up',
    color: '#10B981',
    text: 'Placement readiness increased 6.2% this month across tech departments',
    category: 'Placements',
    time: '12m ago',
  },
  {
    id: 'cp_2',
    icon: 'warning',
    color: '#EF4444',
    text: '126 students require attendance intervention (below 70% threshold)',
    category: 'Academics',
    time: '34m ago',
  },
  {
    id: 'cp_3',
    icon: 'science',
    color: '#06B6D4',
    text: 'AI Studio utilization reached 82% peak load ahead of HackOverflow',
    category: 'Labs',
    time: '1h ago',
  },
  {
    id: 'cp_4',
    icon: 'event',
    color: '#8B5CF6',
    text: '23 campus events and workshops are scheduled across September',
    category: 'Clubs',
    time: '2h ago',
  },
  {
    id: 'cp_5',
    icon: 'psychology',
    color: '#F59E0B',
    text: 'ECE has largest placement skill gap in Cloud Computing & Machine Learning',
    category: 'Skill Gap',
    time: '3h ago',
  },
];

// 2. STUDENTS DATASET
export const STUDENT_RECORDS: StudentRecord[] = [
  {
    id: 'STU_001',
    name: 'Aakash Verma',
    dept: 'ECE',
    year: '4th Year',
    attendance: 64,
    cgpa: 6.82,
    readiness: 52,
    riskLevel: 'High',
    skills: ['C++', 'Digital Electronics'],
    internship: 'None',
    placementStatus: 'Seeking Placement',
    email: 'aakash.v@unilens.edu',
  },
  {
    id: 'STU_002',
    name: 'Sneha Kulkarni',
    dept: 'ME',
    year: '3rd Year',
    attendance: 68,
    cgpa: 6.94,
    readiness: 48,
    riskLevel: 'High',
    skills: ['AutoCAD', 'SolidWorks'],
    internship: 'None',
    placementStatus: 'Internship Required',
    email: 'sneha.k@unilens.edu',
  },
  {
    id: 'STU_003',
    name: 'Karan Patel',
    dept: 'CSE',
    year: '4th Year',
    attendance: 72,
    cgpa: 7.45,
    readiness: 64,
    riskLevel: 'Medium',
    skills: ['Java', 'SQL', 'Spring Boot'],
    internship: '2 Months (TCS Remote)',
    placementStatus: 'Eligible',
    email: 'karan.p@unilens.edu',
  },
  {
    id: 'STU_004',
    name: 'Pooja Hegde',
    dept: 'ISE',
    year: '4th Year',
    attendance: 74,
    cgpa: 7.38,
    readiness: 61,
    riskLevel: 'Medium',
    skills: ['Python', 'Django', 'PostgreSQL'],
    internship: '3 Months (FinTech Startup)',
    placementStatus: 'Shortlisted',
    email: 'pooja.h@unilens.edu',
  },
  {
    id: 'STU_005',
    name: 'Manish Gowda',
    dept: 'CV',
    year: '3rd Year',
    attendance: 66,
    cgpa: 6.75,
    readiness: 44,
    riskLevel: 'High',
    skills: ['STAAD Pro', 'GIS Survey'],
    internship: 'None',
    placementStatus: 'Skill Training Assigned',
    email: 'manish.g@unilens.edu',
  },
  {
    id: 'STU_006',
    name: 'Rohan Deshmukh',
    dept: 'EEE',
    year: '4th Year',
    attendance: 79,
    cgpa: 7.82,
    readiness: 68,
    riskLevel: 'Medium',
    skills: ['MATLAB', 'Power Systems', 'IoT'],
    internship: 'Siemens Energy Intern',
    placementStatus: 'Interview Round 2',
    email: 'rohan.d@unilens.edu',
  },
  {
    id: 'STU_007',
    name: 'Rahul Sharma',
    dept: 'ECE',
    year: '4th Year',
    attendance: 88,
    cgpa: 8.84,
    readiness: 86,
    riskLevel: 'Low',
    skills: ['Edge AI', 'Embedded C++', 'Python', 'OpenCV'],
    internship: 'Bosch R&D Center (6 Months)',
    placementStatus: 'Tier-1 Eligible',
    email: 'rahul@unilens.edu',
  },
  {
    id: 'STU_008',
    name: 'Ananya Rao',
    dept: 'CSE',
    year: '4th Year',
    attendance: 94,
    cgpa: 9.42,
    readiness: 95,
    riskLevel: 'Low',
    skills: ['Go', 'Kubernetes', 'FastAPI', 'Distributed Systems'],
    internship: 'Amazon SDE Intern',
    placementStatus: 'Pre-Placement Offer',
    email: 'ananya.r@unilens.edu',
  },
  {
    id: 'STU_009',
    name: 'Nikhil Reddy',
    dept: 'ISE',
    year: '3rd Year',
    attendance: 71,
    cgpa: 7.15,
    readiness: 58,
    riskLevel: 'Medium',
    skills: ['React', 'Node.js', 'MongoDB'],
    internship: 'None',
    placementStatus: 'Seeking Internship',
    email: 'nikhil.r@unilens.edu',
  },
  {
    id: 'STU_010',
    name: 'Divya Sundaram',
    dept: 'ECE',
    year: '4th Year',
    attendance: 82,
    cgpa: 8.12,
    readiness: 76,
    riskLevel: 'Low',
    skills: ['VLSI Design', 'Verilog', 'Python'],
    internship: 'Texas Instruments Intern',
    placementStatus: 'Placed (8.5 LPA)',
    email: 'divya.s@unilens.edu',
  },
];

export const STUDENT_DEPARTMENT_DISTRIBUTION = [
  { dept: 'CSE', count: 1240, percentage: 25.7, color: '#8B5CF6' },
  { dept: 'ISE', count: 860, percentage: 17.8, color: '#6366F1' },
  { dept: 'ECE', count: 980, percentage: 20.3, color: '#38BDF8' },
  { dept: 'ME', count: 620, percentage: 12.9, color: '#14B8A6' },
  { dept: 'CV', count: 540, percentage: 11.2, color: '#84CC16' },
  { dept: 'EEE', count: 580, percentage: 12.0, color: '#F59E0B' },
];

// 3. PLACEMENT DATASET
export const PLACEMENT_TRENDS = [
  { term: '2023 Sem 1', rate: 64, avgPackage: 6.8 },
  { term: '2023 Sem 2', rate: 68, avgPackage: 7.2 },
  { term: '2024 Sem 1', rate: 71, avgPackage: 7.5 },
  { term: '2024 Sem 2', rate: 74, avgPackage: 8.0 },
  { term: '2025 Sem 1', rate: 76, avgPackage: 8.2 },
  { term: '2025 Sem 2', rate: 78.4, avgPackage: 8.6 },
];

export const DEPARTMENT_PLACEMENT_RATES = [
  { dept: 'CSE', rate: 88, placed: 210, total: 238, color: '#8B5CF6' },
  { dept: 'ISE', rate: 84, placed: 142, total: 169, color: '#6366F1' },
  { dept: 'ECE', rate: 74, placed: 145, total: 196, color: '#38BDF8' },
  { dept: 'ME', rate: 62, placed: 75, total: 121, color: '#14B8A6' },
  { dept: 'CV', rate: 58, placed: 62, total: 107, color: '#84CC16' },
  { dept: 'EEE', rate: 65, placed: 78, total: 120, color: '#F59E0B' },
];

export const COMPANY_HIRING_RECORDS: CompanyHiringRecord[] = [
  {
    company: 'Cisco Systems',
    logoColor: '#06B6D4',
    roles: 'Network Software Engineer',
    eligible: 240,
    applications: 184,
    selected: 28,
    avgCtc: '14.5 LPA',
    status: 'Completed',
  },
  {
    company: 'Bosch Global Software',
    logoColor: '#EF4444',
    roles: 'Embedded AI Engineer',
    eligible: 210,
    applications: 165,
    selected: 34,
    avgCtc: '9.2 LPA',
    status: 'Completed',
  },
  {
    company: 'Oracle Cloud Infrastructure',
    logoColor: '#F97316',
    roles: 'Cloud Solutions Architect',
    eligible: 195,
    applications: 142,
    selected: 18,
    avgCtc: '18.0 LPA',
    status: 'In Progress',
  },
  {
    company: 'Microsoft India',
    logoColor: '#3B82F6',
    roles: 'SDE-1 (Azure Platform)',
    eligible: 180,
    applications: 160,
    selected: 12,
    avgCtc: '44.0 LPA',
    status: 'Completed',
  },
  {
    company: 'Tata Consultancy Services (Digital)',
    logoColor: '#8B5CF6',
    roles: 'Digital Innovator / Cloud',
    eligible: 420,
    applications: 380,
    selected: 145,
    avgCtc: '7.5 LPA',
    status: 'Completed',
  },
];

// 4. ACADEMICS DATASET
export const SUBJECT_PERFORMANCE = [
  { subject: 'Data Structures & Algorithms', code: 'CS301', avgMarks: 76, passPct: 91, failPct: 9 },
  { subject: 'Operating Systems & Concurrency', code: 'CS402', avgMarks: 71, passPct: 86, failPct: 14 },
  { subject: 'Digital Signal Processing', code: 'EC401', avgMarks: 64, passPct: 78, failPct: 22 },
  { subject: 'Thermodynamics & Heat Transfer', code: 'ME304', avgMarks: 62, passPct: 75, failPct: 25 },
  { subject: 'Database Management Systems', code: 'IS302', avgMarks: 81, passPct: 95, failPct: 5 },
  { subject: 'Control Systems Engineering', code: 'EE403', avgMarks: 66, passPct: 80, failPct: 20 },
];

export const ATTENDANCE_VS_PERFORMANCE = [
  { attendanceBucket: '< 65%', avgCgpa: 5.92, failRate: 34, studentCount: 68 },
  { attendanceBucket: '65% - 75%', avgCgpa: 6.84, failRate: 18, studentCount: 194 },
  { attendanceBucket: '75% - 85%', avgCgpa: 7.92, failRate: 6, studentCount: 1840 },
  { attendanceBucket: '85% - 95%', avgCgpa: 8.65, failRate: 2, studentCount: 2180 },
  { attendanceBucket: '> 95%', avgCgpa: 9.12, failRate: 0.5, studentCount: 538 },
];

// 5. LABS & FACILITIES DATASET
export const LAB_FACILITIES: LabFacilityRecord[] = [
  {
    id: 'LAB_01',
    name: 'AI & Machine Learning Studio',
    dept: 'CSE',
    utilization: 88,
    status: 'Busy',
    activeBookings: 64,
    capacity: 70,
    equipmentHealth: 98,
    leadFaculty: 'Dr. Aarav Sharma',
  },
  {
    id: 'LAB_02',
    name: 'Cloud Infrastructure & DevOps Lab',
    dept: 'ISE',
    utilization: 82,
    status: 'Busy',
    activeBookings: 56,
    capacity: 65,
    equipmentHealth: 94,
    leadFaculty: 'Dr. Divya Balasubramanian',
  },
  {
    id: 'LAB_03',
    name: 'Neuromorphic Embedded & VLSI Lab',
    dept: 'ECE',
    utilization: 74,
    status: 'Available',
    activeBookings: 38,
    capacity: 55,
    equipmentHealth: 92,
    leadFaculty: 'Dr. Rajeshwari Kulkarni',
  },
  {
    id: 'LAB_04',
    name: 'IoT & Smart Grid Innovation Center',
    dept: 'EEE',
    utilization: 68,
    status: 'Available',
    activeBookings: 32,
    capacity: 50,
    equipmentHealth: 88,
    leadFaculty: 'Dr. Meera Nambiar',
  },
  {
    id: 'LAB_05',
    name: 'Computer Center 3 (General Lab)',
    dept: 'Campus',
    utilization: 48,
    status: 'Maintenance',
    activeBookings: 0,
    capacity: 80,
    equipmentHealth: 76,
    leadFaculty: 'Central IT Cell',
  },
];

export const LAB_TIME_UTILIZATION = [
  { slot: '08:00 - 10:00', utilPct: 42, label: 'Morning Slot 1' },
  { slot: '10:00 - 12:00', utilPct: 88, label: 'Peak Academic' },
  { slot: '12:00 - 14:00', utilPct: 54, label: 'Midday Open Access' },
  { slot: '14:00 - 16:00', utilPct: 92, label: 'Afternoon Practical' },
  { slot: '16:00 - 18:00', utilPct: 84, label: 'Research & Club Projects' },
  { slot: '18:00 - 21:00', utilPct: 62, label: 'Evening Hack Sprints' },
];

// 6. CLUBS & EVENTS DATASET
export const CLUB_EVENTS: ClubEventRecord[] = [
  {
    id: 'EVT_01',
    title: 'HackOverflow 3.0 Sprints',
    club: 'CodeCrafters',
    date: '05 SEP',
    time: '09:00 AM - 09:00 PM',
    category: 'Hackathon',
    registrations: 420,
    capacity: 450,
    color: '#8B5CF6',
    icon: 'terminal',
  },
  {
    id: 'EVT_02',
    title: 'Tech Talk: AI in Real World',
    club: 'IEEE Student Branch',
    date: '07 SEP',
    time: '03:00 PM - 05:00 PM',
    category: 'Guest Lecture',
    registrations: 280,
    capacity: 300,
    color: '#EC4899',
    icon: 'psychology',
  },
  {
    id: 'EVT_03',
    title: 'Cultural Fest - Udaan Launch',
    club: 'Rotaract Campus Wing',
    date: '12 SEP',
    time: '05:00 PM - 09:30 PM',
    category: 'Campus Festival',
    registrations: 1250,
    capacity: 1500,
    color: '#F43F5E',
    icon: 'celebration',
  },
  {
    id: 'EVT_04',
    title: 'Autonomous Drone Flight Demo',
    club: 'Robotics Club',
    date: '16 SEP',
    time: '11:00 AM - 01:00 PM',
    category: 'Workshop',
    registrations: 195,
    capacity: 200,
    color: '#10B981',
    icon: 'precision_manufacturing',
  },
  {
    id: 'EVT_05',
    title: 'Electric Vehicle Design Sprint',
    club: 'SAE Collegiate Club',
    date: '20 SEP',
    time: '02:00 PM - 06:00 PM',
    category: 'Competition',
    registrations: 160,
    capacity: 180,
    color: '#F59E0B',
    icon: 'electric_bolt',
  },
];

export const TOP_CAMPUS_CLUBS = [
  { name: 'CodeCrafters', members: 640, engagementRate: 86, eventsOrganized: 8, lead: 'Tanvi M' },
  { name: 'Dance Club', members: 480, engagementRate: 78, eventsOrganized: 5, lead: 'Arjun S' },
  { name: 'Robotics Club', members: 410, engagementRate: 74, eventsOrganized: 6, lead: 'Vikram B' },
  { name: 'SAE Collegiate Club', members: 360, engagementRate: 69, eventsOrganized: 4, lead: 'Chetan R' },
  { name: 'Photography Club', members: 320, engagementRate: 65, eventsOrganized: 4, lead: 'Meghna P' },
];

// 7. REPORTS DATASET
export const CAMPUS_REPORTS: ReportTemplate[] = [
  {
    id: 'REP_01',
    title: 'Placement Readiness & Hiring Audit',
    category: 'Placements',
    generatedDate: 'Sep 01, 2026',
    status: 'Ready',
    pages: 18,
    summary: 'Comprehensive evaluation of Tier-1 placement pipeline, department readiness gaps, and CTC distributions.',
    keyMetric: '78.4%',
    metricLabel: 'Campus Placement Rate',
  },
  {
    id: 'REP_02',
    title: 'Academic Performance & Retention Audit',
    category: 'Academics',
    generatedDate: 'Aug 28, 2026',
    status: 'Ready',
    pages: 24,
    summary: 'Semester-end CGPA distribution, attendance risk analysis across 6 engineering departments, and intervention logs.',
    keyMetric: '92.4%',
    metricLabel: 'Overall Pass Rate',
  },
  {
    id: 'REP_03',
    title: 'Student Skills & Attrition Intelligence',
    category: 'Students',
    generatedDate: 'Aug 25, 2026',
    status: 'Ready',
    pages: 14,
    summary: 'Cross-tabulation of verified capstone tech stacks, student skill profiles, and internship participation.',
    keyMetric: '142',
    metricLabel: 'Students Requiring Attention',
  },
  {
    id: 'REP_04',
    title: 'Lab Utilization & Equipment Health',
    category: 'Facilities',
    generatedDate: 'Sep 02, 2026',
    status: 'Updated',
    pages: 12,
    summary: 'Hourly utilization indices across 24 university research and instructional labs with maintenance logs.',
    keyMetric: '74%',
    metricLabel: 'Average Lab Utilization',
  },
  {
    id: 'REP_05',
    title: 'Campus Engagement & Extracurriculars',
    category: 'Clubs & Events',
    generatedDate: 'Aug 30, 2026',
    status: 'Ready',
    pages: 16,
    summary: 'Student extracurricular participation, club membership retention, and cross-departmental engagement trends.',
    keyMetric: '3,420',
    metricLabel: 'Total Active Registrations',
  },
  {
    id: 'REP_06',
    title: 'Executive Campus Health Report',
    category: 'Executive',
    generatedDate: 'Sep 02, 2026',
    status: 'Updated',
    pages: 28,
    summary: 'Executive-level institutional intelligence briefing fusing academic, career, and research operations.',
    keyMetric: '88.6/100',
    metricLabel: 'Institutional Health Index',
  },
];

// 8. ALERTS DATASET
export const CAMPUS_ALERTS: CampusAlertRecord[] = [
  {
    id: 'ALT_01',
    title: '34 final-year students have zero verified internship experience',
    category: 'Placements',
    severity: 'Critical',
    timestamp: 'Today at 09:30 AM',
    description: '34 final-year students in ECE & ME departments risk failing Tier-1 placement eligibility guidelines due to zero logged industry internships.',
    actionRequired: 'Assign immediate 4-week virtual industry live project or faculty research apprenticeship.',
  },
  {
    id: 'ALT_02',
    title: 'ECE placement readiness is 14% below industry benchmark',
    category: 'Placements',
    severity: 'Needs Attention',
    timestamp: 'Yesterday at 04:15 PM',
    description: 'ECE readiness currently stands at 61% against the campus benchmark target of 75%. Critical skill gaps: Cloud Computing (48%) and Machine Learning (54%).',
    actionRequired: 'Enroll ECE cohorts into the weekend Cloud Architecture & ML Ops bridge bootcamps.',
  },
  {
    id: 'ALT_03',
    title: 'AI Studio utilization reached 94% peak capacity this week',
    category: 'Facilities',
    severity: 'Monitor',
    timestamp: 'Today at 11:45 AM',
    description: 'GPU cluster and high-performance workstations in AI Studio are experiencing thermal throttling and high queue times ahead of HackOverflow.',
    actionRequired: 'Shift non-ML programming practicals to Computer Lab 2 and activate secondary cloud credits.',
  },
  {
    id: 'ALT_04',
    title: '126 students attendance below 70% threshold in CS402 and EC401',
    category: 'Academics',
    severity: 'Critical',
    timestamp: 'Yesterday at 02:00 PM',
    description: 'Mid-term academic review flagged 126 students whose attendance prevents exam registration under university bylaws.',
    actionRequired: 'Issue parent intimations and schedule mandatory remedial counselling sessions.',
  },
  {
    id: 'ALT_05',
    title: 'Computer Lab 3 scheduled maintenance completed successfully',
    category: 'Facilities',
    severity: 'Resolved',
    timestamp: 'Sep 01, 2026 at 06:00 PM',
    description: 'Operating system reimaging and gigabit network switch replacement on 80 workstations finalized and verified.',
    actionRequired: 'Workstation availability restored for open lab hours.',
  },
];

// 9. CONTEXT-AWARE AI PROMPT CHIPS
export const CONTEXT_AWARE_PROMPTS: Record<string, string[]> = {
  dashboard: [
    'Which department has largest placement skill gap?',
    'Show lab utilization this month',
    'Top 5 clubs by engagement',
    'Skill gap for CSE department',
  ],
  students: [
    'Which students are at academic risk?',
    'Department with lowest average attendance',
    'What percentage have completed internships?',
    'Show ECE student distribution',
  ],
  placements: [
    'Which department needs most placement support?',
    'Largest skill gaps in ECE & ME',
    'Top hiring companies by selected students',
    'What is the highest package offered this term?',
  ],
  academics: [
    'Show subjects with highest failure percentage',
    'How does attendance below 70% impact CGPA?',
    'Top performing department in semester exams',
    'List students requiring immediate academic intervention',
  ],
  labs: [
    'Which lab is currently underutilized?',
    'AI Studio peak usage hours',
    'Which labs have active maintenance issues?',
    'Show equipment health across all 24 labs',
  ],
  clubs: [
    'Which club has highest student engagement?',
    'Upcoming events registration status',
    'Department participation rates in HackOverflow',
    'Compare event registrations vs actual attendance',
  ],
  reports: [
    'Generate executive summary for campus health',
    'Summarize recent placement readiness changes',
    'Export Student Analytics Audit as PDF',
    'What are the key institutional findings this term?',
  ],
  alerts: [
    'Show all critical unresolved alerts',
    'How many final-year students lack internships?',
    'Has Computer Lab 3 maintenance completed?',
    'Action plan for ECE placement skill gap',
  ],
  'ask-genie': [
    'Which department has largest placement skill gap?',
    'Which students are at academic risk?',
    'Show top hiring companies this term',
    'AI Studio peak usage hours',
  ],
};

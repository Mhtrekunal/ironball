export type Role = 'teacher' | 'hod';

export interface SubCriterion {
  id: string;
  title: string;
  description: string;
  fieldType: 'text' | 'date' | 'select' | 'radio' | 'checkbox' | 'file';
  options?: string[];
}

export interface Criterion {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  subCriteria: SubCriterion[];
}

export const NAAC_CRITERIA: Criterion[] = [
  {
    id: 'criterion-1',
    number: 1,
    title: 'Curricular Aspects',
    description: 'Focus on curriculum design, development, and delivery.',
    icon: 'BookOpen',
    subCriteria: [
      { 
        id: '1.1', 
        title: 'Curricular Planning & Implementation', 
        description: 'Teachers in BoS/Academic Council/Syndicate (2016-21); New programmes introduced during 2016-21.', 
        fieldType: 'file' 
      },
      { 
        id: '1.2', 
        title: 'Academic Flexibility', 
        description: 'Syllabi of courses relevant to Gender, Environment, Sustainability, Human Values and Professional Ethics; Audit Courses list.', 
        fieldType: 'file' 
      },
      { 
        id: '1.3', 
        title: 'Curriculum Enrichment', 
        description: 'Comprehensive Syllabi of Core/Common/Electives/Practicals/Open Courses 2016-21; List of students undertaking Field Projects/Internships with proof of certificates.', 
        fieldType: 'file' 
      },
      { 
        id: '1.4', 
        title: 'Feedback System', 
        description: 'Structured feedback from students on Syllabi; Analysis and Action Taken Reports (ATRs); Add-on and Value-added Courses with details.', 
        fieldType: 'file' 
      },
    ]
  },
  {
    id: 'criterion-2',
    number: 2,
    title: 'Teaching-Learning and Evaluation',
    description: 'Processes related to student enrollment, teaching quality, and evaluation.',
    icon: 'GraduationCap',
    subCriteria: [
      { 
        id: '2.1', 
        title: 'Student Enrolment & Profile', 
        description: 'Nominal Rolls of students admitted 2016-21; List of students in reserved categories (OBC/SC/ST/PH) with Bio-Data and category certificate proof.', 
        fieldType: 'file' 
      },
      { 
        id: '2.2', 
        title: 'Catering to Student Diversity', 
        description: 'List of Permanent/Guest Faculty with full profiles — PhDs, Fellowships, Awards, Recognitions, Projects, Papers, Books; Details of ICT tool usage; Special strategies for slow learners.', 
        fieldType: 'file' 
      },
      { 
        id: '2.3', 
        title: 'Teaching-Learning Process', 
        description: 'Internal Assessment details for last 5 years; Department Minutes Book of grievance redressed; Academic Calendar and Department minutes book with work diary.', 
        fieldType: 'file' 
      },
      { 
        id: '2.4', 
        title: 'Teacher Quality', 
        description: 'Programme/Course Outcomes file; File showing attainment of programme outcomes; Faculty qualifications and research guide recognition.', 
        fieldType: 'file' 
      },
      { 
        id: '2.5', 
        title: 'Evaluation Process & Reforms', 
        description: 'Results file for last 5 years showing split-up of pass percentage with detailed statistics per course.', 
        fieldType: 'file' 
      },
    ]
  },
  {
    id: 'criterion-3',
    number: 3,
    title: 'Research, Innovations and Extension',
    description: 'Promotion of research and extension activities.',
    icon: 'FlaskConical',
    subCriteria: [
      { id: '3.1.1', title: 'Resource Mobilization', description: 'Grants received from Government and non-governmental agencies.', fieldType: 'text' },
      { id: '3.3.1', title: 'Innovation Ecosystem', description: 'Institution has created an ecosystem for innovations.', fieldType: 'text' },
      { id: '3.4.1', title: 'Research Publications', description: 'Number of research papers per teacher. Upload published papers as evidence.', fieldType: 'file' },
    ]
  },
  {
    id: 'criterion-4',
    number: 4,
    title: 'Infrastructure and Learning Resources',
    description: 'Adequacy of campus facilities and learning resources.',
    icon: 'Building2',
    subCriteria: [
      { id: '4.1.1', title: 'Physical Facilities', description: 'Adequate infrastructure and physical facilities.', fieldType: 'text' },
      { id: '4.2.1', title: 'Library Resources', description: 'Library is automated using Integrated Library Management System.', fieldType: 'text' },
      { id: '4.4.1', title: 'Maintenance of Facilities', description: 'Expenditure incurred on maintenance.', fieldType: 'text' },
    ]
  },
  {
    id: 'criterion-5',
    number: 5,
    title: 'Student Support and Progression',
    description: 'Efforts for student mentoring and progression.',
    icon: 'Users',
    subCriteria: [
      { id: '5.1.1', title: 'Scholarships', description: 'Percentage of students benefited by scholarships.', fieldType: 'text' },
      { id: '5.2.1', title: 'Student Progression', description: 'Placement of outgoing students.', fieldType: 'text' },
      { id: '5.3.1', title: 'Student Participation', description: 'Number of awards/medals for outstanding performance.', fieldType: 'text' },
    ]
  },
  {
    id: 'criterion-6',
    number: 6,
    title: 'Governance, Leadership and Management',
    description: 'Institutional vision, strategy, and administrative setup.',
    icon: 'ShieldCheck',
    subCriteria: [
      { id: '6.1.1', title: 'Institutional Vision', description: 'Governance of the institution is reflective of vision and mission.', fieldType: 'text' },
      { id: '6.3.1', title: 'Faculty Empowerment', description: 'Effective welfare measures for teaching and non-teaching staff.', fieldType: 'text' },
      { id: '6.5.1', title: 'Internal Quality Assurance', description: 'Internal Quality Assurance Cell (IQAC) contribution.', fieldType: 'file' },
    ]
  },
  {
    id: 'criterion-7',
    number: 7,
    title: 'Institutional Values and Best Practices',
    description: 'Social responsibilities and innovative practices.',
    icon: 'Sparkles',
    subCriteria: [
      { id: '7.1.1', title: 'Gender Equity', description: 'Measures initiated by the Institution for gender equity.', fieldType: 'text' },
      { id: '7.2.1', title: 'Best Practices', description: 'Two best practices successfully implemented.', fieldType: 'text' },
      { id: '7.3.1', title: 'Institutional Distinctiveness', description: 'Performance of the Institution in one area distinctive to its priority.', fieldType: 'text' },
    ]
  }
];

export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  progress: Record<string, number>;
  subProgress: Record<string, 'done' | 'pending' | 'revision'>;
}

export const MOCK_TEACHERS: TeacherProfile[] = [
  { 
    id: 't1', 
    name: 'Dr. Sarah Wilson', 
    email: 'sarah.wilson@institution.edu',
    phone: '+91 98765 43210',
    designation: 'Assistant Professor',
    department: 'Computer Science', 
    progress: { '1': 80, '2': 60, '3': 40, '4': 90, '5': 30, '6': 100, '7': 75 },
    subProgress: {
      '1.1': 'done',
      '1.2': 'pending',
      '1.3': 'done',
      '2.1': 'done',
      '2.2': 'revision',
      '2.5': 'pending',
    }
  },
  { 
    id: 't2', 
    name: 'Prof. James Miller', 
    email: 'james.miller@institution.edu',
    phone: '+91 98765 43211',
    designation: 'Associate Professor',
    department: 'Information Technology', 
    progress: { '1': 45, '2': 85, '3': 20, '4': 50, '5': 90, '6': 40, '7': 60 },
    subProgress: {
      '1.1': 'pending',
      '1.2': 'done',
      '2.1': 'done',
      '2.2': 'done',
    }
  },
  { 
    id: 't3', 
    name: 'Dr. Emily Chen', 
    email: 'emily.chen@institution.edu',
    phone: '+91 98765 43212',
    designation: 'Professor',
    department: 'Data Science', 
    progress: { '1': 100, '2': 100, '3': 85, '4': 80, '5': 95, '6': 70, '7': 90 },
    subProgress: {
      '1.1': 'done',
      '1.2': 'done',
      '1.3': 'done',
      '2.1': 'done',
      '2.2': 'done',
      '2.5': 'done',
    }
  },
];
import { Institute, Review, StudentAssociation } from '../types';

export const MOCK_INSTITUTES: Institute[] = [
  {
    id: 'inst-1',
    name: 'Apex Academy JEE & NEET',
    slug: 'apex-academy-kota',
    tagline: 'Precision coaching for top engineering & medical entrance exams',
    logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
    location: {
      city: 'Kota',
      state: 'Rajasthan',
      address: 'Plot 42, Rajiv Gandhi Nagar, Kota'
    },
    courses: [
      { courseName: 'JEE Advanced Target Batch', examCategory: 'JEE', approxFee: 145000, duration: '1 Year', mode: 'Offline' },
      { courseName: 'NEET Dropper Excel Batch', examCategory: 'NEET', approxFee: 135000, duration: '1 Year', mode: 'Offline' },
      { courseName: 'Class 11 Foundation Hybrid', examCategory: 'JEE', approxFee: 95000, duration: '2 Years', mode: 'Hybrid' }
    ],
    facilities: ['Library Access', 'AC Classrooms', 'Dedicated Doubt Counter', 'Weekly CBT Mock Tests', 'Biometric Attendance'],
    mode: 'Offline',
    batchInfo: 'Maximum 40 students per batch. Regular doubt solving sessions every weekday evening.',
    contact: {
      phone: '+91 98765 43210',
      email: 'admissions@apexkota.edu.in',
      website: 'https://apexacademy.example.com'
    },
    about: 'Apex Academy is a premier entrance exam preparation institute in Kota known for rigorous problem-solving methodologies and experienced senior faculty members.',
    verificationStatus: 'verified',
    verificationSubmittedAt: '2025-01-10T10:00:00Z',
    reviewCount: 3,
    overallRating: 4.4,
    dimensionAverages: {
      facultyQuality: 4.7,
      studyMaterial: 4.5,
      doubtSupport: 4.2,
      feeTransparency: 4.0,
      batchManagement: 4.3,
      valueForMoney: 4.4
    }
  },
  {
    id: 'inst-2',
    name: 'Vanguard Civil Services Institute',
    slug: 'vanguard-ias-delhi',
    tagline: 'Empowering aspirants for UPSC Civil Services Examination',
    logoUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=150&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    location: {
      city: 'New Delhi',
      state: 'Delhi',
      address: '21 Bada Bazar Road, Old Rajinder Nagar, New Delhi'
    },
    courses: [
      { courseName: 'UPSC GS Foundation Integrated', examCategory: 'UPSC', approxFee: 175000, duration: '15 Months', mode: 'Offline' },
      { courseName: 'CSAT Special Masterclass', examCategory: 'UPSC', approxFee: 25000, duration: '3 Months', mode: 'Online' }
    ],
    facilities: ['24x7 Reading Hall', 'Answer Writing Evaluation', 'Mentorship Sessions', 'Daily Current Affairs Booklet'],
    mode: 'Hybrid',
    batchInfo: 'Morning and Evening batches available. Personalized test review with retired civil servants.',
    contact: {
      phone: '+91 98111 22334',
      email: 'contact@vanguardias.in',
      website: 'https://vanguardias.example.com'
    },
    about: 'Vanguard IAS focuses on conceptual clarity, structured answer writing, and continuous analytical evaluation for UPSC aspirants.',
    verificationStatus: 'verified',
    verificationSubmittedAt: '2025-02-01T12:30:00Z',
    reviewCount: 2,
    overallRating: 4.1,
    dimensionAverages: {
      facultyQuality: 4.5,
      studyMaterial: 4.8,
      doubtSupport: 3.5,
      feeTransparency: 3.8,
      batchManagement: 4.0,
      valueForMoney: 4.0
    }
  },
  {
    id: 'inst-3',
    name: 'Zenith Science & Math Tuition Hub',
    slug: 'zenith-tuition-hyderabad',
    tagline: 'Focused small-group tuition for Class 9 to 12 CBSE & State Board',
    logoUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    location: {
      city: 'Hyderabad',
      state: 'Telangana',
      address: 'Ameerpet Main Road, Near Metro Pillar 1042, Hyderabad'
    },
    courses: [
      { courseName: 'Class 12 Physics & Maths Intensive', examCategory: 'Class 11-12 Board', approxFee: 45000, duration: '10 Months', mode: 'Offline' },
      { courseName: 'CUET Domain Subject Prep', examCategory: 'CUET', approxFee: 35000, duration: '4 Months', mode: 'Hybrid' }
    ],
    facilities: ['Small Batch (15 max)', 'Personalized Doubt Support', 'Chapter-wise Practice Sheets', 'Parent-Teacher Meet'],
    mode: 'Offline',
    batchInfo: 'Strictly 15 students per batch for individual attention.',
    contact: {
      phone: '+91 94400 55667',
      email: 'info@zenithtuitions.com'
    },
    about: 'Zenith focuses on micro-batch learning to ensure no student is left behind in board exams and foundational entrance tests.',
    verificationStatus: 'pending', // Pending verification demo
    verificationSubmittedAt: '2026-03-15T09:00:00Z',
    reviewCount: 0, // IMPORTANT: ZERO REVIEWS TEST STATE
    overallRating: null,
    dimensionAverages: null
  },
  {
    id: 'inst-4',
    name: 'Pinnacle Scholars Olympiad & Foundation',
    slug: 'pinnacle-scholars-pune',
    tagline: 'Nurturing young minds for NTSE, Olympiads & Board Excellence',
    logoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    coverImageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    location: {
      city: 'Pune',
      state: 'Maharashtra',
      address: 'FC Road, Opposite Ferguson College Gate 2, Pune'
    },
    courses: [
      { courseName: 'Class 10 Board + NTSE Foundation', examCategory: 'Class 11-12 Board', approxFee: 55000, duration: '1 Year', mode: 'Hybrid' }
    ],
    facilities: ['Interactive Smart Boards', 'Digital Study Portal', 'Monthly Diagnostic Tests'],
    mode: 'Hybrid',
    batchInfo: 'Batches run on mornings and weekend slots.',
    contact: {
      phone: '+91 98220 11223',
      email: 'admin@pinnaclescholars.in'
    },
    about: 'Pinnacle Scholars offers a balanced approach combining school curriculum support with competitive exam foundation.',
    verificationStatus: 'unverified',
    reviewCount: 0, // ZERO REVIEWS TEST STATE
    overallRating: null,
    dimensionAverages: null
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    instituteId: 'inst-1',
    instituteName: 'Apex Academy JEE & NEET',
    studentId: 'stud-101',
    studentName: 'Rohan Sharma (Verified Student)',
    studentBatchYear: '2023-2024',
    courseName: 'JEE Advanced Target Batch',
    examCategory: 'JEE',
    overallRating: 4.5,
    dimensions: {
      facultyQuality: 5,
      studyMaterial: 4.5,
      doubtSupport: 4,
      feeTransparency: 4,
      batchManagement: 4.5,
      valueForMoney: 4.5
    },
    writtenReview: 'The Physics and Chemistry faculty are top tier. They focus heavily on fundamental concepts and problem solving tricks required for JEE Advanced. Doubt counters get slightly crowded near exam dates, but teachers spend extra time explaining. Fee structure is fully disclosed upfront without hidden charges.',
    createdAt: '2024-11-15T14:20:00Z',
    helpfulCount: 14,
    hasVotedHelpful: false,
    instituteResponse: {
      responseText: 'Thank you Rohan for your detailed feedback! We are constantly expanding our evening doubt counter faculty to reduce wait times during peak test series months.',
      respondedAt: '2024-11-17T10:00:00Z',
      officialRole: 'Academic Director, Apex Academy'
    }
  },
  {
    id: 'rev-2',
    instituteId: 'inst-1',
    instituteName: 'Apex Academy JEE & NEET',
    studentId: 'stud-102',
    studentName: 'Priya Verma (Verified Student)',
    studentBatchYear: '2023-2024',
    courseName: 'NEET Dropper Excel Batch',
    examCategory: 'NEET',
    overallRating: 4.3,
    dimensions: {
      facultyQuality: 4.5,
      studyMaterial: 4.5,
      doubtSupport: 4.5,
      feeTransparency: 4.0,
      batchManagement: 4.0,
      valueForMoney: 4.2
    },
    writtenReview: 'Biology modules and chapter tests were extremely accurate according to latest NCERT pattern. Weekly mock tests really helped me build test speed and accuracy under time pressure.',
    createdAt: '2025-01-08T09:15:00Z',
    helpfulCount: 8,
    hasVotedHelpful: false
  },
  {
    id: 'rev-3',
    instituteId: 'inst-2',
    instituteName: 'Vanguard Civil Services Institute',
    studentId: 'stud-103',
    studentName: 'Ankit Gupta (Verified Student)',
    studentBatchYear: '2024-2025',
    courseName: 'UPSC GS Foundation Integrated',
    examCategory: 'UPSC',
    overallRating: 4.1,
    dimensions: {
      facultyQuality: 4.5,
      studyMaterial: 4.8,
      doubtSupport: 3.5,
      feeTransparency: 3.8,
      batchManagement: 4.0,
      valueForMoney: 4.0
    },
    writtenReview: 'Extremely detailed study notes for GS Paper 1 and 2. Answer writing guidance is genuine and feedback on answers is provided within 48 hours.',
    createdAt: '2025-02-12T16:45:00Z',
    helpfulCount: 5,
    hasVotedHelpful: false
  }
];

export const MOCK_STUDENT_ASSOCIATIONS: StudentAssociation[] = [
  {
    id: 'assoc-1',
    instituteId: 'inst-1',
    studentEmail: 'student@edumatch.com', // Demo student logged in email
    studentName: 'Aman Deep',
    courseName: 'JEE Advanced Target Batch',
    batchYear: '2023-2024',
    status: 'active',
    addedAt: '2024-08-01T10:00:00Z'
  },
  {
    id: 'assoc-2',
    instituteId: 'inst-2',
    studentEmail: 'student@edumatch.com',
    studentName: 'Aman Deep',
    courseName: 'UPSC GS Foundation Integrated',
    batchYear: '2024-2025',
    status: 'inactive', // Inactive demo state
    addedAt: '2024-09-10T11:00:00Z'
  }
];

export type UserRole = 'visitor' | 'student' | 'institute';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  mobile?: string;
  avatarUrl?: string;
  instituteId?: string; // Linked if role === 'institute'
}

export interface CourseFeeInfo {
  courseName: string; // e.g. "JEE Advanced 1-Year Classroom"
  examCategory: string; // "JEE", "NEET", "CUET", "UPSC", "Class 11-12 Board"
  approxFee: number; // e.g. 125000
  duration: string; // e.g. "12 Months"
  mode: 'Offline' | 'Online' | 'Hybrid';
}

export interface DimensionRatings {
  facultyQuality: number; // 1 to 5
  studyMaterial: number; // 1 to 5
  doubtSupport: number; // 1 to 5
  feeTransparency: number; // 1 to 5
  batchManagement: number; // 1 to 5
  valueForMoney: number; // 1 to 5
}

export interface Review {
  id: string;
  instituteId: string;
  instituteName: string;
  studentId: string;
  studentName: string; // Sanitized/Privacy protected (e.g. "Aman S. (Verified Student)")
  studentBatchYear: string; // e.g. "2023-2024"
  courseName: string;
  examCategory: string;
  overallRating: number;
  dimensions: DimensionRatings;
  writtenReview: string;
  createdAt: string; // ISO string
  helpfulCount: number;
  hasVotedHelpful?: boolean;
  instituteResponse?: {
    responseText: string;
    respondedAt: string;
    officialRole: string;
  };
}

export interface Institute {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  logoUrl?: string;
  coverImageUrl?: string;
  location: {
    city: string;
    state: string;
    address: string;
  };
  courses: CourseFeeInfo[];
  facilities: string[];
  mode: 'Offline' | 'Online' | 'Hybrid';
  batchInfo: string; // e.g. "New batches starting 1st & 15th every month. Max 45 students per batch."
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  about: string;
  verificationStatus: VerificationStatus;
  verificationSubmittedAt?: string;
  reviewCount: number; // Explicit count
  overallRating: number | null; // Null if reviewCount === 0!
  dimensionAverages: DimensionRatings | null;
}

export interface StudentAssociation {
  id: string;
  instituteId: string;
  studentEmail: string;
  studentName?: string;
  courseName: string;
  batchYear: string;
  status: 'active' | 'inactive';
  addedAt: string;
}

export interface VerificationDocument {
  id: string;
  instituteId: string;
  repName: string;
  repDesignation: string;
  repIdProofName?: string;
  addressProofName?: string;
  businessRegName?: string;
  officialWebsite: string;
  submittedAt: string;
  status: VerificationStatus;
  rejectionReason?: string;
}

export type ReviewEligibilityState =
  | 'not_logged_in'
  | 'no_association_found'
  | 'association_inactive'
  | 'eligible_otp_required'
  | 'otp_sent'
  | 'otp_verifying'
  | 'verified_form_unlocked'
  | 'review_submitted';

export interface OTPState {
  email: string;
  otpSent: boolean;
  expiresInSeconds: number;
  attemptsRemaining: number;
  isVerified: boolean;
}

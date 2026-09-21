import {
  Institute,
  Review,
  StudentAssociation,
  VerificationDocument,
  ReviewEligibilityState,
  DimensionRatings,
  OTPState
} from '../types';
import { MOCK_INSTITUTES, MOCK_REVIEWS, MOCK_STUDENT_ASSOCIATIONS } from '../mock/mockData';

// Local storage keys for persistence in demo session
const STORAGE_INSTITUTES = 'edumatch_institutes';
const STORAGE_REVIEWS = 'edumatch_reviews';
const STORAGE_ASSOCS = 'edumatch_assocs';
const STORAGE_DOCS = 'edumatch_docs';

function loadStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
}

export class EduMatchApiService {
  private institutes: Institute[];
  private reviews: Review[];
  private associations: StudentAssociation[];
  private verificationDocs: VerificationDocument[];

  constructor() {
    this.institutes = loadStored(STORAGE_INSTITUTES, MOCK_INSTITUTES);
    this.reviews = loadStored(STORAGE_REVIEWS, MOCK_REVIEWS);
    this.associations = loadStored(STORAGE_ASSOCS, MOCK_STUDENT_ASSOCIATIONS);
    this.verificationDocs = loadStored<VerificationDocument[]>(STORAGE_DOCS, [
      {
        id: 'doc-inst-1',
        instituteId: 'inst-1',
        repName: 'Dr. Rajesh Khanna',
        repDesignation: 'Director & Founder',
        repIdProofName: 'rajesh_aadhaar_masked.pdf',
        addressProofName: 'apex_property_lease.pdf',
        businessRegName: 'apex_education_pvt_ltd_gst.pdf',
        officialWebsite: 'https://apexacademy.example.com',
        submittedAt: '2025-01-10T10:00:00Z',
        status: 'verified'
      }
    ]);
  }

  // --- PUBLIC / DISCOVERY APIS ---
  async getInstitutes(params?: {
    search?: string;
    city?: string;
    examCategory?: string;
    maxFee?: number;
    mode?: string;
    sortBy?: 'rating' | 'reviews' | 'fee_asc' | 'fee_desc';
  }): Promise<Institute[]> {
    let result = [...this.institutes];

    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (inst) =>
          inst.name.toLowerCase().includes(q) ||
          inst.location.city.toLowerCase().includes(q) ||
          inst.courses.some((c) => c.courseName.toLowerCase().includes(q) || c.examCategory.toLowerCase().includes(q))
      );
    }

    if (params?.city) {
      result = result.filter((inst) => inst.location.city.toLowerCase() === params.city?.toLowerCase());
    }

    if (params?.examCategory) {
      result = result.filter((inst) =>
        inst.courses.some((c) => c.examCategory.toLowerCase() === params.examCategory?.toLowerCase())
      );
    }

    if (params?.maxFee) {
      result = result.filter((inst) =>
        inst.courses.some((c) => c.approxFee <= (params.maxFee || Infinity))
      );
    }

    if (params?.mode) {
      result = result.filter((inst) => inst.mode === params.mode);
    }

    if (params?.sortBy) {
      if (params.sortBy === 'rating') {
        result.sort((a, b) => (b.overallRating || 0) - (a.overallRating || 0));
      } else if (params.sortBy === 'reviews') {
        result.sort((a, b) => b.reviewCount - a.reviewCount);
      } else if (params.sortBy === 'fee_asc') {
        result.sort((a, b) => {
          const minA = Math.min(...a.courses.map((c) => c.approxFee), Infinity);
          const minB = Math.min(...b.courses.map((c) => c.approxFee), Infinity);
          return minA - minB;
        });
      } else if (params.sortBy === 'fee_desc') {
        result.sort((a, b) => {
          const maxA = Math.max(...a.courses.map((c) => c.approxFee), 0);
          const maxB = Math.max(...b.courses.map((c) => c.approxFee), 0);
          return maxB - maxA;
        });
      }
    }

    return result;
  }

  async getInstituteById(id: string): Promise<Institute | null> {
    return this.institutes.find((inst) => inst.id === id) || null;
  }

  async getReviewsForInstitute(instituteId: string): Promise<Review[]> {
    return this.reviews.filter((r) => r.instituteId === instituteId);
  }

  // --- REVIEW ELIGIBILITY & OTP APIS ---
  async checkEligibility(studentEmail: string | undefined, instituteId: string): Promise<{
    state: ReviewEligibilityState;
    association?: StudentAssociation;
    reason?: string;
  }> {
    if (!studentEmail) {
      return { state: 'not_logged_in', reason: 'You must be logged in as a student to write a review.' };
    }

    const assoc = this.associations.find(
      (a) => a.studentEmail.toLowerCase() === studentEmail.toLowerCase() && a.instituteId === instituteId
    );

    if (!assoc) {
      return {
        state: 'no_association_found',
        reason: 'No student enrolment record found for your email at this institute. Institutes register active student email lists for review verification.'
      };
    }

    if (assoc.status !== 'active') {
      return {
        state: 'association_inactive',
        association: assoc,
        reason: 'Your student enrolment record at this institute is currently inactive.'
      };
    }

    // Check if student has already submitted a review for this institute
    const existing = this.reviews.find(
      (r) => r.instituteId === instituteId && r.studentId === studentEmail
    );
    if (existing) {
      return {
        state: 'review_submitted',
        reason: 'You have already submitted a verified review for this institute.'
      };
    }

    return {
      state: 'eligible_otp_required',
      association: assoc
    };
  }

  async sendOTP(email: string): Promise<OTPState> {
    // In actual Supabase, this triggers auth.signInWithOtp() or edge function
    return {
      email,
      otpSent: true,
      expiresInSeconds: 300, // 5 mins
      attemptsRemaining: 3,
      isVerified: false
    };
  }

  async verifyOTP(email: string, enteredCode: string): Promise<{ success: boolean; message: string }> {
    // Frontend validation demo placeholder
    if (enteredCode.length !== 6 || !/^\d+$/.test(enteredCode)) {
      return { success: false, message: 'Please enter a valid 6-digit numeric OTP code.' };
    }

    // Demo: Any 6-digit number that ends in an even digit succeeds, or code "123456"
    if (enteredCode === '123456' || parseInt(enteredCode.slice(-1)) % 2 === 0) {
      return { success: true, message: 'OTP verified successfully! Review submission form unlocked.' };
    }

    return { success: false, message: 'Invalid OTP code. Please check your email inbox and try again (Test code: 123456).' };
  }

  async submitReview(data: {
    instituteId: string;
    studentId: string;
    studentName: string;
    studentBatchYear: string;
    courseName: string;
    examCategory: string;
    overallRating: number;
    dimensions: DimensionRatings;
    writtenReview: string;
  }): Promise<Review> {
    const inst = this.institutes.find((i) => i.id === data.instituteId);
    const newReview: Review = {
      id: 'rev-' + Date.now(),
      instituteId: data.instituteId,
      instituteName: inst?.name || 'Coaching Institute',
      studentId: data.studentId,
      studentName: `${data.studentName.split(' ')[0]} ${data.studentName.split(' ')[1]?.[0] || ''}. (Verified Student)`,
      studentBatchYear: data.studentBatchYear,
      courseName: data.courseName,
      examCategory: data.examCategory,
      overallRating: data.overallRating,
      dimensions: data.dimensions,
      writtenReview: data.writtenReview,
      createdAt: new Date().toISOString(),
      helpfulCount: 0,
      hasVotedHelpful: false
    };

    this.reviews.unshift(newReview);
    saveStored(STORAGE_REVIEWS, this.reviews);

    // Recalculate Institute rating stats
    if (inst) {
      const instReviews = this.reviews.filter((r) => r.instituteId === data.instituteId);
      inst.reviewCount = instReviews.length;
      const sumRating = instReviews.reduce((acc, r) => acc + r.overallRating, 0);
      inst.overallRating = parseFloat((sumRating / instReviews.length).toFixed(1));

      // Calculate averages across dimensions
      const dimSum: DimensionRatings = {
        facultyQuality: 0,
        studyMaterial: 0,
        doubtSupport: 0,
        feeTransparency: 0,
        batchManagement: 0,
        valueForMoney: 0
      };
      instReviews.forEach((r) => {
        dimSum.facultyQuality += r.dimensions.facultyQuality;
        dimSum.studyMaterial += r.dimensions.studyMaterial;
        dimSum.doubtSupport += r.dimensions.doubtSupport;
        dimSum.feeTransparency += r.dimensions.feeTransparency;
        dimSum.batchManagement += r.dimensions.batchManagement;
        dimSum.valueForMoney += r.dimensions.valueForMoney;
      });
      inst.dimensionAverages = {
        facultyQuality: parseFloat((dimSum.facultyQuality / instReviews.length).toFixed(1)),
        studyMaterial: parseFloat((dimSum.studyMaterial / instReviews.length).toFixed(1)),
        doubtSupport: parseFloat((dimSum.doubtSupport / instReviews.length).toFixed(1)),
        feeTransparency: parseFloat((dimSum.feeTransparency / instReviews.length).toFixed(1)),
        batchManagement: parseFloat((dimSum.batchManagement / instReviews.length).toFixed(1)),
        valueForMoney: parseFloat((dimSum.valueForMoney / instReviews.length).toFixed(1))
      };
      saveStored(STORAGE_INSTITUTES, this.institutes);
    }

    return newReview;
  }

  async voteHelpful(reviewId: string): Promise<{ success: boolean; newCount: number }> {
    const rev = this.reviews.find((r) => r.id === reviewId);
    if (!rev) return { success: false, newCount: 0 };

    if (!rev.hasVotedHelpful) {
      rev.helpfulCount += 1;
      rev.hasVotedHelpful = true;
    } else {
      rev.helpfulCount = Math.max(0, rev.helpfulCount - 1);
      rev.hasVotedHelpful = false;
    }
    saveStored(STORAGE_REVIEWS, this.reviews);
    return { success: true, newCount: rev.helpfulCount };
  }

  async reportReview(reviewId: string, reason: string, explanation?: string): Promise<boolean> {
    console.log(`Review ${reviewId} reported for ${reason}. Explanation: ${explanation}`);
    return true;
  }

  async getReviewsByStudent(studentEmail: string): Promise<Review[]> {
    return this.reviews.filter((r) => r.studentId === studentEmail);
  }

  async editReview(
    reviewId: string,
    updates: {
      overallRating: number;
      dimensions: DimensionRatings;
      writtenReview: string;
    }
  ): Promise<Review | null> {
    const rev = this.reviews.find((r) => r.id === reviewId);
    if (!rev) return null;

    rev.overallRating = updates.overallRating;
    rev.dimensions = updates.dimensions;
    rev.writtenReview = updates.writtenReview;
    rev.createdAt = new Date().toISOString(); // update timestamp on edit

    saveStored(STORAGE_REVIEWS, this.reviews);

    // Recalculate institute ratings
    this._recalcInstituteRating(rev.instituteId);

    return rev;
  }

  async deleteReview(reviewId: string): Promise<boolean> {
    const rev = this.reviews.find((r) => r.id === reviewId);
    if (!rev) return false;

    const instituteId = rev.instituteId;
    this.reviews = this.reviews.filter((r) => r.id !== reviewId);
    saveStored(STORAGE_REVIEWS, this.reviews);

    // Recalculate institute ratings after deletion
    this._recalcInstituteRating(instituteId);

    return true;
  }

  private _recalcInstituteRating(instituteId: string): void {
    const inst = this.institutes.find((i) => i.id === instituteId);
    if (!inst) return;

    const instReviews = this.reviews.filter((r) => r.instituteId === instituteId);
    inst.reviewCount = instReviews.length;

    if (instReviews.length === 0) {
      inst.overallRating = null;
      inst.dimensionAverages = null;
    } else {
      const sumRating = instReviews.reduce((acc, r) => acc + r.overallRating, 0);
      inst.overallRating = parseFloat((sumRating / instReviews.length).toFixed(1));

      const dimSum: DimensionRatings = {
        facultyQuality: 0,
        studyMaterial: 0,
        doubtSupport: 0,
        feeTransparency: 0,
        batchManagement: 0,
        valueForMoney: 0
      };
      instReviews.forEach((r) => {
        dimSum.facultyQuality += r.dimensions.facultyQuality;
        dimSum.studyMaterial += r.dimensions.studyMaterial;
        dimSum.doubtSupport += r.dimensions.doubtSupport;
        dimSum.feeTransparency += r.dimensions.feeTransparency;
        dimSum.batchManagement += r.dimensions.batchManagement;
        dimSum.valueForMoney += r.dimensions.valueForMoney;
      });
      inst.dimensionAverages = {
        facultyQuality: parseFloat((dimSum.facultyQuality / instReviews.length).toFixed(1)),
        studyMaterial: parseFloat((dimSum.studyMaterial / instReviews.length).toFixed(1)),
        doubtSupport: parseFloat((dimSum.doubtSupport / instReviews.length).toFixed(1)),
        feeTransparency: parseFloat((dimSum.feeTransparency / instReviews.length).toFixed(1)),
        batchManagement: parseFloat((dimSum.batchManagement / instReviews.length).toFixed(1)),
        valueForMoney: parseFloat((dimSum.valueForMoney / instReviews.length).toFixed(1))
      };
    }

    saveStored(STORAGE_INSTITUTES, this.institutes);
  }

  // --- INSTITUTE DASHBOARD APIS ---
  async getStudentAssociations(instituteId: string): Promise<StudentAssociation[]> {
    return this.associations.filter((a) => a.instituteId === instituteId);
  }

  async addStudentAssociation(data: {
    instituteId: string;
    studentEmail: string;
    studentName?: string;
    courseName: string;
    batchYear: string;
  }): Promise<StudentAssociation> {
    const newAssoc: StudentAssociation = {
      id: 'assoc-' + Date.now(),
      instituteId: data.instituteId,
      studentEmail: data.studentEmail,
      studentName: data.studentName || 'Student Aspirant',
      courseName: data.courseName,
      batchYear: data.batchYear,
      status: 'active',
      addedAt: new Date().toISOString()
    };
    this.associations.unshift(newAssoc);
    saveStored(STORAGE_ASSOCS, this.associations);
    return newAssoc;
  }

  async toggleAssociationStatus(associationId: string): Promise<StudentAssociation | null> {
    const item = this.associations.find((a) => a.id === associationId);
    if (item) {
      item.status = item.status === 'active' ? 'inactive' : 'active';
      saveStored(STORAGE_ASSOCS, this.associations);
    }
    return item || null;
  }

  async respondToReview(reviewId: string, responseText: string, officialRole: string): Promise<Review | null> {
    const rev = this.reviews.find((r) => r.id === reviewId);
    if (rev) {
      rev.instituteResponse = {
        responseText,
        respondedAt: new Date().toISOString(),
        officialRole
      };
      saveStored(STORAGE_REVIEWS, this.reviews);
    }
    return rev || null;
  }

  async submitVerificationDocs(docData: Omit<VerificationDocument, 'id' | 'submittedAt' | 'status'>): Promise<VerificationDocument> {
    const existingIndex = this.verificationDocs.findIndex((d) => d.instituteId === docData.instituteId);
    const newDoc: VerificationDocument = {
      ...docData,
      id: 'doc-' + Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    if (existingIndex >= 0) {
      this.verificationDocs[existingIndex] = newDoc;
    } else {
      this.verificationDocs.push(newDoc);
    }
    saveStored(STORAGE_DOCS, this.verificationDocs);

    // Update institute status to pending
    const inst = this.institutes.find((i) => i.id === docData.instituteId);
    if (inst) {
      inst.verificationStatus = 'pending';
      inst.verificationSubmittedAt = newDoc.submittedAt;
      saveStored(STORAGE_INSTITUTES, this.institutes);
    }

    return newDoc;
  }

  async getVerificationDoc(instituteId: string): Promise<VerificationDocument | null> {
    return this.verificationDocs.find((d) => d.instituteId === instituteId) || null;
  }
}

export const api = new EduMatchApiService();

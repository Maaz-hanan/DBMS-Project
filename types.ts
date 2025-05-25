
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string; // YYYY-MM-DD
  major: string;
  enrollmentYear: number;
  avatarUrl?: string; 
}

export type ModalType = 'add' | 'edit' | null;

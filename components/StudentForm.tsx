
import React, { useState, useEffect } from 'react';
import { Student } from '../types';
import Button from './Button';

interface StudentFormProps {
  student?: Student | null;
  onSubmit: (student: Omit<Student, 'id'> | Student) => void;
  onCancel: () => void;
  isEditMode: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onSubmit, onCancel, isEditMode }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    major: '',
    enrollmentYear: new Date().getFullYear(),
    avatarUrl: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        dateOfBirth: student.dateOfBirth,
        major: student.major,
        enrollmentYear: student.enrollmentYear,
        avatarUrl: student.avatarUrl || '',
      });
    } else {
      // Reset for new student
       setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        major: '',
        enrollmentYear: new Date().getFullYear(),
        avatarUrl: '',
      });
    }
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'enrollmentYear' ? parseInt(value, 10) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.dateOfBirth || !formData.major) {
        alert('Please fill in all required fields: First Name, Last Name, Email, Date of Birth, Major.');
        return;
    }
    if (isEditMode && student) {
      onSubmit({ ...student, ...formData });
    } else {
      onSubmit(formData);
    }
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className={inputClass} required />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="major" className="block text-sm font-medium text-gray-700">Major</label>
          <input type="text" name="major" id="major" value={formData.major} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="enrollmentYear" className="block text-sm font-medium text-gray-700">Enrollment Year</label>
          <input type="number" name="enrollmentYear" id="enrollmentYear" value={formData.enrollmentYear} onChange={handleChange} className={inputClass} min="1900" max={new Date().getFullYear() + 5} required />
        </div>
      </div>
       <div>
        <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">Avatar URL (Optional)</label>
        <input type="url" name="avatarUrl" id="avatarUrl" value={formData.avatarUrl} onChange={handleChange} className={inputClass} placeholder="https://example.com/avatar.png" />
      </div>
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant={isEditMode ? "primary" : "accent"}>
          {isEditMode ? 'Save Changes' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;

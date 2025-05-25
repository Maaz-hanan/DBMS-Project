
import React from 'react';
import { Student } from '../types';
import StudentListItem from './StudentListItem';

interface StudentListProps {
  students: Student[];
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onEditStudent, onDeleteStudent }) => {
  if (students.length === 0) {
    return <p className="text-center text-gray-500 py-8">No students found. Add a new student to get started!</p>;
  }

  return (
    <div className="shadow-lg overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Major
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Enrollment Year
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <StudentListItem
              key={student.id}
              student={student}
              onEdit={onEditStudent}
              onDelete={onDeleteStudent}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;

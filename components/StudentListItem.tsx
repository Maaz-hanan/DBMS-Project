
import React from 'react';
import { Student } from '../types';
import Button from './Button';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import UserCircleIcon from './icons/UserCircleIcon';


interface StudentListItemProps {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

const StudentListItem: React.FC<StudentListItemProps> = ({ student, onEdit, onDelete }) => {
  return (
    <tr className="bg-white hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        <div className="flex items-center">
          {student.avatarUrl ? (
            <img className="h-10 w-10 rounded-full object-cover" src={student.avatarUrl} alt={`${student.firstName} ${student.lastName}`} />
          ) : (
            <UserCircleIcon className="h-10 w-10 text-gray-400" />
          )}
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{student.firstName} {student.lastName}</div>
            <div className="text-sm text-gray-500">{student.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.major}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.enrollmentYear}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit(student)} aria-label={`Edit ${student.firstName}`}>
          <PencilIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(student.id)} aria-label={`Delete ${student.firstName}`}>
          <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-700" />
        </Button>
      </td>
    </tr>
  );
};

export default StudentListItem;


import React, { useState, useEffect, useCallback } from 'react';
import { Student, ModalType } from './types';
import { generateId } from './utils';
import Header from './components/Header';
import Footer from './components/Footer';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import Modal from './components/Modal';
import Button from './components/Button';
import PlusIcon from './components/icons/PlusIcon';
import ConfirmationDialog from './components/ConfirmationDialog';

const initialStudentsData: Student[] = [
  { id: generateId(), firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', dateOfBirth: '2002-05-15', major: 'Computer Science', enrollmentYear: 2020, avatarUrl: `https://picsum.photos/seed/alice/100/100` },
  { id: generateId(), firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com', dateOfBirth: '2001-08-22', major: 'Electrical Engineering', enrollmentYear: 2019, avatarUrl: `https://picsum.photos/seed/bob/100/100` },
  { id: generateId(), firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com', dateOfBirth: '2003-01-10', major: 'Business Administration', enrollmentYear: 2021, avatarUrl: `https://picsum.photos/seed/charlie/100/100` },
  { id: generateId(), firstName: 'Diana', lastName: 'Prince', email: 'diana.prince@example.com', dateOfBirth: '2002-11-05', major: 'History', enrollmentYear: 2020 }, // No avatar
];


const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  useEffect(() => {
    // Simulate fetching data or load from local storage
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    } else {
      setStudents(initialStudentsData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleOpenModal = useCallback((type: ModalType, student?: Student) => {
    setModalType(type);
    setCurrentStudent(student || null);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalType(null);
    setCurrentStudent(null);
  }, []);

  const handleFormSubmit = useCallback((studentData: Omit<Student, 'id'> | Student) => {
    if ('id' in studentData) { // Editing existing student
      setStudents(prevStudents =>
        prevStudents.map(s => (s.id === studentData.id ? { ...s, ...studentData } : s))
      );
    } else { // Adding new student
      const newStudent: Student = { ...studentData, id: generateId() };
      setStudents(prevStudents => [newStudent, ...prevStudents]);
    }
    handleCloseModal();
  }, [handleCloseModal]);

  const handleDeleteRequest = useCallback((studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      setStudentToDelete(student);
    }
  }, [students]);

  const confirmDeleteStudent = useCallback(() => {
    if (studentToDelete) {
      setStudents(prevStudents => prevStudents.filter(s => s.id !== studentToDelete.id));
      setStudentToDelete(null);
    }
  }, [studentToDelete]);

  const cancelDeleteStudent = useCallback(() => {
    setStudentToDelete(null);
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Student Roster</h2>
          <Button 
            variant="accent" 
            onClick={() => handleOpenModal('add')}
            leftIcon={<PlusIcon className="w-5 h-5"/>}
          >
            Add Student
          </Button>
        </div>
        
        <StudentList
          students={students}
          onEditStudent={(student) => handleOpenModal('edit', student)}
          onDeleteStudent={handleDeleteRequest}
        />
      </main>

      {modalType && (
        <Modal
          isOpen={!!modalType}
          onClose={handleCloseModal}
          title={modalType === 'add' ? 'Add New Student' : 'Edit Student Details'}
          size="lg"
        >
          <StudentForm
            student={currentStudent}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseModal}
            isEditMode={modalType === 'edit'}
          />
        </Modal>
      )}

      {studentToDelete && (
        <ConfirmationDialog
          isOpen={!!studentToDelete}
          onClose={cancelDeleteStudent}
          onConfirm={confirmDeleteStudent}
          title="Confirm Deletion"
          message={
            <p>Are you sure you want to delete student <strong className="font-semibold">{studentToDelete.firstName} {studentToDelete.lastName}</strong>? This action cannot be undone.</p>
          }
        />
      )}
      <Footer />
    </div>
  );
};

export default App;

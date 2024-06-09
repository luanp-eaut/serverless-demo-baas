"use client";

import CallCard from "./CallCard";
import StudentsList from "./StudentsList";
import { useCallback, useState } from "react";
import { useStudents } from "./useStudents";

export default function RollcallPage() {
  const [current, setCurrent] = useState<Student>();
  const [completed, setCompleted] = useState(false);

  const { students, setStudents, updateStudent } = useStudents();

  const handleRollCall = useCallback(
    (presence: boolean) => {
      if (!current) return;
      setStudents((list) =>
        list.map((s) => (s.id === current.id ? { ...s, presence } : s))
      );
      const next = students.find((s) => s.id === current.id + 1);
      if (!next) setCompleted(true);
      else setCurrent(next);
    },
    [current, setStudents, students]
  );

  const handleSelect = useCallback(
    (s: Student) => {
      setCurrent(s);
      if (completed) setCompleted(false);
    },
    [completed]
  );

  return (
    <main className="w-full h-full flex space-x-1 text-center items-center justify-center animate-fadeIn animation-delay-2">
      <StudentsList
        students={students}
        current={current}
        select={handleSelect}
      />
      <CallCard
        student={current}
        rollCall={handleRollCall}
        completed={completed}
      />
    </main>
  );
}

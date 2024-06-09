"use client";

import FirebaseConfig from "@/firebase/FirebaseConfig";
import CallCard from "./CallCard";
import StudentsList from "./StudentsList";
import { ref, get, set, update, remove, child } from "firebase/database";
import { useCallback, useEffect, useState } from "react";

const database = FirebaseConfig();

export default function RollcallPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [current, setCurrent] = useState<Student>();
  const [completed, setCompleted] = useState(false);

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
    [current, students]
  );

  const handleSelect = useCallback(
    (s: Student) => {
      setCurrent(s);
      if (completed) setCompleted(false);
    },
    [completed]
  );

  useEffect(() => {
    const dbref = ref(database);
    get(child(dbref, "students"))
      .then((snapshot) => {
        const result = snapshot.val();
        const data = result.map(
          (v: Omit<Student, "id" | "presence">, i: number) => {
            return { id: i, ...v, presence: true };
          }
        );
        setStudents(data);
        setCurrent(data[0]);
      })
      .catch((err) => {
        console.log(err);
        alert("Error occured while getting data!");
      });
  }, []);

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

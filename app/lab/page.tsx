"use client";

import StudentsList from "@/components/StudentsList";
import { useStudents } from "@/components/hooks/useStudents";
import { useEffect, useState } from "react";
import { Excercise, Excercises } from "./Excercises";
import { SolutionView } from "./SolutionView";
import { ExerciseView } from "./ExerciseView";

export default function LabPage() {
  const [student, setStudent] = useState<Student>();
  const [exercise, setExercise] = useState<Excercise>();
  const [content, setContent] = useState<"solution" | "exercise">();
  const { students } = useStudents();

  useEffect(() => {
    if (content === "exercise") setStudent(undefined);
  }, [content]);

  return (
    <main className="w-full h-full flex space-x-1 text-center items-center justify-center animate-fadeIn animation-delay-2">
      <StudentsList
        students={students}
        current={student}
        select={setStudent}
        setContent={setContent}
      />
      <div className="flex flex-grow">
        {content === "solution" ? (
          <SolutionView s={student} />
        ) : content === "exercise" ? (
          <ExerciseView url={exercise?.link} />
        ) : (
          <SolutionView />
        )}
      </div>
      <Excercises
        onSelected={setExercise}
        setContent={setContent}
        current={exercise}
      />
    </main>
  );
}

"use client";

import { Dispatch, useCallback } from "react";

type Props = {
  students: Student[];
  current?: Student;
  select: (s: Student) => void;
  setContent?: Dispatch<"solution" | "exercise">;
};

export default function StudentsList({
  students,
  current,
  select,
  setContent,
}: Props) {
  const handleSelect = useCallback(
    (s: Student) => {
      select(s);
      if (setContent) setContent("solution");
    },
    [select, setContent]
  );

  return (
    <div className="h-full w-1/5 bg-slate-200 dark:bg-slate-950 overflow-auto">
      <ul className="w-full flex flex-col items-start px-3 py-2 space-y-1">
        {students.map((s, index) => {
          return (
            <li
              key={index}
              className={`w-full hover:cursor-pointer flex justify-between ${
                current?.id === index ? "font-bold" : ""
              }`}
              onClick={() => handleSelect(s)}
            >
              <div>{s.fullname}</div>
              {s.presence ? "" : <div>x</div>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

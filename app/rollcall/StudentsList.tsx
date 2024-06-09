import { Dispatch } from "react";

type Props = {
  students: Student[];
  current?: Student;
  select: (s: Student) => void;
};

export default function StudentsList({ students, current, select }: Props) {
  return (
    <div className="h-full w-1/5 bg-slate-500 overflow-auto">
      <ul className="w-full flex flex-col items-start px-3 py-2 space-y-1">
        {students.map((s, index) => {
          return (
            <li
              key={index}
              className={`w-full hover:cursor-pointer flex justify-between ${
                current?.id === index ? "font-bold" : ""
              }`}
              onClick={() => select(s)}
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

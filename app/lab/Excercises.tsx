import { Dispatch, useCallback, useEffect, useState } from "react";
import { useExercises } from "./useExercises";

export type Excercise = {
  title: string;
  link: string;
};

type Props = {
  onSelected: Dispatch<Excercise>;
  setContent: Dispatch<"solution" | "exercise">;
  current?: Excercise;
};

export const Excercises = ({ onSelected, setContent, current }: Props) => {
  const [exercises, setExercises] = useState<Excercise[]>([]);
  const { exercises: exerciseLinks } = useExercises();

  useEffect(() => {
    const result = exerciseLinks.map((url, index) => ({
      title: `Bài tập ${index + 1}`,
      link: url,
    }));
    setExercises(result);
  }, [exerciseLinks]);

  const handleSelect = useCallback(
    (item: Excercise) => {
      setContent("exercise");
      onSelected(item);
    },
    [onSelected, setContent]
  );

  return (
    <div className="h-full w-1/5 bg-slate-100 dark:bg-slate-700 overflow-auto">
      <ul className="w-full flex flex-col items-start">
        {exercises.map((item, index) => (
          <li
            key={index}
            className={`hover:bg-slate-200 hover:cursor-pointer w-full text-left px-3 py-1 ${
              current?.title === item.title ? "font-bold" : ""
            }`}
            onClick={() => handleSelect(item)}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

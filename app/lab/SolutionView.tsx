export const SolutionView = ({ s }: { s?: Student }) => {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="m-auto font-bold text-2xl">
        {s === undefined
          ? "Nội dung bài tập/lời giải"
          : `Lời giải của ${s.fullname}`}
      </div>
    </div>
  );
};

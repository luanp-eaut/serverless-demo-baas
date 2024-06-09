type Props = {
  student?: Student;
  rollCall: (presence: boolean) => void;
  completed: boolean;
};

export default function CallCard({ student, rollCall, completed }: Props) {
  return (
    <div className="flex flex-grow h-full bg-green-200">
      {student && !completed && (
        <div className="flex flex-col space-y-20 m-auto items-center">
          <h1 className="text-7xl font-bold">{student.fullname}</h1>
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[200px]"
              onClick={() => rollCall(true)}
            >
              Có
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-[200px]"
              onClick={() => rollCall(false)}
            >
              Không
            </button>
          </div>
        </div>
      )}
      {completed && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[200px]  m-auto"
          onClick={() => rollCall(true)}
        >
          Hoàn thành
        </button>
      )}
    </div>
  );
}

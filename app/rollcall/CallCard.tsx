import QRCode from "react-qr-code";

type Props = {
  student?: Student;
  rollCall: (presence: boolean) => void;
  completed: boolean;
};

export default function CallCard({ student, rollCall, completed }: Props) {
  return (
    <div className="flex flex-grow h-full">
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
      {completed && <h1 className="text-7xl font-bold m-auto">Hoàn thành</h1>}
      {!student && (
        <div className="flex m-auto">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={"Scan me to make a rollcall"}
            viewBox={`0 0 256 256`}
          />
        </div>
      )}
    </div>
  );
}

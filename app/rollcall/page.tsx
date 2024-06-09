export default function RollcallPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl ">
      <div className="flex flex-col text-center items-center justify-center animate-fadeIn animation-delay-2 my-10 py-16 sm:py-32 md:py-48 md:flex-row md:space-x-4 md:text-left">
        <div className="flex flex-col space-y-10">
          <h1 className="text-4xl font-bold mt-6 md:mt-0 md:text-7xl">
            Nguyễn Văn An
          </h1>
          <div className="flex space-x-2 w-full">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2">
              Có
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/2">
              Không
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

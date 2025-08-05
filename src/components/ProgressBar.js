const ProgressBar = ({ count, animation }) => {
  const totalSteps = 10; // (10 dots total)
  return (
    <div
      className={`flex w-full items-center justify-between relative py-1.5
      transition-all duration-700 ease-in-out 
        `}
      //         ${
      //   animation ? "translate-x-0 blur-none" : "-translate-y-15 blur-xs"
      // }
    >
      {/* Line connecting all dots at the back-ground */}
      <div className="absolute h-1 bg-pale-sky left-0 right-0 top-1/2 transform -translate-y-1/2 z-0">
        <div
          style={{ width: `${count <= totalSteps && (count - 1) * 11}%` }}
          className="!bg-blue-slate h-full"
        />
      </div>

      {/* Dots 10 */}
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`size-3 rounded-full z-10 transition-all duration-300 ease-out flex items-center justify-center
                ${index + 1 <= count ? "bg-blue-slate" : "bg-pale-sky"}`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;

export const Balance = ({ balance, handleClick }) => {
  return (
    <div className="flex items-center px-10 py-7 font-semibold text-xl" onClick={handleClick}>
      <div className="">Balance:</div>
      <div className="pl-2">₹{balance}</div>
    </div>
  );
};

import React from "react";

interface ButtonComponentProps{
  text:string,
  onClick:(event:React.MouseEvent<HTMLButtonElement>)=>void
}

const ButtonComponent:React.FC<ButtonComponentProps> = ({ text, onClick }) => {
  return <button className="bg-slate-800 w-full mt-6 rounded-lg font-semibold text-white py-2 hover:bg-slate-900" onClick={onClick} type="button">{text}</button>;
};

export default ButtonComponent;

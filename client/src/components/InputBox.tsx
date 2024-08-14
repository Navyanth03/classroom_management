import React from "react"

interface InputBoxProps {
    value:string,
    title:string,
    placeholder:string,
    type?:string,
    onChange:(event: React.ChangeEvent<HTMLInputElement>)=>void
}

const InputBox:React.FC<InputBoxProps> = ({value, title, placeholder, type, onChange}) => {
    return <div className="mb-2">
        <label className="pt-3 font-semibold" htmlFor={title}>{title}</label>
        <input onChange={onChange} id={title} value={value} className="mt-1 font-medium px-2 py-1 rounded outline-2 outline-gray-300 outline w-full" type={type}  placeholder={placeholder}/>
    </div>
}

export default InputBox;
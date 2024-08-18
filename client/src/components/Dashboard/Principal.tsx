import { useNavigate } from "react-router-dom";
import Header from "../Header";

const Principal=()=>{
    const navigate=useNavigate();
    return(
        <div>
            <Header/>
            <div className="flex gap-2 mt-2 ml-2">
                <div onClick={()=>navigate('/signup/teacher')} className="border-2 border-slate-600 bg-slate-600 rounded-sm px-2 py-1 cursor-pointer">Create Teacher</div>
                <div onClick={()=>navigate('/signup/student')} className="border-2 border-slate-600 bg-slate-600 rounded-sm px-2 py-1 cursor-pointer">Create Student</div>
                <div onClick={()=>navigate('/signup/teacher')} className="border-2 border-slate-600 bg-slate-600 rounded-sm px-2 py-1 cursor-pointer">Create Classroom</div>
            </div>
        </div>
    )
}

export default Principal;
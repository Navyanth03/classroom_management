import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Landing=()=>{
    const navigate=useNavigate();
    return(
        <div className="flex flex-col min-h-screen">
            <div className="flex justify-between bg-black items-center">
                <Header/>
                <div className="text-white mr-4 hover:cursor-pointer" onClick={()=>(navigate('/signin'))}>Login</div>
            </div>
            <div className="flex flex-col flex-grow bg-slate-500 justify-center items-center">
                <div className="text-4xl pb-4">Educom</div>
                <div className="text-2xl">A one stop solution for managing your school</div>
            </div>
            <Footer/>
        </div>
    )
}

export default Landing;
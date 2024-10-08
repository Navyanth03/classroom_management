import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
import InputBox from '../components/InputBox';
import ButtonComponent from '../components/ButtonComponent';

const SignIn= () => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>("PRINCIPAL");

  const [err,setErr]=useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    async function isLoggedIn(){
      const response=await axios.get('https://classroom-management-server.onrender.com/api/v1/user/auth',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      const level:string=response.data.level;
      console.log(level);
      if(level!=null){
        navigate('/dashboard')
      }
    }
    isLoggedIn();
  },[])

  const handleSignIn = async() => {
    try {
      const data=await axios.post('https://classroom-management-server.onrender.com/api/v1/user/signin',{
        userName,
        password,
        role
      })
      setErr(false);
      localStorage.setItem('token',data.data.token);
      navigate('/dashboard');
    } catch (error) {
      setErr(true); 
    }

  };

  return (
    <div>
      {/* <Header/> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e)=>setRole(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="PRINCIPAL">Principal</option>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </div>
          <InputBox
            value={userName}
            title="email"
            placeholder="Email"
            type="email"
            onChange={(e) => setUserName(e.target.value)}
          />
          <InputBox
            value={password}
            title="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonComponent text="Sign In" onClick={handleSignIn}/>
          {err
          ?  <div>Enter valid Credentials</div>
          :  null
          }
          {role==="PRINCIPAL" && <div className='text-center mt-4 bg-slate-500 p-1 rounded-sm'>email : principal@classroom.com , Passwordddd : Admin</div>}
        </div>
      </div>
    </div>

  );
};

export default SignIn;

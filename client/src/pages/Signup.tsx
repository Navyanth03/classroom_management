import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox';
import ButtonComponent from '../components/ButtonComponent'
import axios from 'axios';

const SignUp= () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [err,setErr]=useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response=await axios.post('https://classroom-management-server.onrender.com/api/v1/user/signup',{
        userName,password
      })
      setErr(false);
      localStorage.setItem('token',response.data.token);
      navigate('/');
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
        <InputBox
          value={firstName}
          title="firstName"
          placeholder="John"
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
        />        
        <InputBox
          value={lastName}
          title="lastName"
          placeholder="Doe"
          type="text"
          onChange={(e) => setLastName(e.target.value)}
        />
        <ButtonComponent text="Sign Up" onClick={handleSignUp}/>
        {err
        ?  <div>Enter valid Credentials</div>
        :  null
        }
      </div>
    </div>
  );
};

export default SignUp;

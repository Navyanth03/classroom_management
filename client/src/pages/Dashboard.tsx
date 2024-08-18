import axios from 'axios';
import { useEffect, useState } from 'react';
import Principal from '../components/Dashboard/Principal';
import Teacher from '../components/Dashboard/Teacher';
import Student from '../components/Dashboard/Student';
import { useNavigate } from 'react-router-dom';


const Dashboard= () => {
  const navigate=useNavigate();
  const [level,setLevel]=useState<number>();
  const [isLoading,setIsLoading]=useState<boolean>(true);
  useEffect(()=>{
    async function DB(){
      try {
        const res=await axios.get('https://classroom-management-server.onrender.com/api/v1/user/auth',{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setLevel(res.data.level);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate('/signin');
      }
    }
    DB();
  },[])

  if(isLoading){
    return (
      <div className='flex justify-center min-h-screen items-center'>
        <div>Loading....</div>
      </div>
    )
  }

  if(level===0){
    return(
      <Principal/>
    )
  }else if(level===1){
    return(
      <Teacher/>
    )
  }else if(level===2){
    return(
      <Student/>
    )
  }


}

export default Dashboard;
import axios from 'axios';
import { useEffect, useState } from 'react';


const Dashboard= () => {
  const [teachers,setTeachers]=useState<any>([]);
  const [students,setStudents]=useState<any>([]);
  useEffect(()=>{
    async function DB(){
      try {
        const response1=await axios.get('https://classroom-management-server.onrender.com/api/v1/get/teachers',{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTeachers(response1.data.teachers);
        const response2=await axios.get('https://classroom-management-server.onrender.com/api/v1/get/students',{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response1,response2);
        setStudents(response2.data.students);
      } catch (error) {
        console.log(error);
      }
    }
    DB();
  },[])
  return(
    <div>
      hsdshdsd
      {teachers.map((val:any)=><div>Teacher:{val.id}</div>)}
      {students.map((val:any)=><div>Student:{val.id}</div>)}
    </div>
  )
}

export default Dashboard;
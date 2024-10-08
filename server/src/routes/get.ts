import express, { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/middleware';
import CustomRequest from '../interfaces/interface';
const prisma=new PrismaClient();

const router = express.Router();

router.use(express.json());

router.get('/principals',authMiddleware, async (req: CustomRequest, res: Response) => {
  const userDB=await prisma.user.findFirst({
    where:{
      userName:req.userName
    }
  })
  if(!userDB)return res.status(404).json({msg:"User not found"});
  const role=userDB.role
  if(role==='PRINCIPAL'){
    const principals=await prisma.principal.findMany({
      where:{}
    })
  return res.status(200).json({principals});
  }
  return res.status(404).json({msg:"cannot access"});
});

router.get('/teachers',authMiddleware, async (req: CustomRequest, res: Response) => {
  const userDB=await prisma.user.findFirst({
    where:{
      userName:req.userName
    }
  })
  if(!userDB)return res.status(404).json({msg:"User not found"});
  const role=userDB.role
  if(role==='PRINCIPAL'){
    const teachers=await prisma.teacher.findMany({
      where:{}
    })
  return res.status(200).json({teachers});
  }
  return res.status(404).json({msg:"cannot access"});
});

router.get('/students',authMiddleware, async (req: CustomRequest, res: Response) => {
  const userDB=await prisma.user.findFirst({
    where:{
      userName:req.userName
    }
  })
  if(!userDB)return res.status(404).json({msg:"User not found"});
  const students=await prisma.student.findMany({
    where:{}
  })
  return res.status(200).json({students});
});

router.get('/classroom',authMiddleware, async (req: CustomRequest, res: Response) => {
  const userDB=await prisma.user.findFirst({
    where:{
      userName:req.userName
    }
  })
  if(!userDB)return res.status(404).json({msg:"User not found"});
  const role=userDB.role
  if(role==='PRINCIPAL'){
    const classrooms=await prisma.classroom.findMany({
      where:{}
    })
  return res.status(200).json({classrooms});
  }
  return res.status(404).json({msg:"cannot access"});
});

router.get('/all',authMiddleware,async(req:CustomRequest,res:Response)=>{
  const DB=await prisma.classroom.findMany({
    include:{
      Teacher:{
        include:{
          User:{
            select:{
              id:true,
              userName:true,
              firstName:true,
              lastName:true,
              role:true
            }
          },
          Students:{
            include:{
              User:{
                select:{
                  id:true,
                  userName:true,
                  firstName:true,
                  lastName:true,
                  role:true
                }
              }
            }
          }
        }
      }
    }
  })
  const idleClassrooms=await prisma.classroom.findMany({
    where:{
      teacherId:null
    }
  })
  
  const idleStudents=await prisma.student.findMany({
    where:{
      teacherId:null
    }
  })
  res.status(200).json({msg:"success",DB,idleClassrooms,idleStudents});
})

export default router;
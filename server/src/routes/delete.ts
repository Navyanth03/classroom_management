import express, { Request, Response } from 'express';
import { z, ZodSchema } from 'zod';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/middleware';
import CustomRequest from '../interfaces/interface';
const prisma=new PrismaClient();

const router = express.Router();

router.use(express.json());

const deleteSchema:ZodSchema= z.object({
    id: z.number()
})
  
router.delete('/teacher',authMiddleware,async(req:CustomRequest,res:Response)=>{
  const parseResult = deleteSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(411).json("Incorrect inputs");
  }
  const { id } = parseResult.data;
  const userDB=await prisma.user.findFirst({
    where:{
      userName:req.userName
    }
  })
  if(!userDB)return res.status(404).json({msg:"User not found"});
  const role=userDB.role
  if(role==='PRINCIPAL'){
      try {
          const teacherDB=await prisma.teacher.findFirst({
            where:{
                id
            }
          })
          if(!teacherDB)return res.status(404).json({msg:"teacher not found"});
          const {userId}=teacherDB;
          const deletedTeacher=await prisma.user.delete({
              where:{
                id:userId
              }
            })
          return res.status(200).json({deletedTeacher});
      } catch (error) {
          return res.status(400).json("error occured while deleting teacher");
      }
  }
  return res.status(404).json({msg:"you don't have access to delete"});
})
  
router.delete('/student',authMiddleware,async(req:CustomRequest,res:Response)=>{
  const parseResult = deleteSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(411).json("Incorrect inputs");
  }
  const { id } = parseResult.data;
  const userDB=await prisma.user.findFirst({
    where:{
      userName:req.userName
    }
  })
  if(!userDB)return res.status(404).json({msg:"User not found"});
  const role=userDB.role
  if(role==='PRINCIPAL' || role==='TEACHER'){
      try {
          const studentDB=await prisma.student.findFirst({
            where:{
                id
            }
          })
          if(!studentDB)return res.status(404).json({msg:"Student not found"});
          const {userId}=studentDB;
          const deletedStudent=await prisma.user.delete({
              where:{
                id:userId
              }
            })
          return res.status(200).json({deletedStudent});
      } catch (error) {
          return res.status(400).json("error occured while deleting student");
      }
  }
  return res.status(404).json({msg:"you don't have access to delete"});
})
  
router.delete('/classroom',authMiddleware,async(req:CustomRequest,res:Response)=>{
  const parseResult = deleteSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(411).json("Incorrect inputs");
  }
  const { id } = parseResult.data;
  const userDB=await prisma.user.findFirst({
    where:{
      userName:req.userName
    }
  })
  if(!userDB)return res.status(404).json({msg:"User not found"});
  const role=userDB.role;
  if(role==='PRINCIPAL'){
      try {
          const deletedClassroom=await prisma.classroom.delete({
              where:{id}
            })
          return res.status(200).json({deletedClassroom});
      } catch (error) {
          return res.status(400).json("error occured while deleting classroom");
      }
  }
  return res.status(404).json({msg:"you don't have access to delete"});
})


export default router;
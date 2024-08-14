import express, { Request, Response } from 'express';
import { z, ZodSchema } from 'zod';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/middleware';
import CustomRequest from '../interfaces/interface';
const prisma=new PrismaClient();

const router = express.Router();

router.use(express.json());

// editing teacher is nothing but editing classroom, as teachers key will be stored in classroom and teacher does not have key regarding classroom so we can use the same call by doing some work in fe or else lets create a separate route which will do the same but finds the classroom that is related to teacher and then updates the classroom to the mentioned one or null

const updateStudentSchema=z.object({
    id:z.number(),
    teacherId:z.number()
})

router.post('/student',authMiddleware, async (req: CustomRequest, res: Response) => {
  const parseResult = updateStudentSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(411).json("Incorrect inputs");
  }
  const { id, teacherId } = parseResult.data;
  const userDB=await prisma.user.findFirst({
    where:{
      userName:req.userName
    }
  })
  if(!userDB)return res.status(404).json({msg:"User not found"});
  const role=userDB.role;
  if(role==='PRINCIPAL' || role==='TEACHER'){
    try {
        const updatedStudent = await prisma.student.update({
          where:{ id },
          data:{
            ...(teacherId !== undefined && { teacherId })
          }
        })
        return res.status(201).json({ updatedStudent });
      } catch (error) {
        return res.status(411).json("Error updating student");
      }
  }
  return res.status(404).json("unauthorized access");
});

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

const updateClassroomSchema: ZodSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  startTime: timeSchema.transform((val)=>timeToMinutes(val)).optional(),
  endTime:timeSchema.transform((val)=>timeToMinutes(val)).optional(),
  teacherId: z.number().optional()
}).refine(data => {
  if (data.startTime !== undefined && data.endTime !== undefined) {
    return data.startTime < data.endTime;
  }
  return true;
},{
  message: "startTime must be earlier than endTime",
  path: ["startTime"], 
});

router.post('/classroom',authMiddleware, async (req: CustomRequest, res: Response) => {
  const parseResult = updateClassroomSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(411).json("Incorrect inputs");
  }
  const { id,name,startTime,endTime,teacherId } = parseResult.data;
  const userDB=await prisma.user.findFirst({
    where:{
      userName:req.userName
    }
  })
  if(!userDB)return res.status(404).json({msg:"User not found"});
  const role=userDB.role;
  if(role==='PRINCIPAL'){
    try {
        const updatedClassroom = await prisma.classroom.update({
          where:{ id },
          data:{
            ...(name && { name }),
            ...(startTime !== undefined && { startTime }),
            ...(endTime !== undefined && { endTime }),
            ...(teacherId !== undefined && { teacherId })
          }
        })
        return res.status(201).json({ updatedClassroom });
      } catch (error) {
        return res.status(411).json("Error updating classroom");
      }
  }
  return res.status(404).json("unauthorized access");
});

export default router;
import express, { Request, Response } from 'express';
import { z, ZodSchema } from 'zod';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/middleware';
import CustomRequest from '../interfaces/interface';
const prisma=new PrismaClient();

const router = express.Router();

router.use(express.json());

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);

const createClassroomSchema: ZodSchema = z.object({
  name: z.string(),
  startTime: timeSchema.transform((val)=>timeToMinutes(val)),
  endTime:timeSchema.transform((val)=>timeToMinutes(val)),
  teacherId: z.number().optional()
  }).refine(data => {
  return data.startTime<data.endTime;
  },{
  message: "startTime must be earlier than endTime",
  path: ["startTime"], 
});

router.post('/create',authMiddleware, async (req: CustomRequest, res: Response) => {
  const parseResult = createClassroomSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(411).json("already taken / Incorrect inputs");
  }
  const userDB=await prisma.user.findFirst({
    where:{
      userName:req.userName
    }
  })
  if(!userDB)return res.status(404).json({msg:"User not found"});
  const role=userDB.role;
  if(role==='PRINCIPAL'){
    const { name,startTime,endTime,teacherId } = parseResult.data;
    try {
      const newClassroom = await prisma.classroom.create({
        data:{
          name,startTime,endTime,teacherId
        }
      })
      return res.status(201).json({ message: "Classroom created successfully",newClassroom });
    } catch (error) {
      return res.status(411).json({error});
    }
  }
  return res.status(404).json({msg:"unauthorized access"});
});


export default router;

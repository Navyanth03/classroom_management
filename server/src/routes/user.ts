import express, { Request, Response } from 'express';
import { string, z, ZodSchema } from 'zod';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { authMiddleware } from '../middleware/middleware';
import { PrismaClient, Role } from '@prisma/client';
const prisma=new PrismaClient();


const router = express.Router();

router.use(express.json());

const signupSchema: ZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  userName: z.string().email().transform((val)=>val.toLowerCase()),
  password: z.string().min(5),
  role : z.nativeEnum(Role)
});

router.post('/signup',async (req: Request, res: Response) => {
  const parseResult = signupSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(411).json("already taken / Incorrect inputs");
  }
  const { userName, password, firstName, lastName, role } = parseResult.data;
  const userExists = await prisma.user.findFirst({
    where:{
      userName
    }
  })
  console.log(userExists);
  if (userExists) {
    return res.status(411).json("Email already taken / Incorrect inputs");
  }

  try {
    const newUser = await prisma.user.create({
      data:{
        userName,password,firstName,lastName,role
      }
    })
    if(!process.env.JWT_PASSWORD)return res.status(400).json("error");
    const token = jwt.sign({ userName }, process.env.JWT_PASSWORD);
    let level;
    if(role==='PRINCIPAL'){
      level=0;
      await prisma.principal.create({
        data:{
          userId:newUser.id
        }
      })
    }
    else if(role==='TEACHER'){
      level=1;
      await prisma.teacher.create({
        data:{
          userId:newUser.id
        }
      })
    }
    else {
      level=2;
      await prisma.student.create({
        data:{
          userId:newUser.id
        }
      })
    }
    return res.status(201).json({ message: `${role} created successfully`, token, level });
  } catch (error) {
    return res.status(411).json("Error creating user");
  }
});

const signinSchema: ZodSchema = z.object({
  userName: z.string().email().transform((val)=>val.toLowerCase()),
  password: z.string().min(5),
  role : z.nativeEnum(Role)
});

router.post('/signin',async (req: Request, res: Response) => {
  const parseResult = signinSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(411).json('Send valid credentials');
  }

  const { userName, password, role } = parseResult.data;
  const userDB = await prisma.user.findFirst({where:{ userName, password, role }});
  if (!userDB) {
    return res.status(411).json({ message: "Error while logging in" });
  }
  let level;
  if(role==='PRINCIPAL'){
    level=0;
  }
  else if(role==='TEACHER'){
    level=1;
  }
  else {
    level=2;
  }
  if(!process.env.JWT_PASSWORD)return res.status(400).json("error");
  const token = jwt.sign({ userName }, process.env.JWT_PASSWORD);
  return res.status(201).json({ message: `${role} logged successfully`, token, level });
})

interface CustomRequest extends Request {
  userName?: string;
}

router.get('/auth',authMiddleware, async (req: CustomRequest, res: Response) => {
  const userDB=await prisma.user.findFirst({
    where:{
      userName:req.userName
    }
  })
  if(!userDB)return res.status(404).json({msg:"User not found"});
  let level;
  const role=userDB.role
  if(role==='PRINCIPAL'){
    level=0;
  }
  else if(role==='TEACHER'){
    level=1;
  }
  else {
    level=2;
  }
  return res.status(200).json({level});
});



export default router;

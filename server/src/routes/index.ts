import express, { Router } from 'express';
import userRouter from './user';
import classRoomRouter from './classroom';
import getRouter from './get'
import updateRouter from './update'
import deleteRouter from './delete'

const router: Router = express.Router();

router.use('/user', userRouter);
router.use('/classroom', classRoomRouter);
router.use('/get',getRouter);
router.use('/update',updateRouter);
router.use('/delete',deleteRouter);

export default router;

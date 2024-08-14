import { Request } from "express";

interface CustomRequest extends Request {
    userName?: string;
}

export default CustomRequest;
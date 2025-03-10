import { Request ,Response, NextFunction } from "express";
import  Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { resolveObjectURL } from "buffer";
dotenv.config()

interface UserPayload{
    id:number;
    role:"admin" |"principal" |"teacher"
 }

 declare module"express" {
    export interface Request{
        user?: UserPayload
    }
 }

 export const verifyToken=(req:Request, res:Response , next:NextFunction)=>{
    const token = req.header("Authorization")?.split(" ")[1]; // Extract actual token
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified =Jwt.verify(token,process.env.JWT_SECRET as string) as UserPayload
        req.user =verified
        next()
    } catch (error) {
        res.status(400).json({message:"Invalid token"})
    }
 }

export const authorize =(roles:string[])=>{
    return (req:Request, res: Response, next:NextFunction)=>{
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Forbidden" });

        }
        next();
    }
}

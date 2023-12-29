import {Request, Response, NextFunction } from 'express';

import  jwt from "jsonwebtoken";

import config from "../config/index";



const verifyToken = async(req:Request, res:Response , next:NextFunction) :Promise<any> => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token){
        return  res.status(403).send("A token is required for authentication")
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET || '')
        req.user = decoded;
    } catch (error) {
        next(error);
    }

return next();

}

export default verifyToken;
import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      status_code: statusCode,
      message: err.message,
      validation: err.validation,
    },
  });
};

export default errorHandler;

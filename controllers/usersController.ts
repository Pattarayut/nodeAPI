import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "../config/index";
import bcrypt from "bcryptjs";
import User from "../models/User";
import "../auth/passportHandler";

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;

    // validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error: any = new Error("ข้อมูลที่รับมาไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    // check username ซ้ำ
    const existUsername = await User.findOne({ username });
    if (existUsername) {
      const error: any = new Error("อีเมล์ซ้ำ มีผู้ใช้งานแล้ว");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).send({
      message: "ลงทะเบียนเรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { username, password } = req.body;

    // check ว่ามีผู้ใช้งานนี้ในระบบหรือไม่
    const user = await User.findOne({ username });
    if (!user) {
      const error: any = new Error("ไม่พบผู้ใช้งานในระบบ");
      error.statusCode = 404;
      throw error;
    }

    // ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      const error: any = new Error("รหัสผ่านไม่ถูกต้อง");
      error.statusCode = 402;
      throw error;
    }

    // สร้าง token
    const jwtSecret = config.JWT_SECRET || "";
    const token = jwt.sign(
      {
        id: user._id,
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      access_token: token,
      message: "เข้าสู่ระบบ",
    });
  } catch (error) {
    next(error);
  }
};

const list = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const Users = await User.find({}).exec();
    res.status(200).send(Users);
  } catch (error) {
    next(error);
  }
};

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);
    const Users = await new User(req.body).save();
    res.status(200).send(Users);
  } catch (error) {
    next(error);
  }
};

const read = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const Users = await User.find({ _id: id }).exec();
    res.status(200).send(Users);
  } catch (error) {
    next(error);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const updated = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }).exec();
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
};
const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const removed = await User.findOneAndDelete({ _id: id }).exec();
    res.status(200).send(removed);
  } catch (error) {
    next(error);
  }
};

const checkTimeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.params.token;
    if (!token) {
      res.status(403).send("A token is required for authentication");
    }
    const decoded = jwt.verify(token, config.JWT_SECRET || "");
    res.status(200).json({
      message: "ยังอยู่ในเวลา",
      decoded: decoded,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  list,
  create,
  read,
  update,
  remove,
  checkTimeToken,
};

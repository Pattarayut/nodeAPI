import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";

const list = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const Products = await Product.find({}).exec();
    res.status(200).send(Products);
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
    const Products = await new Product(req.body).save();
    res.status(200).send(Products);
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
    const Products = await Product.find({ _id: id }).exec();
    res.status(200).send(Products);
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
    const updated = await Product.findOneAndUpdate({ _id: id }, req.body, {
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
    const removed = await Product.findOneAndDelete({ _id: id }).exec();
    res.status(200).send(removed);
  } catch (error) {
    next(error);
  }
};

export default {
  list,
  create,
  read,
  update,
  remove,
};

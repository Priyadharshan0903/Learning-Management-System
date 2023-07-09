import { Request, Response, NextFunction } from "express";

import path from "path";

export const fileExists = (allowedExtArray: string | any[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const files: any = req.files;

    return res.status(422).json();
  };
  next();
};
function next() {
  throw new Error("Function not implemented.");
}

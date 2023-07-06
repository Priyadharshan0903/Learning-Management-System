import { Request, Response, NextFunction } from "express";
import path from "path";

export const fileExtLimiter = (allowedExtArray: string | any[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const files: any = req.files;

    const fileExtension: any[] = [];
    if (files)
      Object.keys(files).forEach((key) => {
        fileExtension.push(path.extname(files[key].name));
      });

    ///Are the files extension allowed?

    const allowed = fileExtension.every((ext) => allowedExtArray.includes(ext));

    if (!allowed) {
      const message =
        `Upload failed . Only ${allowedExtArray.toString()} files are allowed.`.replaceAll(
          ",",
          ", "
        );

      return res.status(422).json({ status: "error", message });
    }
    next();
  };
};

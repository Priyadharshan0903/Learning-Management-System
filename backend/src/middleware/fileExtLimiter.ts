import { Request, Response, NextFunction } from "express";
import path from "path";

export const fileExtLimiter = (allowedExtArray: string | any[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const files: any = req.files;

    const fileExtension: any[] = [];
    if (files)
      Object.values(files).forEach((file: any) => {
        if (file.length)
          file.forEach((file: any) => {
            fileExtension.push(path.extname(file.name));
          });
        else fileExtension.push(path.extname(files.file.name));
      });

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

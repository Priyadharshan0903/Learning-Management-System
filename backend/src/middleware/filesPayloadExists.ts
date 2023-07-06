import { Request, Response, NextFunction } from "express";

export const filesPayloadExists = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "No files were uploaded. or Missing Files....",
    });
  }

  next();
};

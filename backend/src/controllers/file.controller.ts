import { Response, Request } from "express";
import fs from "fs";
import path from "path";

import { Department, File, User } from "./../models";
import { Sequelize } from "sequelize";

export class FileController {
  constructor() {}

  async get(req: Request, res: Response) {
    const deptId = Number(req.query.deptId);
    try {
      let where = {};
      if (deptId > 0) {
        where = { deptId };
      }
      const files = await File.findAll({
        attributes: [
          "fileName",
          [Sequelize.col("user.name"), "userName"],
          [Sequelize.col("department.name"), "departmentName"],
        ],
        include: [
          { model: User, as: "user", attributes: [] },
          { model: Department, as: "department", attributes: [] },
        ],
        order: [["createdAt", "ASC"]],
        where,
      });
      return res.json(files);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to fetch file names" });
    }
  }

  async post(req: any, res: Response) {
    const files: any = req.files;
    if (files) {
      const fileNames = Object.keys(files).map((key) => files[key].name);
      try {
        await File.bulkCreate(
          fileNames.map((fileName) => ({
            fileName,
            deptId: req.user.deptId,
            userId: req.user.userId,
          }))
        );
        Object.keys(files).forEach((key) => {
          const filepath = path.join(__dirname, "../files", files[key].name);
          files[key].mv(filepath, (err: any) => {
            if (err)
              return res.status(500).json({ status: "error", message: err });
          });
        });
        return res.json({
          message: Object.keys(files).toString(),
        });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ status: "error", message: "Failed to save file names" });
      }
    }
    return res
      .status(400)
      .json({ status: "error", message: "No files provided" });
  }

  async delete(req: Request, res: Response) {
    try {
      const fileName = req.params.fileName;
      await File.destroy({ where: { fileName } });
      const filepath = path.join(__dirname, "../files", fileName);
      fs.unlink(filepath, (err: any) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ status: "error", message: "Failed to delete file" });
        }
      });
      return res.json({ status: "success", message: "File deleted" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "error", message: "Failed to delete file" });
    }
  }
}

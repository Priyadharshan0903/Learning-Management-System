import { Response, Request } from "express";
import fs from "fs";
import path from "path";

import { Department, File, Subject, User } from "./../models";
import { Sequelize } from "sequelize";

import progressStream from "progress-stream";

export class FileController {
  constructor() {}

  async get(req: any, res: Response) {
    let deptId = Number(req.query.deptId);
    let userId = Number(req.query.userId);

    if (req.user?.role !== "ADMIN") {
      deptId = req.user.deptId;
      if (req.user.role === "STAFF") userId = req.user.userId;
    }

    try {
      let where = {};
      if (deptId > 0) {
        where = { deptId };
      }

      if (userId > 0) {
        where = { ...where, userId };
      }

      const files = await File.findAll({
        attributes: [
          "fileName",
          [Sequelize.col("user.name"), "userName"],
          [Sequelize.col("department.name"), "departmentName"],
          [Sequelize.col("subject.name"), "subjectName"],
        ],
        include: [
          { model: User, as: "user", attributes: [] },
          {
            model: Department,
            as: "department",
            attributes: [],
          },
          {
            model: Subject,
            as: "subject",
            attributes: [],
          },
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
    const files = req.files;
    const { subjectId } = req.query;
    if (!files || Object.keys(files).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "No files were uploaded." });
    }

    const fileNames: string[] = [];
    Object.values(files).forEach((file: any) => {
      if (file.length)
        file.forEach((file: any) => {
          fileNames.push(file.name);
        });
      else fileNames.push(file.name);
    });

    try {
      await File.bulkCreate(
        fileNames.map((fileName) => ({
          fileName,
          deptId: req.user.deptId,
          userId: req.user.userId,
          subjectId,
        }))
      );

      const upload = (file: any) => {
        const fileName = file.name;
        const filepath = path.join(__dirname, "../files", fileName);

        // Move the file to the desired destination
        file.mv(filepath, (err: any) => {
          if (err) {
            console.error(`Error moving file ${fileName}:`, err);
          }
        });
      };

      Object.values(files).forEach((file: any) => {
        if (file.length)
          file.forEach((file: any) => {
            upload(file);
          });
        else upload(file);
      });

      return res
        .status(200)
        .json({ status: "success", message: "Files uploaded successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to save file names" });
    }
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

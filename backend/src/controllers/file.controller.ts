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
    let sem = Number(req.query.sem);
    // let userId = Number(req.query.userId);

    if (req.user?.role !== "ADMIN") {
      deptId = req.user.deptId;
      // if (req.user.role === "STAFF") userId = req.user.userId;
    }

    try {
      let where = {};
      if (deptId > 0) {
        where = { ...where, deptId };
      }
      if (sem > 0) {
        where = { ...where, semester: sem };
      }
      // if (userId > 0) {
      //   where = { ...where, userId };
      // }

      const files = await File.findAll({
        attributes: [
          "id",
          "fileName",
          "semester",
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
    const { subjectId, deptId, sem } = req.query;
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
          deptId: req.user.deptName === "ADMIN" ? deptId : req.user.deptId,
          userId: req.user.userId,
          subjectId,
          semester: sem,
        }))
      );

      let dept = await Department.findOne({
        where: { id: req.user.deptName === "ADMIN" ? deptId : req.user.deptId },
      });

      const upload = (file: any) => {
        const fileName = file.name;
        const filepath = path.join(
          __dirname,
          `../files/${dept?.dataValues.name}/Semester${sem}`,
          fileName
        );

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
      const id = req.params.id;
      const fileName = String(req.query.fileName);
      const dept = req.query.dept;
      const sem = req.query.sem;

      await File.destroy({ where: { id } });
      const filepath = path.join(
        __dirname,
        `../files/${dept}/Semester${sem}`,
        fileName
      );
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

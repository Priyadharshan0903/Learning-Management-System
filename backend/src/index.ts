import express, { Express } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { sequelize } from "./db";
import { Users } from "./models";
import { UserService } from "./services/users.service";
import bcrypt from "bcryptjs";
import { SubjectRoutes, UserRoutes } from "./routes";
import { DepartmentRoutes } from "./routes/department.routes";
import { Department } from "./models/department";
import { Subject } from "./models/subjects";
import fileUpload from "express-fileupload";
import {
  fileExtLimiter,
  fileSizeLimiter,
  filesPayloadExists,
} from "./middleware";

import path from "path";
import { Files } from "./models/files";
import { DepartmentService } from "./services/department.service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const list_of_files: any[] = [];

let corsOptions: CorsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(__dirname + "/files", { index: false }));

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

Users.sync().then(() => {
  new UserService(Users)
    .find({ where: { role: "ADMIN" } })
    .then((user: any) => {
      if (!user) {
        bcrypt.hash("admin", 10).then((hashPassword: string) => {
          let newUser = new Users({
            name: "Admin",
            email: "admin@local.com",
            password: hashPassword,
            deptId: 1,
            role: "ADMIN",
          });
          new UserService(Users).create(newUser);
        });
      }
    });
});

Department.sync().then(() => {
  new DepartmentService(Department)
    .find({ where: { name: "ADMIN" } })
    .then((dept: any) => {
      if (!dept) {
        let newDept = new Department({
          name: "ADMIN",
        });
        new DepartmentService(Department).create(newDept);
      }
    });
});
Subject.sync();
Files.sync();

app.use("/api/users", new UserRoutes().getRouter());
app.use("/api/departments", new DepartmentRoutes().getRouter());
app.use("/api/subjects", new SubjectRoutes().getRouter());

app.post(
  "/api/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", "jpe", ".pdf"]),
  fileSizeLimiter,
  //     if (files)
  //       Object.keys(files).forEach((key) => {
  //         const filepath = path.join(__dirname, "files", files[key].name);
  //         console.log(files);
  //         files[key].mv(filepath, (err: any) => {
  //           if (err)
  //             return res.status(500).json({ status: "error", message: err });
  //         });
  //         list_of_files.push(files[key].name);
  //       });
  //     console.log(list_of_files);
  //     return res.json({
  //       status: "logged ",
  //       message: Object.keys(files).toString(),
  //     });
  //   }
  // );

  async (req, res) => {
    const files: any = req.files;
    const token = req.headers;
    console.log(token);
    // if (!user) {
    //   return res.status(401).json({ status: "error", message: "Unauthorized" });
    // }

    if (files) {
      Object.keys(files).forEach((key) => {
        const filepath = path.join(__dirname, "files", files[key].name);
        files[key].mv(filepath, (err: any) => {
          if (err)
            return res.status(500).json({ status: "error", message: err });
        });
      });
      const fileNames = Object.keys(files).map((key) => files[key].name);
      try {
        await Files.bulkCreate(fileNames.map((fileName) => ({ fileName })));
        list_of_files.push(...fileNames);
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
);

app.get("/api/files", async (req, res) => {
  try {
    const fileNames = await Files.findAll({
      attributes: ["fileName"],
      raw: true,
    });
    const files = fileNames.map((fileName) => fileName);
    return res.json(files);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch file names" });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

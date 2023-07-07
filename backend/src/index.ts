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
import { FilesName } from "./models/FilesName";

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
            department: "ADMIN",
            role: "ADMIN",
          });
          new UserService(Users).create(newUser);
        });
      }
    });
});

Department.sync();
Subject.sync();
FilesName.sync();

app.use("/api/users", new UserRoutes().getRouter());
app.use("/api/departments", new DepartmentRoutes().getRouter());
app.use("/api/subjects", new SubjectRoutes().getRouter());

// app.post(
//   "/api/upload",
//   fileUpload({ createParentPath: true }),
//   filesPayloadExists,
//   fileExtLimiter([".png", ".jpg", "jpe", ".pdf"]),
//   fileSizeLimiter,
//   (req, res) => {
//     const files: any = req.files;
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
app.post(
  "/api/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", "jpe", ".pdf"]),
  fileSizeLimiter,
  async (req, res) => {
    const files: any = req.files;
    if (files) {
      const fileNames = Object.keys(files).map((key) => files[key].name);
      try {
        await FilesName.bulkCreate(fileNames.map((fileName) => ({ fileName })));
        list_of_files.push(...fileNames);
        return res.json({
          status: "logged ",
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

// app.get("/api/files", (req, res) => {
//   return res.json({
//     status: "logged ",
//     message: list_of_files,
//   });
// });
app.get("/api/files", async (req, res) => {
  try {
    const fileNames = await FilesName.findAll({
      attributes: ["fileName"],
      raw: true,
    });
    const files = fileNames.map((fileName) => fileName);
    return res.json({
      status: "logged ",
      files: files,
    });
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

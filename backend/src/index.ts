import express, { Express } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { sequelize } from "./db";
import { User } from "./models";
import { UserService } from "./services/users.service";
import bcrypt from "bcryptjs";
import { FileRoutes, SubjectRoutes, UserRoutes } from "./routes";
import { DepartmentRoutes } from "./routes/department.routes";
import { Department } from "./models/department";
import { Subject } from "./models/subjects";
import fileUpload from "express-fileupload";
import {
  fileExtLimiter,
  fileSizeLimiter,
  filesPayloadExists,
  verifyToken,
} from "./middleware";

import fs from "fs";
import path from "path";
import { File } from "./models/files";
import { DepartmentService } from "./services/department.service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

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

User.sync().then(() => {
  new UserService(User).find({ where: { role: "ADMIN" } }).then((user: any) => {
    if (!user) {
      bcrypt.hash("admin", 10).then((hashPassword: string) => {
        let newUser = new User({
          name: "Admin",
          email: "admin@local.com",
          password: hashPassword,
          deptId: 1,
          role: "ADMIN",
        });
        new UserService(User).create(newUser);
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
File.sync();

app.use("/api/users", new UserRoutes().getRouter());
app.use("/api/departments", new DepartmentRoutes().getRouter());
app.use("/api/subjects", new SubjectRoutes().getRouter());
app.use("/api/files", new FileRoutes().getRouter());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

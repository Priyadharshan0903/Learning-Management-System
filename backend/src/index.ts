import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { sequelize } from "./db";
import { Users } from "./models";
import { UserService } from "./services/users.service";
import bcrypt from "bcryptjs";
import { SubjectRoutes, UserRoutes } from "./routes";
import { DepartmentRoutes } from "./routes/Department.routes";
import { Department } from "./models/department";
import { Subject } from "./models/subjects";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

let corsOptions: CorsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));
app.use(express.json());

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

app.use("/api/users", new UserRoutes().getRouter());
app.use("/api/departments", new DepartmentRoutes().getRouter());
app.use("/api/subjects", new SubjectRoutes().getRouter());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

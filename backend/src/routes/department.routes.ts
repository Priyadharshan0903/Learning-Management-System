import { Request, Response, Router } from "express";
import { DepartmentController } from "../controllers";
import { verifyToken } from "../middleware";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

// Create a new department

export class DepartmentRoutes {
  private router: Router;
  private controller: DepartmentController;

  constructor() {
    this.controller = new DepartmentController();
    this.router = Router();
    this.routes();
  }
  private routes() {
    this.router.post("/", verifyToken, (req, res) =>
      this.controller.createDepartment(req, res)
    );

    // GET All departmnet

    this.router.get("/", verifyToken, (req, res) =>
      this.controller.getAllDepartments(req, res)
    );
  }
  public getRouter() {
    return this.router;
  }
}

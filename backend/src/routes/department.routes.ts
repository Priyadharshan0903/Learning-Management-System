import { Request, Response, Router } from "express";
import { DepartmentController } from "../controllers";
import { verifyToken } from "../middleware";

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

    // GET a department by Id
    this.router.get("/:id", verifyToken, (req, res) =>
      this.controller.getDepartmentById(req, res)
    );

    //UPDATE a department
    this.router.put("/:id", verifyToken, (req, res) => {
      this.controller.updateDepartment(req, res);
    });

    //DELETE a department
    this.router.delete("/:id", verifyToken, (req, res) =>
      this.controller.deleteDepartment(req, res)
    );
  }
  public getRouter() {
    return this.router;
  }
}

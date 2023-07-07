import { Request, Response, Router } from "express";
import { verifyToken } from "../middleware";
import { StudentController } from "../controllers/Student.controller";

export class DepartmentRoutes {
  private router: Router;
  private controller: StudentController;

  constructor() {
    this.controller = new StudentController();
    this.router = Router();
    this.routes();
  }
  private routes() {
    this.router.post("/", verifyToken, (req, res) =>
      this.controller.create(req, res)
    );

    // GET All Student
    this.router.get("/", verifyToken, (req, res) =>
      this.controller.getAll(req, res)
    );

    // GET Student by Id
    this.router.get("/:id", verifyToken, (req, res) =>
      this.controller.getById(req, res)
    );

    // UPDATE Student
    this.router.put("/:id", verifyToken, (req, res) =>
      this.controller.update(req, res)
    );

    // DELETE Student
    this.router.delete("/:id", verifyToken, (req, res) =>
      this.controller.delete(req, res)
    );
  }
  public getRouter() {
    return this.router;
  }
}

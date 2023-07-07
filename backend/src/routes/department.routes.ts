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
      this.controller.create(req, res)
    );

    // GET All Department
    this.router.get("/", verifyToken, (req, res) =>
      this.controller.getAll(req, res)
    );

    // GET Department by Id
    this.router.get("/:id", verifyToken, (req, res) =>
      this.controller.getById(req, res)
    );

    // UPDATE Department
    this.router.put("/:id", verifyToken, (req, res) =>
      this.controller.update(req, res)
    );

    // DELETE Department
    this.router.delete("/:id", verifyToken, (req, res) =>
      this.controller.delete(req, res)
    );
  }
  public getRouter() {
    return this.router;
  }
}

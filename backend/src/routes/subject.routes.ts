import { Request, Response, Router } from "express";
import { studentGuard, verifyToken } from "../middleware";
import { SubjectController } from "../controllers";

export class SubjectRoutes {
  private router: Router;
  private controller: SubjectController;

  constructor() {
    this.controller = new SubjectController();
    this.router = Router();
    this.routes();
  }
  private routes() {
    this.router.post("/", verifyToken, studentGuard, (req, res) =>
      this.controller.createSubject(req, res)
    );

    // GET All Subject

    this.router.get("/", verifyToken, studentGuard, (req, res) =>
      this.controller.getAllSubjects(req, res)
    );

    // GET a Subject by Id
    this.router.get("/:id", verifyToken, studentGuard, (req, res) =>
      this.controller.getSubjectsById(req, res)
    );

    //UPDATE a department
    this.router.put("/:id", verifyToken, studentGuard, (req, res) => {
      this.controller.updateSubjects(req, res);
    });

    //DELETE a Subject
    this.router.delete("/:id", verifyToken, studentGuard, (req, res) =>
      this.controller.deleteSubject(req, res)
    );
  }
  public getRouter() {
    return this.router;
  }
}

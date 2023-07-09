import { Request, Response, Router } from "express";
import { FileController } from "../controllers";
import {
  filesPayloadExists,
  fileExtLimiter,
  //Files Exists   req --->  Dept ID , SemId  check with the Files table
  fileSizeLimiter,
  studentGuard,
  verifyToken,
} from "../middleware";
import fileUpload from "express-fileupload";

export class FileRoutes {
  private router: Router;
  private controller: FileController;

  constructor() {
    this.controller = new FileController();
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", verifyToken, (req, res) =>
      this.controller.get(req, res)
    );

    this.router.post(
      "/upload",
      verifyToken,
      studentGuard,
      fileUpload({ createParentPath: true }),
      filesPayloadExists,
      fileExtLimiter([".png", ".jpg", "jpeg", ".pdf"]),
      fileSizeLimiter,
      (req: Request, res: Response) => this.controller.post(req, res)
    );

    this.router.delete("/:id", verifyToken, studentGuard, (req, res) =>
      this.controller.delete(req, res)
    );
  }

  public getRouter() {
    return this.router;
  }
}

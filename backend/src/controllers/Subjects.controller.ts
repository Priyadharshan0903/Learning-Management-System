import { Request, Response } from "express";
import { Department } from "../../src/models/department";
import { SubjectService } from "../services/subjects.service";
import { Subject } from "../models/subjects";
export class SubjectController {
  private subjectService: SubjectService;
  getRouter: any;

  constructor() {
    this.subjectService = new SubjectService(Department);
  }

  // Creating subject.

  async createSubject(req: Request, res: Response) {
    const { subjectName } = req.body;
    const { subjectCode } = req.body;
    const subject = await Subject.create({ subjectName, subjectCode });
    return res.status(201).json(subject);
  }

  // Retrieve all subject.

  async getAllSubjects(req: Request, res: Response) {
    const subject = await Subject.findAll();
    return res.status(200).json(subject);
  }

  // Retrieve a subject. by  semester Id

  async getSubjectsById(req: Request, res: Response) {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);
    if (subject) {
      return res.status(200).json(subject);
    }
    return res.status(404).json({ error: "Subject not found" });
  }

  // Update a subject.

  async updateSubjects(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const subject = await Subject.findByPk(id);
    if (subject) {
      await subject.update({ name });
      return res.status(200).json(subject);
    }
    return res.status(404).json({ error: "Subject not found" });
  }

  // Delete a subject.

  async deleteSubject(req: Request, res: Response) {
    const { id } = req.params;
    const subject = await Subject.findByPk(id);
    if (subject) {
      await subject.destroy();
      return res.status(204).json({ message: "Subject deleted" });
    }
    return res.status(404).json({ error: "Subject not found" });
  }
}

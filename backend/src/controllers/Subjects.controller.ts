import { Request, Response } from "express";
import { Subject } from "./../models";
import { SubjectService } from "../services/subjects.service";

export class SubjectController {
  private subjectService: SubjectService;

  constructor() {
    this.subjectService = new SubjectService(Subject);
  }

  // Creating subject.
  async createSubject(req: Request, res: Response) {
    const { code, name } = req.body;

    const newSubject = new Subject({ code, name });
    const createdSubject = await this.subjectService.create(newSubject);

    return res.status(201).json(createdSubject);
  }

  // Retrieve all subject.
  async getAllSubjects(req: Request, res: Response) {
    const subject = await this.subjectService.getAll();
    return res.status(200).json(subject);
  }

  // Retrieve a subject. by  semester Id
  async getSubjectsById(req: Request, res: Response) {
    const { id } = req.params;
    const subject = await this.subjectService.get(id);
    if (subject) {
      return res.status(200).json(subject);
    }
    return res.status(404).send("Subject not found");
  }

  // Update a subject.
  async updateSubjects(req: Request, res: Response) {
    const { id } = req.params;
    const { code, name } = req.body;

    const subject = await this.subjectService.get(id);
    if (subject) {
      await subject.update({ code, name });
      return res.status(200).json(subject);
    }
    return res.status(404).send("Subject not found");
  }

  // Delete a subject.
  async deleteSubject(req: Request, res: Response) {
    const { id } = req.params;
    const subject = await this.subjectService.get(id);
    if (subject) {
      await subject.destroy();
      return res.status(204).json({ message: "Subject deleted" });
    }
    return res.status(404).send("Subject not found");
  }
}

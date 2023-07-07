import { Request, Response } from "express";
import { SubjectService } from "../services/subjects.service";
import { Student } from "../models";
import { StudentService } from "../services/student.service";

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new SubjectService(Student);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;

    const newStudent = new Student({ name });
    const createdStudent = await this.studentService.create(newStudent);

    return res.status(201).json(createdStudent);
  }

  // GET ALL
  async getAll(req: Request, res: Response) {
    const student = await this.studentService.getAll();
    return res.status(200).json(student);
  }

  // GET BY ID
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const student = await this.studentService.get(id);
    if (student) {
      return res.status(200).json(student);
    }
    return res.status(404).json({ error: "Student not found" });
  }

  // UPDATE students
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const student = await this.studentService.get(id);
    if (student) {
      await student.update({ name });
      return res.status(200).json(student);
    }
    return res.status(404).json({ error: "Student not found" });
  }

  // DELETE students
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const student = await this.studentService.get(id);
    if (student) {
      await student.destroy();
      return res.status(204).json({ message: "Student deleted" });
    }
    return res.status(404).json({ error: "Student not found" });
  }
}

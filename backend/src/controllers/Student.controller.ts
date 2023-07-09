import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { SubjectService } from "../services/subjects.service";
import { Department, Student, User } from "../models";
import { StudentService } from "../services/student.service";
import { sequelize } from "../db";
import { Sequelize } from "sequelize";

export class StudentController {
  private studentService: StudentService;

  options = {
    attributes: {
      include: [
        [Sequelize.col("user.name"), "name"],
        [Sequelize.col("user.email"), "email"],
        [Sequelize.col("user.department.name"), "deptName"],
      ],
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: [],
        include: [
          {
            model: Department,
            as: "department",
            attributes: [],
          },
        ],
      },
    ],
  };

  constructor() {
    this.studentService = new SubjectService(Student);
  }

  async create(req: Request, res: Response) {
    const { name, email, regNo, rollNo, deptId, dob } = req.body;
    console.log(dob);

    const hashPassword = await bcrypt.hash(dob, 10);

    const newUser = {
      role: "STUDENT",
      name,
      email,
      password: hashPassword,
      deptId,
    };

    const t = await sequelize.transaction();

    User.create(newUser, { transaction: t })
      .then((createdUser) => {
        const newStudent = {
          userId: createdUser.dataValues.id,
          rollNo,
          regNo,
          dob,
        };

        Student.create(newStudent, { transaction: t })
          .then((createdStudent) => {
            t.commit();
            return res.status(201).json(createdStudent);
          })
          .catch((err) => {
            t.rollback();
            return res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        t.rollback();
        return res.status(500).json({ error: err.message });
      });
  }

  // GET ALL
  async getAll(req: Request, res: Response) {
    const student = await this.studentService.getAll(this.options);
    return res.status(200).json(student);
  }

  // GET BY ID
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const student = await this.studentService.get(id, this.options);
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

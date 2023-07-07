import { Request, Response } from "express";
import { Department } from "../../src/models/department";
import { DepartmentService } from "../services/department.service";
import { Op } from "sequelize";
export class DepartmentController {
  private departmentService: DepartmentService;

  constructor() {
    this.departmentService = new DepartmentService(Department);
  }

  // Creating dept.

  async create(req: Request, res: Response) {
    const { name } = req.body;
    const department = await Department.create({ name });
    return res.status(201).json(department);
  }

  // Retrieve all dept.

  async getAll(req: Request, res: Response) {
    const departments = await Department.findAll({
      where: { name: { [Op.not]: ["ADMIN"] } },
    });
    return res.status(200).json(departments);
  }

  // Retrieve a dept. by Id

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const department = await Department.findByPk(id);
    if (department) {
      return res.status(200).json(department);
    }
    return res.status(404).json({ error: "Department not found" });
  }

  // Update a dept.

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const department = await Department.findByPk(id);
    if (department) {
      await department.update({ name });
      return res.status(200).json(department);
    }
    return res.status(404).json({ error: "Department not found" });
  }

  // Delete a departemnt.

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const department = await Department.findByPk(id);
    if (department) {
      await department.destroy();
      return res.status(204).json({ message: "Department deleted" });
    }
    return res.status(404).json({ error: "Department not found" });
  }
}

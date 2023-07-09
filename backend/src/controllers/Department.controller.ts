import { Request, Response } from "express";
import { Op } from "sequelize";

import { Department } from "../models";
import { DepartmentService } from "../services";

export class DepartmentController {
  private departmentService: DepartmentService;

  constructor() {
    this.departmentService = new DepartmentService(Department);
  }

  // Create Department
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const newDepartment = new Department({ name });
    const createdDepartment = await this.departmentService.create(
      newDepartment
    );
    return res.status(201).json(createdDepartment);
  }

  // Retrieve all Department
  async getAll(req: Request, res: Response) {
    const departments = await this.departmentService.getAll({
      where: { name: { [Op.not]: ["ADMIN"] } },
    });
    return res.status(200).json(departments);
  }

  // Retrieve a Department by Id
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const department = await this.departmentService.get(id);
    if (department) {
      return res.status(200).json(department);
    }
    return res.status(404).send("Department not found");
  }

  // Update a Department
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const department = await this.departmentService.get(id);
    if (department) {
      await department.update({ name });
      return res.status(200).json(department);
    }
    return res.status(404).send("Department not found");
  }

  // Delete a Department.
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const department = await this.departmentService.get(id);
    if (department) {
      await department.destroy();
      return res.status(204).json({ message: "Department deleted" });
    }
    return res.status(404).send("Department not found");
  }
}

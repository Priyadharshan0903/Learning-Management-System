import { Request, Response } from "express";
import { Users } from "../models";
import { UserService } from "../services/users.service";

import { Op } from "sequelize";

const Note = require("./models/Note");
const User = require("./models/User");

export class StudentController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(Users);
  }

  uploadNote = async (req: Request, res: Response) => {
    try {
      const { department, semester, title, fileUrl } = req.body;
      //   const staffId = req.user.id;

      const note = new Note({
        department,
        semester,
        title,
        fileUrl,
        // uploadedBy: staffId,
      });
      await note.save();

      res.status(201).json({ message: "Note uploaded successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while uploading the note" });
    }
  };
}

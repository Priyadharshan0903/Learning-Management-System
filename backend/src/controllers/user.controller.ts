import { Request, Response } from "express";
import { Users } from "../models";
import { UserService } from "../services/users.service";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService(Users);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    this.userService
      .find({ where: { email } })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.dataValues.password).then((checked) => {
            if (checked) {
              const token = jwt.sign(
                {
                  userId: user.dataValues.id,
                  email,
                  role: user.dataValues.role,
                  department: user.dataValues.department,
                },
                process.env.TOKEN_KEY ? process.env.TOKEN_KEY : "",
                {
                  expiresIn: "2h",
                }
              );
              user.dataValues.token = token;
              delete user.dataValues.password;

              res.status(200).json(user);
            } else {
              res.status(401).send("Invalid Credentials");
            }
          });
        } else res.status(401).send("Invalid Credentials");
      })
      .catch((err) => res.status(400).json(err));
  }

  getAll(req: Request, res: Response) {
    let options = {
      attributes: {
        exclude: ["password"],
      },
      where: {
        [Op.not]: [{ role: "ADMIN" }],
      },
    };
    this.userService
      .getAll(options)
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err: any) => {
        return res.status(400).json(err);
      });
  }

  getById(req: Request, res: Response) {
    let id = req.params.id;
    this.userService
      .get(id, {
        attributes: {
          exclude: ["password"],
        },
      })
      .then((user: any) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
      });
  }

  post(req: Request, res: Response) {
    const { name, email, password } = req.body;
    // TODO: Validate fields before creating user
    this.userService
      .find({ where: { email } })
      .then((user: any) => {
        if (user)
          return res.status(400).json({ message: "User already exists" });
        else {
          bcrypt.hash(password, 10).then((hashPassword) => {
            let newUser = new Users({
              name,
              email,
              department: "CSE",
              password: hashPassword,
              role: "STUDENT",
            });

            this.userService
              .create(newUser)
              .then((user: Users) => res.status(200).json(user))
              .catch((err: any) => res.status(400).json(err));
          });
        }
      })
      .catch((err: any) => res.status(400).json(err));
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    this.userService.get(id).then((user) => {
      if (user) {
        delete user.dataValues.password;
        let updatedUser = new Users({
          ...user.dataValues,
          ...data,
        });
        this.userService
          .update(id, updatedUser)
          .then((user: any) => res.status(200).json(user))
          .catch((err: any) => res.status(400).json(err));
      } else
        return res
          .status(404)
          .json({ message: `User id:${req.params.id} does not exists` });
    });
  }

  delete(req: Request, res: Response) {
    this.userService.get(req.params.id).then((user) => {
      if (user) {
        this.userService
          .delete(req.params.id)
          .then((user) => res.status(200).json())
          .catch((err) => res.status(400).json(err));
      } else
        res
          .status(404)
          .json({ message: `User id:${req.params.id} does not exists` });
    });
  }
}

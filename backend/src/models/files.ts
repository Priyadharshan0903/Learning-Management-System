import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { Department } from "./department";
import { Users } from "./users";

export class Files extends Model {
  fileName: any;
  file_name: any;
}

Files.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deptId: {
      type: DataTypes.INTEGER,
      references: {
        model: Department,
        key: "id",
      },
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "files",
    timestamps: true,
    underscored: true,
  }
);

Files.belongsTo(Department, { foreignKey: "deptId" });
Files.belongsTo(Users, { foreignKey: "userId" });

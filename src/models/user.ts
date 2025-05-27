import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model {
    declare id: number;
    declare username: string;
    declare email: string;
    declare password: string;
    declare role: string;

    static associate(models: any) {
      // define association here
      this.hasMany(models.Post, { foreignKey: "userId", as: "posts" });
    }

    // Password validation method using Bun's built-in crypto
    async validPassword(password: string): Promise<boolean> {
      return await Bun.password.verify(password, this.password);
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
    },
  );

  User.beforeSave(async (user: User) => {
    if (user.changed("password")) {
      user.password = await Bun.password.hash(user.password, {
        algorithm: "bcrypt",
        cost: 10,
      });
    }
  });

  return User;
};

import { Model, DataTypes, Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Post extends Model {
    declare id: number;
    declare title: string;
    declare content: string;
    declare userId: number;

    static associate(models: any) {
      // define association
      this.belongsTo(models.User, { foreignKey: "userId", as: "author" });
    }
  }

  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
    },
  );

  return Post;
};

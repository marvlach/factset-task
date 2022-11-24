
export const createDB = async (sequelize) => {

    await sequelize.query("CREATE DATABASE IF NOT EXISTS `FSDB`;");
    await sequelize.query("USE `FSDB`;");
}

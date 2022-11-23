import UserCreator from "./user.model.js";
import RefreshTokenCreator from "./refreshToken.model.js";
import sequelize from "./index.js";

const User = UserCreator(sequelize);
const RefreshToken = RefreshTokenCreator(sequelize);

User.hasMany(RefreshToken);
RefreshToken.belongsTo(User);

export { User, RefreshToken }
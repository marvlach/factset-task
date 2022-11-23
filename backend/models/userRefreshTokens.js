import User from './user.model.js';
import RefreshToken from './refreshTokens.model.js';

console.log('THIS FILEEEEEEEEEEEEEE');

User.hasMany(RefreshToken);
RefreshToken.belongsTo(User);
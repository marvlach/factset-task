import { DataTypes, Model } from 'sequelize';

const UserCreator = (sequelize) => {
    class User extends Model {}

    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            notEmpty: true,
        },
        hashedPassword: {
            type: DataTypes.STRING,
            /* set(value) {
                // Storing passwords in plaintext in the database is terrible.
                // Hashing the value with an appropriate cryptographic hash function is better.
                this.setDataValue('password', hash(value));
            }, */
            allowNull: false,
            notEmpty: true,
        }
    }, {
        /* hooks: {
            beforeValidate: (user, options) => {
            user.mood = 'happy';
            },
            afterValidate: (user, options) => {
            user.username = 'Toni';
            }
        }, */
        sequelize, 
        modelName: 'User' 
    })
    return User
}
export default UserCreator
// User.hasMany(RefreshToken);





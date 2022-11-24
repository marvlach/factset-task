import { Model } from 'sequelize';

const UserCreator = (sequelize, DataTypes) => {
    class User extends Model {
        static associate({ RefreshToken }) {
            this.hasMany(RefreshToken);
        }
    }

    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            notEmpty: true,
        },
        password: {
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





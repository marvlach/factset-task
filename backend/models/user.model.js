import { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

const UserCreator = (sequelize, DataTypes) => {
    class User extends Model {
        static associate({ RefreshToken }) {
            this.hasMany(RefreshToken, {
                foreignKey: 'userId',
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT'
            });
        }
    }

    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                arg: true,
                msg: 'This username is already taken.'
            },
            validate: {
                len: {
                    args: [3,],
                    msg: "Username must be at least 3 characters long"
                }
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [10,],
                    msg: "Password must be at least 10 characters long"
                }
            },        
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        hooks: {
            beforeValidate: (user, options) => {
                user.username = user.username.trim();
            },
            beforeSave: (user, options) => {
                if (!user.changed("password")) { 
                    return;
                }
                const salt = bcryptjs.genSaltSync();
                user.password = bcryptjs.hashSync(user.password, salt);
            }
        },
        sequelize, 
        modelName: 'User' 
    })
    return User
}
export default UserCreator





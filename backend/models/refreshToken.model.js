import { Model } from 'sequelize';


const RefreshTokenCreator = (sequelize, DataTypes) => {
    class RefreshToken extends Model {
        static associate({ User }) {
            this.belongsTo(User)
        }
      
        /* toJSON() {
            return { ...this.get(), id: undefined, userId: undefined }
        } */

    }

    RefreshToken.init({
        
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'RefreshToken' // We need to choose the model name
    })

    return RefreshToken;
}


export default RefreshTokenCreator
import { DataTypes, Model } from 'sequelize';


const RefreshTokenCreator = (sequelize) => {
    class RefreshToken extends Model {}

    RefreshToken.init({
        /* userId: {
            type: DataTypes.INTEGER,
            references: {
            // This is a reference to another model
            model: User,
        
            // This is the column name of the referenced model
            key: 'id',
            }
        }, */
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
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

class User extends Model {

    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}


User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            validate: {
                is: /^\d{10,}$/i, // regex for 10 digits
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                isStrongPassword: function (value) {
                    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if (!strongPasswordRegex.test(value)) {
                        throw new Error('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character, and 8 characters long.');
                    }
                }
            }
        },
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.email = newUserData.email.toLowerCase();
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.email = updatedUserData.email.toLowerCase();
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
          },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
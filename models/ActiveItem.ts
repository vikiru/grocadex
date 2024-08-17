import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

interface ActiveItem extends Model<InferAttributes<ActiveItem>, InferCreationAttributes<ActiveItem>> {
    id: CreationOptional<number>;
    userId: number;
    receiptId: number;
    groceryItemId: number;
    expiryDate: Date;
}

export const ActiveItemModel = sequelize.define<ActiveItem>(
    'ActiveItem',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiptId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        groceryItemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        underscored: true,
        timestamps: true,
    },
);

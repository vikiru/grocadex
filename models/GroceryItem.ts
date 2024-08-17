import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

interface GroceryItemModel extends Model<InferAttributes<GroceryItemModel>, InferCreationAttributes<GroceryItemModel>> {
    id: CreationOptional<number>;
    name: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
    purchaseDate: string;
    expiryDate: string;
}

export const GroceryItemModel = sequelize.define<GroceryItemModel>(
    'GroceryItem',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        purchaseDate: {
            type: DataTypes.DATE,
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

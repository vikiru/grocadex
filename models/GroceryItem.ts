import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

import { ReceiptModel } from './Receipt';

const sequelize = new Sequelize('sqlite::memory:');

interface GroceryItem extends Model<InferAttributes<GroceryItem>, InferCreationAttributes<GroceryItem>> {
    id: CreationOptional<number>;
    receiptId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    purchaseDate: string;
    expiryDate: string;
}

export const GroceryItemModel = sequelize.define<GroceryItem>(
    'GroceryItem',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        receiptId: {
            type: DataTypes.INTEGER,
            references: {
                model: ReceiptModel,
                key: 'id',
            },
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

GroceryItemModel.belongsTo(ReceiptModel, {
    foreignKey: 'receiptId',
    as: 'receipt',
});

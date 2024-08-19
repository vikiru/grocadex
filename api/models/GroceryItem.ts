import { CreationOptional, DataTypes, Model } from 'sequelize';

import sequelize from './../data/index';
import Receipt from './Receipt';

class GroceryItem extends Model {
    id!: CreationOptional<number>;
    receiptId!: number;
    name!: string;
    quantity!: number;
    unitPrice!: number;
    totalPrice!: number;
    purchaseDate!: string;
    expiryDate!: string;
}

GroceryItem.init(
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
                model: Receipt,
                key: 'id',
            },
            allowNull: false,
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
        sequelize,
        modelName: 'GroceryItem',
        underscored: true,
        timestamps: true,
    },
);

GroceryItem.belongsTo(Receipt, {
    foreignKey: 'receiptId',
    as: 'receipt',
});

export default GroceryItem;

import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '@/data';
import { GroceryItemModel } from './GroceryItem';
import { ReceiptModel } from './Receipt';
import { UserModel } from './User';

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

ActiveItemModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user',
});

ActiveItemModel.belongsTo(ReceiptModel, {
    foreignKey: 'receiptId',
    as: 'receipt',
});

ActiveItemModel.belongsTo(GroceryItemModel, {
    foreignKey: 'groceryItemId',
    as: 'groceryItem',
});

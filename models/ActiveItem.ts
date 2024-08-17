import { CreationOptional, DataTypes, Model } from 'sequelize';

import sequelize from '@/data';
import GroceryItem from './GroceryItem';
import Receipt from './Receipt';
import User from './User';

class ActiveItem extends Model {
    id!: CreationOptional<number>;
    userId!: number;
    receiptId!: number;
    groceryItemId!: number;
    expiryDate!: Date;
}

ActiveItem.init(
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
        sequelize,
        modelName: 'ActiveItem',
        underscored: true,
        timestamps: true,
    },
);

ActiveItem.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

ActiveItem.belongsTo(Receipt, {
    foreignKey: 'receiptId',
    as: 'receipt',
});

ActiveItem.belongsTo(GroceryItem, {
    foreignKey: 'groceryItemId',
    as: 'groceryItem',
});

export default ActiveItem;

import { CreationOptional, DataTypes, Model } from 'sequelize';

import sequelize from '@/data';
import GroceryItemModel from './GroceryItem';
import UserModel from './User';

class Receipt extends Model {
    id!: CreationOptional<number>;
    userId!: number;
    store!: string;
    purchaseDate!: string;
    total!: number;
}

Receipt.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: UserModel,
                key: 'id',
            },
            allowNull: false,
        },
        store: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        purchaseDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Receipt',
        underscored: true,
        timestamps: true,
    },
);

Receipt.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user',
});

Receipt.hasMany(GroceryItemModel, {
    foreignKey: 'receiptId',
    as: 'groceryItems',
});

export default Receipt;

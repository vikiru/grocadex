import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import sequelize from '@/data';
import { GroceryItemModel } from './GroceryItem';
import { UserModel } from './User';

interface Receipt extends Model<InferAttributes<Receipt>, InferCreationAttributes<Receipt>> {
    id: CreationOptional<number>;
    userId: number;
    store: string;
    purchaseDate: string;
    total: number;
}

export const ReceiptModel = sequelize.define<Receipt>(
    'Receipt',
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
        underscored: true,
        timestamps: true,
    },
);

ReceiptModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user',
});

ReceiptModel.hasMany(GroceryItemModel, {
    foreignKey: 'receiptId',
    as: 'groceryItems',
});

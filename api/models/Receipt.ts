import { CreationOptional, DataTypes, Model } from 'sequelize';

import sequelize from './../data/index';
import GroceryItemModel from './GroceryItem';
import User from './User';

export type ReceiptCreationAttributes = {
    id: CreationOptional<number>;
    userId: number;
    store: number;
    purchaseDate: string;
    total: number;
};

class Receipt extends Model {
    id!: CreationOptional<number>;
    userId!: number;
    store!: string;
    purchaseDate!: string;
    total!: number;

    static async addReceipt(receipt: ReceiptCreationAttributes): Promise<void> {
        await this.create(receipt);
    }

    static async findAllReceipts(userId: number): Promise<Receipt[]> {
        return await this.findAll({ where: { userId } });
    }

    static async findReceiptById(id: number): Promise<Receipt> {
        return await this.findOne({ where: { id } });
    }

    static async removeReceiptById(id: number): Promise<void> {
        await this.destroy({ where: { id } });
    }

    static async updateReceiptById(id: number, receipt: ReceiptCreationAttributes): Promise<void> {
        await this.update(receipt, { where: { id } });
    }
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
                model: User,
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

Receipt.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

Receipt.hasMany(GroceryItemModel, {
    foreignKey: 'receiptId',
    as: 'groceryItems',
});

export default Receipt;

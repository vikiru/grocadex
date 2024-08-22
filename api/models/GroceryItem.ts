import { CreationOptional, DataTypes, Model } from 'sequelize';

import sequelize from './../data/index';
import Receipt from './Receipt';

export type GroceryItemCreationAttributes = {
    id: CreationOptional<number>;
    receiptId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    purchaseDate: string;
    expiryDate: string;
};

class GroceryItem extends Model {
    id!: CreationOptional<number>;
    receiptId!: number;
    name!: string;
    quantity!: number;
    unitPrice!: number;
    totalPrice!: number;
    purchaseDate!: string;
    expiryDate!: string;

    static async addGroceryItem(groceryItem: GroceryItemCreationAttributes): Promise<void> {
        await this.create({ groceryItem });
    }

    static async findAllGroceryItems(receiptId: number): Promise<GroceryItem[]> {
        return await this.findAll({ where: { receiptId } });
    }

    static async findGroceryItemById(id: number): Promise<GroceryItem> {
        return await this.findOne({ where: { id } });
    }

    static async removeGroceryItemById(id: number): Promise<void> {
        await this.destroy({ where: { id } });
    }

    static async updateGroceryItemById(id: number, groceryItem: GroceryItemCreationAttributes): Promise<void> {
        await this.update(groceryItem, { where: { id } });
    }
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

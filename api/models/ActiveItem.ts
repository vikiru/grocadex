import { CreationOptional, DataTypes, Model } from 'sequelize';

import sequelize from './../data/index';

type ActiveItemCreationAttributes = {
    id: CreationOptional<number>;
    userId: number;
    receiptId: number;
    groceryItemId: number;
    expiryDate: Date;
};

class ActiveItem extends Model {
    id!: CreationOptional<number>;
    userId!: number;
    receiptId!: number;
    groceryItemId!: number;
    expiryDate!: Date;

    static async addActiveItem(activeItem: ActiveItemCreationAttributes): Promise<void> {
        await this.create(activeItem);
    }

    static async findAllActiveItems(): Promise<ActiveItem[]> {
        return await this.findAll();
    }

    static async findActiveItemById(id: number): Promise<ActiveItem> {
        return await this.findOne({ where: { id } });
    }

    static async removeActiveItemById(id: number): Promise<void> {
        await this.destroy({ where: { id } });
    }

    static async updateActiveItemById(id: number, activeItem: ActiveItemCreationAttributes): Promise<void> {
        await this.update(activeItem, { where: { id } });
    }
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

export { ActiveItem, ActiveItemCreationAttributes };

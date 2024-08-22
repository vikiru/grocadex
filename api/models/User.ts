import { CreationOptional, DataTypes, Model } from 'sequelize';

import { compare } from 'bcrypt';
import sequelize from './../data/index';
import { hashPassword } from './../utils/hashPassword';

type UserCreationAttributes = {
    id: CreationOptional<number>;
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
};

class User extends Model {
    id!: CreationOptional<number>;
    firstName!: string;
    lastName!: string;
    email!: string;
    userName!: string;
    password!: string;

    static async isUserTaken(username: string): Promise<boolean> {
        const user = await this.findOne({ where: { userName: username } });
        return user !== null;
    }

    static async isEmailTaken(email: string): Promise<boolean> {
        const user = await this.findOne({ where: { email } });
        return user !== null;
    }

    async validatePassword(password: string): Promise<boolean> {
        return await compare(password, this.password);
    }

    static async findUserById(id: number): Promise<User> {
        return await this.findOne({ where: { id } });
    }

    static async addUser(user: UserCreationAttributes): Promise<void> {
        await this.create(user);
    }

    static async findAllUsers(): Promise<User[]> {
        return await this.findAll();
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        underscored: true,
        timestamps: true,
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password) {
                    user.password = await hashPassword(user.password);
                }
            },
        },
    },
);

export { User, UserCreationAttributes };

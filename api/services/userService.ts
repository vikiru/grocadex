import { User } from '@prisma/client';
import { prisma } from '../data';
import { hashPassword } from '../utils/hashPassword';

export async function saveUser(user: Omit<User, 'id'>): Promise<void> {
    try {
        const hashedPassword = await hashPassword(user.password);

        await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword,
            },
        });

        console.log('Successfully saved user to the database.');
    } catch (error) {
        console.error(`Error saving user to the database: ${error}`);
        throw error;
    }
}

export async function retrieveAllUsers(): Promise<User[]> {
    try {
        const users = await prisma.user.findMany({});
        console.log('Successfully retrieved all users from the database.');
        return users;
    } catch (error) {
        console.error(`Error retrieving all users from the database: ${error}`);
        throw error;
    }
}

export async function retrieveUserById(userId: number): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            console.log(`Successfully retrieved user with id ${userId} from the database.`);
        } else {
            console.warn(`User with id ${userId} not found.`);
        }
        return user;
    } catch (error) {
        console.error(`Error retrieving user with id ${userId} from the database: ${error}`);
        throw error;
    }
}

export async function checkIfUserExists(username: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        return user !== null;
    } catch (error) {
        console.error(`Error checking if user exists: ${error}`);
        throw error;
    }
}

export async function checkIfEmailExists(email: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        return user !== null;
    } catch (error) {
        console.error(`Error checking if email exists: ${error}`);
        throw error;
    }
}

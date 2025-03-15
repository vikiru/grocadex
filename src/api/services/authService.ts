import { User } from '@prisma/client';
import { logger } from '~config/logger';
import { prisma } from '~data/';
import { validPassword } from '~utils/hashPassword';

export async function checkIfUserExists(username: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        return user !== null;
    } catch (error) {
        logger.error(`Error checking if user exists: ${error}`);
        throw error;
    }
}

export async function checkIfEmailExists(email: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        return user !== null;
    } catch (error) {
        logger.error(`Error checking if email exists: ${error}`);
        throw error;
    }
}

export async function validateUser(
    username: string,
    password: string,
): Promise<User> {
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        const isValidPassword = await validPassword(password, user.password);

        if (!isValidPassword || !user) {
            return null;
        }
        return user;
    } catch (error) {
        console.error(`Error validating user: ${error}`);
    }
}

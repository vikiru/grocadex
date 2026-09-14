import { User } from '@prisma/client';

import { logger } from '@/api/config/logger';
import { prisma } from '@/api/data/';
import { validPassword } from '@/api/utils/hashPassword';

export async function checkIfUserExists(username: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        return user !== null;
    } catch (error) {
        logger.error('Error checking if user exists.');
        throw error;
    }
}

export async function checkIfEmailExists(email: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        return user !== null;
    } catch (error) {
        logger.error('Error checking if email exists.');
        throw error;
    }
}

export async function validateUser(username: string, password: string): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return null;
        }

        const isValidPassword = await validPassword(password, user.password);

        if (!isValidPassword) {
            return null;
        }

        return user;
    } catch (error) {
        console.error('Error validating user.');
        return null;
    }
}

import { User } from '@prisma/client';
import { logger } from '~config/logger';
import { prisma } from '~data/';
import { hashPassword } from '~utils/hashPassword';

export async function saveUser(user: Omit<User, 'id'>): Promise<void> {
    try {
        const hashedPassword = await hashPassword(user.password);

        await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword,
            },
        });

        logger.info('Successfully saved user to the database.');
    } catch (error) {
        logger.error(`Error saving user to the database: ${error}`);
        throw error;
    }
}

export async function retrieveUserById(userId: number): Promise<User | null> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { activeItems: true, receipts: true, expenses: true },
        });

        if (user) {
            logger.info(
                `Successfully retrieved user with id ${userId} from the database.`,
            );
        } else {
            logger.error(`User with id ${userId} not found.`);
        }
        return user;
    } catch (error) {
        logger.error(
            `Error retrieving user with id ${userId} from the database: ${error}`,
        );
        throw error;
    }
}

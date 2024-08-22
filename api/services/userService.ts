import { User, UserCreationAttributes } from '../models/User';

export async function saveUser(user: UserCreationAttributes): Promise<void> {
    try {
        await User.addUser(user);
        console.log('Successfully saved user to database.');
    } catch (error) {
        console.error(`Error saving user to database: ${error}`);
        throw error;
    }
}

export async function retrieveUserById(id: number): Promise<User | null> {
    try {
        const user = await User.findUserById(id);
        if (!user) {
            console.warn(`User with id ${id} not found.`);
        } else {
            console.log('Successfully retrieved user from database.');
        }
        return user;
    } catch (error) {
        console.error(`Error retrieving user with id ${id}: ${error}`);
        throw error;
    }
}

export async function checkIfUserExists(username: string): Promise<boolean> {
    try {
        const exists = await User.isUserTaken(username);
        console.log(`User existence check for username '${username}': ${exists}`);
        return exists;
    } catch (error) {
        console.error(`Error checking if user exists for username '${username}': ${error}`);
        throw error;
    }
}

export async function checkIfEmailExists(email: string): Promise<boolean> {
    try {
        const exists = await User.isEmailTaken(email);
        console.log(`Email existence check for email '${email}': ${exists}`);
        return exists;
    } catch (error) {
        console.error(`Error checking if email exists for email '${email}': ${error}`);
        throw error;
    }
}

export async function validateUserPassword(user: User, password: string): Promise<boolean> {
    try {
        const isValid = await user.validatePassword(password);
        return isValid;
    } catch (error) {
        console.error(`Error validating password for user with id ${user.id}: ${error}`);
        throw error;
    }
}

export async function retrieveAllUsers(): Promise<User[]> {
    try {
        const users = await User.findAllUsers();
        console.log('Successfully retrieved all users from database.');
        return users;
    } catch (error) {
        console.error(`Error retrieving all users from database: ${error}`);
        throw error;
    }
}

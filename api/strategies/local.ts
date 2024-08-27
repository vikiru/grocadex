import { User } from '@prisma/client';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { validateUser } from '../services/authService';
import { retrieveUserById } from '../services/userService';

passport.serializeUser((user: User, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await retrieveUserById(id);
        if (!user) throw new Error(`User not found with the id: ${id}`);
        done(null, user.id);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    'local',
    new Strategy(async (username: string, password: string, done) => {
        try {
            const user = await validateUser(username, password);
            if (!user) {
                throw new Error(`Invalid credentials provided, please try again.`);
            }
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }),
);

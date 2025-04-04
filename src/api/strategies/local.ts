import { AuthService, UserService } from '~services';
import passport from 'passport';
import { Strategy } from 'passport-local';

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await UserService.retrieveUserById(id);
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
            const user = await AuthService.validateUser(username, password);
            if (!user) {
                console.error(
                    'Invalid credentials provided. Please try again.',
                );
                return done(null, false);
            }
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }),
);

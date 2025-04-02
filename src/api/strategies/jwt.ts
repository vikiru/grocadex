import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { secret } from '~config/index';

passport.use(
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        },
        (payload, done) => {
            try {
                if (!payload) {
                    return done(new Error('Invalid token payload'), false);
                }
                return done(null, payload);
            } catch (error) {
                console.error(error);
                return done(error, false);
            }
        },
    ),
);

const Joi = require('joi');
const Constants = require('../../../../constants');

module.exports = {
    method: 'GET',
    path: '/api/v1/users/{username}',
    options: {
        tags: ['api', Constants.TAGS.USERS],
        description: 'Get user profile info',
        notes: "Use the 'metadata' query params for better info",
        auth: {
            strategy: 'session',
            mode: 'try',
        },
        validate: {
            params: { // this lets us make our swagger docs dynamic as well
                username: Joi.string().description('Username from GitHub'),
            },
            query: {
                metadata: Joi.boolean().description('Include user metadata'),
            },
        },
        handler: async (request, h) => {
            console.log('request.info: ', request.info);
            const {
                params: { username },
                query,
                server: { app: { Database: { User } } },
            } = request;

            const [user] = query.metadata
                ? await User.where('username', username, true)
                : await User.where('username', username);

            if (!user) return { msg: 'There is no user' };
            // if (user.isLoggedIn(request)) user.isUser = true; // TODO would you ever need this?
            return user;
        },
    },
};

module.exports = {
    PORT: process.env.PORT || '5001',
    MONGO_URL: process.env.MONGO_URL || 'http://localhost:27081',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@email.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '12345',
    FRONTEND_URL: process.env.FRONTEND_URL || 'google.com',
}
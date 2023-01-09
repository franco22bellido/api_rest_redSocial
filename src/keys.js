export default {
    server_port : process.env.server_port || 3000,
    host_db : process.env.host_db || 'localhost',
    user_db : process.env.user_db || 'franco',
    password_db : process.env.password_db || '12345aAA',
    name_db : process.env.name_db || 'red_social_final',
    secret: process.env.secret || 'palabra_secreta'
}
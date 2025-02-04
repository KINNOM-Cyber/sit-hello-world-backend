const env = process.env

module.exports = {
    host: env['HOST'],
    port: env['DB_PORT'],
    username: env['USERNAME'],
    password: env['PASSWORD'], 
    database: "my_db"
}
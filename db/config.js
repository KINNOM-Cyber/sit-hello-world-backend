const env = process.env

module.exports = {
    host: env['HOST'],
    port: parseInt(env['DB_PORT']),
    user: env['USERNAME'],
    password: env['PASSWORD'], 
    database: "mydb"
}
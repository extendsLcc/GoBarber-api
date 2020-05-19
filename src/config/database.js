module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '1234',
    database: 'gobarber-postgres',
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true
    }
};
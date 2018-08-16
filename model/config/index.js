const setting = require('./default.js')

var all = {
    sequelize: {
        database: setting.database.database,
        username: setting.database.username,
        password: setting.database.password,
        define: {
            charset: 'utf8'
        },
        host: setting.database.host,
        dialect: setting.database.dialect,
        operatorsAliases: 'false'
    },
	email: {
		user: setting.email.user,
		pass: setting.email.pass
	}
}

module.exports = all;

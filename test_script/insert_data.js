const Sequelize = require('sequelize')
const sequelize = new Sequelize('mydb', 'root', null, {
    dialect: 'mysql',
    host: 'localhost',
    define: {
      charset: 'utf8'
    }
});


const path = __dirname + "/";

ff('accounts');
ff('articleTags');
ff('topNews');
ff('messages');
ff('collections');
ff('discusses');
ff('proposalAgrees');
ff('proposalClasses');
ff('proposalTags');
ff('proposals');
ff('tags');
ff('replies');


function ff(s) {
    sequelize.query("load data local infile '" + path + s + ".data" + "' into table " + s).then(res => {
        console.log("processing..." + s);
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
}

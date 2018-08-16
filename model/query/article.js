const db = require('../sqldb')
const tag = db.models.tag;

function addArticle(vital, data) {

	// Promise array
	const pa = new Array();
	
	const target = vital?db.models.topNews:db.models.message;
	pa.push(new Promise((resolve, reject) => {
	  db.sequelize.transaction( t => {
	  	target.create({
	  	  studentId: data.studentId,
	  	  title: data.title,
	  	  content: data.content
	  	})
	  	.then( res => {
	        // return the articleId
	  	  resolve(res.getDataValue('id'));
	    })
	  })
  }));

	for (var i=0; i<data.tags.length; ++i) {
	  pa.push(new Promise((resolve, reject) => {
		const tag = data.tags[i];
		db.sequelize.transaction( t => {
	  	  db.models.tag.findOrCreate({
	  	    where: { title: tag }
	  	  })
		  .then (res => {
			  resolve(res[0].getDataValue('id'));
		  });
		});
	  }));
	};

	Promise.all(pa)
		.then( res => {
			for (var i=1; i<res.length; ++i) {
				db.models.articleTag.create({
					tagId: res[i],
					newsId: res[0]
				})
				.then( res=> {
					console.log(res.dataValues);
				});
			}
		});
}

function delArticle(id) {
  db.sequelize.transaction( t=> {
    article.findById(id)
    .then( res => {
      res.destroy();
    });
  });
}

function getArticle(type, sum, offset) {
	const target = type?db.models.message:db.models.topNews;
  return new Promise( (resolve, reject) => {
  	target.findAll({
	    order: ['id'],
	    offset: offset,
	    limit: sum
	  })
	  .then( res => {
	    var tmp = [];
	    res.forEach( ele => {
		    tmp.push(ele.dataValues);
	    });
	    resolve(tmp);
	  });
  });
}

function getAccountArticle(student) {
  return new Promise( (resolve, reject) => {
    article.findAll({
      where: {
        studentId: student
      }
    })
    .then( res => {
      resolve(/* TODO: dataValues in different elements*/);
    });
  });
}


module.exports = {
  add: addArticle,
  getArticle: getArticle
}

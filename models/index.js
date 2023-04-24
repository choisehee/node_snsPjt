'use strict';

// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
const User = require('./user');
const Comment = require('./comment');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

//연결객체 재상용
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;


//연결객체를 위한거
db.User = User;         //db라는 객체에 USer와 COmment 모델을 담아둠, 앞으로 db객체를 require하여 User와 Comment모델에 접근 가능
db.Comment = Comment;

User.init(sequelize);   //각각의 모델의 static.init메서드를 호출 init이 실행되어양 테이블이 모델ㄹ로 연결됨
Comment.init(sequelize);

//다른 테이블과의 관계를 연결하는 associatea메서드
User.associate(db);
Comment.associate(db);

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });
//
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
//
// db.sequelize = sequelize; // 연결 객체를 재사용하기 위해 넣어놈
// db.Sequelize = Sequelize;

module.exports = db;

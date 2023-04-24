const Sequelize = require('sequelize');


module.exports = class User extends Sequelize.Model {

    //모델은 크게 static init 메서드와 static associate 메서드로 나뉨
    //init 메서드에는 테이블에 대한 설정을 하고, associate 메서드에는 다른 모델과의 관계를 적습니다.

    static init(sequelize) {
        return super.init({ //첫번째 인수가 테이블 칼럼에 대한 설정
                                    //시퀄라이즈는 알아서 id를 기본 키로 연결하므로 id칼럼은 적어줄 필요가 없다 mysql테이블과 칼럼 내용이 일치해야 정확하게대응됨
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, { //두번째 인수가 테이블에 대한 설정
            
            sequelize,              // static init 메서드의 매개 변수와 연결되는 옵션으로  db.sequelize 객체를 넣어야 함 , 나중에 model/index.js에서 연결
            timestamps: false,      // 이 속성 값이 true이면 시퀄라이즈는 createdAt과 updated 칼럼을 추가함
            underscored: false,     //시퀄라이즈는 기본적으로 테이블명과 칼럼명을 camel case로 만듬, 이를 snake case(created_at)로 바꾸는 옵션
            modelName: 'User',      //모델 이름을 설정, 노드 프로젝트에서 사용
            tableName: 'users',     //실제 데이터베이스의 테이블 이름, 기본적으로 모델 이름은 소문자 및 복수형으로 만듦
            paranoid: false,        //true로 설정하면 deletedAt이라는 칼럼이 생김, 로우를 삭제할 때 완전히 지워지지 않고 deletedAt에 지운 시각이 기록
            charset: 'utf8',        //
            collate: 'utf8_general_ci',
        });
    }


    static associate(db) {
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    }


}
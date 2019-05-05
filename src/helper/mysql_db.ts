const Sequelize = require('sequelize');
const seq = new Sequelize('MyMusicData', 'root', '123456', {
    host: '127.0.0.1', port: '3306', dialect: 'mysql', pool: {
        max: 100,
        min: 0,
        idle: 10000
    }
});
export class MysqlDB {
    Song() {
        return seq.define('song', {
            Id: { //id
                type: Sequelize.BIGINT,
                allowNull: true,
                primaryKey: true,
                autoIncrement: true
            },
            MId: { //用户名称
                type: Sequelize.BIGINT,
                allowNull: true
            }
        })
    }
    Comment = seq.define('comment', {
        Id: {
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: Sequelize.BIGINT
        },
        MId: {
            type: Sequelize.STRING
        },
        UserName: {
            type: Sequelize.STRING
        },
        Date: {
            type: Sequelize.DATE
        },
        Author: {
            type: Sequelize.STRING
        },
        CreateTime: {
            type: Sequelize.DATE
        },
        HeadImg: {
            type: Sequelize.STRING
        },
        Like: {
            type: Sequelize.INTEGER
        },
        Content: {
            type: Sequelize.STRING
        }
    })
}

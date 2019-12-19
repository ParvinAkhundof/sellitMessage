var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');


var Chat = sequelize.define("chat",{
    chat_id : {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      allowNull : false,
      primaryKey : true
    },
    product_id : {
      type: Sequelize.BIGINT(11)
    },
    sender_id : {
        type: Sequelize.BIGINT(11),
      allowNull : false,
    },
    receiver_id : {
        type: Sequelize.BIGINT(11),
      allowNull : false,
    },
    message : {
      type: Sequelize.TEXT,
      allowNull : false,
    },
    created_date : {
      type: Sequelize.DATE,
      allowNull : false,
    },
    modified_date : {
      type: Sequelize.DATE,
      allowNull : false,
    },
  }
)
module.exports=Chat;


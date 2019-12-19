var Sequelize = require('sequelize');
var sequelize = require('../common/mysql');

var Category = sequelize.define("category",{
    category_id : {
      type: Sequelize.BIGINT(11),
      autoIncrement: true,
      allowNull : false,
      primaryKey : true
    },
    parent_id : {
      type: Sequelize.BIGINT(11)
    },
    name : {
      type: Sequelize.STRING(20),
      allowNull : false,
    },
    description : {
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
module.exports=Category;


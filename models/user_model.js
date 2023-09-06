const db = require('../database/database.js');
module.exports={ 
  addregister:function(inputData,callback){
    var sql = 'INSERT INTO user SET ?'; 
    db.query(sql, inputData,function (err, data) {
    if (err) throw err;
      return callback(data);
    });
  },
  loginDetails:function(username,callback){
    var sql=`SELECT * FROM user where username = "${username}"`;
    db.query(sql, function (err, data) {
    if (err) throw err;
    return callback(data);
    });  
  },

  updateData:function(inputData,userid,callback){
    
    var sql = `UPDATE user SET ? WHERE id= ?`;
    db.query(sql, [inputData, userid], function (err, data) {
    if (err) throw err;
     return callback(data);
  });
  }
}



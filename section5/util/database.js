const mysql = require('mysql2'); 

//connection pool 설정
//connection은 쿼리마다 단일, 단발성이라서 pool로 쿼리 발생시마다 pool로부터 connection을 가져와서 지속 사용 가능
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'udemy_node',
    password:'wkddndud1!'
});

//.promise() 사용해서 비동기적 데이터 처리 및 promise chaining 사용 가능
module.exports = pool.promise();
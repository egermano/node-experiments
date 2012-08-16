var mysql = require('mysql');

var client = mysql.createClient({
    user: 'root',
    password: 'root'
});

client.useDatabase('unipac_2021');

client.query('SELECT * FROM users', function(err, results, fields){
    if (err) throw err;
    console.log(fields);
    console.log(results);

    return true;
});
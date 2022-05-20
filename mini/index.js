const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
});
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.post('/addTodo', (req, res) => {
    // if string includes only spaces
    if (req.body.newTodo.trim() === '') return res.redirect('/');
    let sql = `INSERT INTO todos (todo) VALUES ('${req.body.newTodo}')`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/')
    })
    
});

app.post('/delete/:id', (req, res) => {

    let sql = `DELETE FROM todos WHERE id = ${req.params.id}`;
    con.query(sql, (err) => {
        if (err) throw err;
        res.redirect('/')

    })
})


app.get('/', (req, res) => {
    
    
    let sql = `SELECT * FROM todos`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.render("index", { todos: result });
    })

});




app.listen(port)
console.clear()


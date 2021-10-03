const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values ('Borba')`
connection.query(sql)


//connection.end()

function getPeoples(callback){
    var peoples = []
    connection.query('SELECT id, name FROM people', (err, rows) => {
        if (err) throw err
        
        callback(rows)
    })
}




app.get('/', (req, res) => {

    getPeoples(function(peoples){
        let listPeoples = '<ul>'
        for (const people of peoples) {
            listPeoples += '<li>'
            listPeoples += people.name
            listPeoples += '</li>'
        }
        listPeoples += '</ul>'
        
        res.send('<h1>FullCycle</h1>' + listPeoples) 
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
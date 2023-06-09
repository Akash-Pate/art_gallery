const express = require("express");
const con = require("./config");
const bodyParser = require('body-parser')
const app = express();

const port = 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('connection'));

app.get("/customer", (req, resp) => {
    con.query("select * from customers", (err, result) => {
        if (err) {
            resp.send("route done")
        } else {
            resp.send(result);
        }
    });
});


app.post('/', (req, res) => {
    const data = req.body;
    con.query('INSERT INTO customers set ? ', data, (error, results, fields) => {
        if (error) throw error;
        res.send('Data saved to database!');
    });
});

app.put("/:id", (req, resp) => {
    const data = [req.body.name, req.body.price, req.body.image_url, req.body.status, req.body.seller_id, req.params.id];
    con.query('UPDATE customers SET name = ?, price = ?, image_url = ?, status = ?, seller_id = ? where id = ?', data, (error, results, fields) => {
        if (error) throw error;
        resp.send(results);
    });
});

app.delete("/:id",(req,resp)=>{
    con.query('DELETE from customers WHERE id ='+req.params.id,(error, results, fields)=> {
        if (error) throw error;
        resp.send(results);
    }) 
})



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
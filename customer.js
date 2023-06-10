const express = require("express");
const con = require("./config");
const bodyParser = require('body-parser')
const app = express();

const port = 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('connection'));

app.get("/customer", (req, resp) => {
    try {
        con.query(`SELECT * FROM customers`, (err, result) => {
            if (err) {
                resp.status(500).send("Error retrieving customers");
            } else {
                resp.status(200).send(result);
            }
        });
    } catch (err) {
        resp.status(500).send("Error retrieving customers");
    }
});
  
app.post("/", (req, res) => {
    try {
        const data = req.body;
        con.query(`INSERT INTO customers SET ?`, data, (error, results, fields) => {
            if (error) {
                throw error;
            } else {
                res.status(200).send("Data saved to database!");
            }
        });
    } catch (err) {
        res.status(500).send("Error saving data to database");
    }
});
  
app.put("/:id", (req, resp) => {
    try {
        const data = [
            req.body.name,
            req.body.email_address,
            req.body.password,
            req.params.id,
        ];
        con.query(
            `UPDATE customers SET (name = ?, email_address = ?, password = ?  
             WHERE customer_id = ?`, data,(error, results, fields) => {
                if (error) {
                    throw error;
                } else {
                    resp.status(200).send(results);
                }
            }
        );
    } catch (err) {
        resp.status(500).send("Error updating customer");
    }
});

  
app.delete("/:id", (req, resp) => {
    try {
        con.query(
            `DELETE FROM customers WHERE id = ` + req.params.id,
            (error, results, fields) => {
                if (error) {
                    throw error;
                } else {
                    resp.status(200).send(results);
                }
            }
        );
    } catch (err) {
        resp.status(500).send("Error deleting customer");
    }
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
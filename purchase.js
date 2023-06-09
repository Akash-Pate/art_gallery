const express = require("express");
const con = require("./config");
const bodyParser = require('body-parser')
const app = express();

const port = 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('connection'));

app.get("/purchase", (req, resp) => {
    try {
        con.query(`SELECT * FROM purchases`, (err, result) => {
            if (err) {
                resp.status(500).send("Error retrieving purchases");
            } else {
                resp.status(200).send(result);
            }
        });
    } catch (err) {
        resp.status(500).send("Error retrieving purchases");
    }
});
  
app.post("/", (req, res) => {
    try {
        const data = req.body;
        con.query(`INSERT INTO purchases SET ?`, data, (error, results, fields) => {
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
            req.body.date,
            req.body.quantity,
            req.body.amount,
            req.body.painting_id,
            req.body.customer_id,
            req.params.id,
        ];
        con.query(
            `UPDATE purchases SET (date, quantity, amount, painting_id, customer_id), 
             Values (?, ?, ?, ?, ?), 
             WHERE id = ?`, data,
            (error, results, fields) => {
                if (error) {
                    throw error;
                } else {
                    resp.status(200).send(results);
                }
            }
        );
    } catch (err) {
        resp.status(500).send("Error updating purchase");
    }
});

  
app.delete("/:id", (req, resp) => {
    try {
        con.query(
            `DELETE FROM purchases WHERE id = ` + req.params.id,
            (error, results, fields) => {
                if (error) {
                    throw error;
                } else {
                    resp.status(200).send(results);
                }
            }
        );
    } catch (err) {
        resp.status(500).send("Error deleting purchase");
    }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
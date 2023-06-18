const express = require("express");
const con = require("./config");
const bodyParser = require('body-parser')
const app = express();

const port = 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('connection'));

// Get all purchases
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
  
//New purchase made
app.post("/create_purchase", (req, res) => {
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
  

//update purchase details
app.put("/update_purchase", (req, resp) => {
    try {
        const data = req.body
           
        con.query(
            `UPDATE purchases SET quantity = ?, amount = ?, painting_id = ?, customer_id = ? WHERE purchase_id = ?`,
             [data.quantity, data.amount, data.painting_id, data.customer_id, data.purchase_id], 
             (error, results, fields) => {
                if (error) {
                    console.error("Error executing query:", error);
                    throw error;
                } else {
                    console.log("Update successful. Affected rows:", results.affectedRows);
                    resp.status(200).send(results);
                }
            }
        );
    } catch (err) {
        console.error("Error updating purchase:", err);
        resp.status(500).send("Error updating purchase");
    }
});

//Delete purchases   
app.delete("/delete_purchase", (req, resp) => {
    try {
        const data = req.body
        con.query(
            `UPDATE purchases SET quantity = ?, amount = ?, painting_id = ?, customer_id = ? WHERE purchase_id = ?`,
             [data.quantity, data.amount, data.painting_id, data.customer_id, data.purchase_id], 
             (error, results, fields) => {
                if (error) {
                    console.error("Error executing query:", error);
                    throw error;
                } else {
                    console.log("Update successful. Affected rows:", results.affectedRows);
                    resp.status(200).send(results);
                }
            }
        );
    } catch (err) {
        console.error("Error updating purchase:", err);
        resp.status(500).send("Error updating purchase");
    }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const express = require("express");
const con = require("./config");
const bodyParser = require('body-parser')
const app = express();

const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('connection'));

app.get("/painting", (req, resp) => {
    try {
        con.query(`SELECT * FROM paintings`, (err, result) => {
            if (err) {
                resp.status(500).send("Error retrieving paintings");
            } else {
                resp.status(200).send(result);
            }
        });
    } catch (err) {
        resp.status(500).send("Error retrieving paintings");
    }
});
  
app.post("/", (req, res) => {
    try {
        const data = req.body;
        con.query(`INSERT INTO paintings SET ?`, data, (error, results, fields) => {
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
            req.body.price,
            req.body.image_url,
            req.body.status,
            req.body.seller_id,
            req.params.id,
        ];
        con.query(
            `UPDATE paintings SET name = ?, price = ?, image_url = ?, status = ?, seller_id = ?
            WHERE painting_id = ?`,data,(error, results, fields) => {
                if (error) {
                    throw error;
                } else {
                    resp.status(200).send(results);
                }
            }
        );
    } catch (err) {
        resp.status(500).send("Error updating painting");
    }
});

  
app.delete("/:id", (req, resp) => {
    try {
        con.query(
            `DELETE FROM paintings WHERE id = ` + req.params.id,
            (error, results, fields) => {
                if (error) {
                    throw error;
                } else {
                    resp.status(200).send(results);
                }
            }
        );
    } catch (err) {
        resp.status(500).send("Error deleting painting");
    }
});
  

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
const express = require("express");
const con = require("./config");
const bodyParser = require('body-parser')
const app = express();

const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('connection'));

//Get all paintings 
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


// app.get("/joins", (req, resp) => {
//     try {
//         const sql = `SELECT paintings.painting_id, sellers.name 
//         FROM sellers 
//         FULL outer JOIN paintings 
//         ON sellers.seller_id = paintings.seller_id
//         ORDER BY seller.name`

//         con.query(sql, (err, result) => {
//             if (err) {
//                 console.error('Error executing query:', err);
//                 resp.status(500).send("Error retrieving paintings");
//             } else {
//                 resp.status(200).send(result);
//             }
//         });
//     } catch (err) {
//         resp.status(500).send("Error retrieving paintings");
//     }
// });


// post new paintings
app.post("/create_painting", (req, res) => {
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


// update paintings
app.put("/update_painting", (req, resp) => {
    try {
        const data = req.body

        con.query(
            `UPDATE paintings SET name = ?, price = ?, image_url = ?, status = ?, seller_id = ? 
             WHERE painting_id = ?`,
            [data.name, data.price, data.image_url, data.status, data.seller_id, data.customer_id],
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
        console.error("Error updating painting:", err);
        resp.status(500).send("Error updating painting");
    }
});


// delete a painting
app.delete("/delete_painting", (req, resp) => {
    try {
        const data = req.body

        con.query(
            `UPDATE paintings SET name = ?, price = ?, image_url = ?, status = ?, seller_id = ? 
             WHERE painting_id = ?`,
            [data.name, data.price, data.image_url, data.status, data.seller_id, data.customer_id],
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
        console.error("Error deleting painting:", err);
        resp.status(500).send("Error deleting painting");
    }
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
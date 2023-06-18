const express = require("express");
const con = require("./config");
const bodyParser = require('body-parser')
const app = express();

const port = 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('connection'));

//Get all sellers
app.get("/seller", (req, resp) => {
    try {
        con.query(`SELECT * FROM sellers`, (err, result) => {
            if (err) {
                resp.status(500).send("Error retrieving sellers");
            } else {
                resp.status(200).send(result);
            }
        });
    } catch (err) {
        resp.status(500).send("Error retrieving sellers");
    }
});

//Create a new seller
app.post("/create_seller", (req, res) => {
    try {
        const data = req.body;
        console.log("Request body:", data);

        const password = data.password;
        console.log("Received password:", password);

        const hashedPassword = bcrypt.hashSync(password, 10);
        console.log("Hashed password:", hashedPassword);

        data.password = hashedPassword;
        con.query(`INSERT INTO sellers SET ?`, data, (error, results, fields) => {
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


//Update a seller
app.put("/update_seller", (req, resp) => {
    try {
        const data = req.body;
        console.log("Request body:", data);

        const password = data.password;
        console.log("Received password:", password);

        const hashedPassword = bcrypt.hashSync(password, 10);
        console.log("Hashed password:", hashedPassword);

        data.password = hashedPassword;

        con.query(
            `UPDATE sellers SET name=?, email_address=?, password=?, status=?
             WHERE customer_id=?`,
            [data.name, data.email_address, data.password, data.status, data.customer_id],
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
        console.error("Error updating seller:", err);
        resp.status(500).send("Error updating seller");
    }
});

//Delete a seller  
app.delete("/delete_seller", (req, resp) => {
    try {
        const data = req.body;
        con.query(
            `UPDATE sellers SET name=?, email_address=?, password=?, status=? 
             WHERE customer_id=?`,
            [data.name, data.email_address, data.password, data.status, data.customer_id],
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
        console.error("Error deleting seller:", err);
        resp.status(500).send("Error deleting seller");
    }
});



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

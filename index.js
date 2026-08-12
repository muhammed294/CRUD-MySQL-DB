const express = require("express");
const path = require("path");
const mysql = require("mysql2");

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`listening ${PORT}`);
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
// console.log(__dirname);

const connection = mysql.createConnection({
    host: "localhost",
    user: "crudmysqldb",
    password: "crudmysqldb",
    database: "crudmysqldb",
});

connection.connect((err) => {
  if (err) {console.log(err)}
  else {console.log("connected to MySQL")};
});

//Card info
app.post("/card", async (req, res) => {
    const { patientName, age, phoneNumber, address } = req.body;
    // console.log("POST/card");
    // console.log(req.body);
    const sql =` 
        INSERT INTO patient_info
        (Patient_name, Age, Phone_number, Address)
        VALUES (?, ?, ?, ?)
    `;

    const sqlChecker =` 
        SELECT * FROM patient_info
        WHERE Patient_name = ?
    `;

    connection.query(sqlChecker, [patientName], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database error."
            });
        }

        if (result.length > 0) {

            return res.json({
                success: false,
                message: "You are already signed up. Please login."
            });
        }

        connection.query(
            sql,
            [patientName, age, phoneNumber, address],
            (err) => {

                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        success: false,
                        message: "Signup failed."
                    });
                }

                res.json({
                    success: true,
                    message: "Signup successful!"
                });

            }
        );

    });
});

//get patient Info
app.get("/patient/info", async (req, res) => {
    const { Card_id } = req.query;

    const sql =` 
        SELECT * FROM patient_info
        WHERE Card_id = ?
    `;

    connection.query(sql, [Card_id], (err, result) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database error."
            });
        } 
        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "There is no patient on this card no"
            });
        }
        if (result.length > 0) {

            return res.json({
                success:true,
                patient: result[0]
            });
            
        }
        console.log(res.json(result));
    });
});

//update info
app.put("/update/info", (req, res) => {

    const {
        Card_id,
        updatedPatientName,
        updatedAge,
        updatedPhoneNumber,
        updatedAddress
    } = req.body;


    const sqlChecker = `
        SELECT * FROM patient_info
        WHERE Card_id = ?
    `;

    connection.query(sqlChecker, [Card_id], (err, result) => {

        if (err) {
            console.log("SELECT error:", err);

            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        const sql = 
            `UPDATE patient_info
            SET 
                Patient_name = ?,
                Age = ?,
                Phone_number = ?,
                Address = ?
            WHERE Card_id = ?
        `;

        connection.query(sql,[
                updatedPatientName,
                updatedAge,
                updatedPhoneNumber,
                updatedAddress,
                Card_id
            ],(err, result) => {

                if (err) {
                    console.log("UPDATE error:", err);

                    return res.status(500).json({
                        success: false,
                        message: "Database error"
                    });
                }

                return res.json({
                    success: true,
                    message: "Patient updated successfully"
                });
            }
        );
    });
});

//remove info
app.delete("/patient/:Card_id", (req, res) => {

    const { Card_id } = req.params;

    const sql =` 
        DELETE FROM patient_info
        WHERE Card_id = ?
    `;

    connection.query(sql, [Card_id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.json({
            success: true,
            message: "Patient removed successfully"
        });
    });
});
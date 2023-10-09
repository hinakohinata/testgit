const express = require('express');
const connection = require('../config/db.config');
const app = express();
const { Workbook } = require('exceljs');


app.get('/getforAddAsm1to6', (req, res) => {
    const sql = "SELECT u.user_id,u.name, p.name as pname FROM user u " +
        "LEFT JOIN assignment a ON u.user_id = a.user_id " +
        "inner join positions p on p.id=u.position_id " +
        "WHERE u.status = 1  AND a.user_id IS NULL " +
        "AND u.position_id BETWEEN 1 AND 6;";
    connection.query(sql, (error, result) => {
        if (error)
            res.status(500).send(error);
        else {
            res.json(result);
        }
    })
})
app.get('/getforAddAsm7', (req, res) => {
    const sql = "SELECT u.user_id,u.name, p.name as pname FROM user u " +
        "LEFT JOIN assignment a ON u.user_id = a.user_id " +
        "inner join positions p on p.id=u.position_id " +
        "WHERE u.status = 1  AND a.user_id IS NULL " +
        "AND u.position_id = 7;";
    connection.query(sql, (error, result) => {
        if (error)
            res.status(500).send(error);
        else {
            res.json(result);
        }
    })
})
app.get('/getforAddAsmStudent', (req, res) => {
    const sql = "SELECT u.student_id,u.name FROM student u " +
        " LEFT JOIN assignment_student a ON u.student_id = a.student_id " +
        "WHERE u.status = 1 AND a.student_id IS NULL;";
    connection.query(sql, (error, result) => {
        if (error)
            res.status(500).send(error);
        else {
            res.json(result);
        }
    })
})


app.post('/getStudentForAddFeeCollection', (req, res) => {
    const { fee_type_id, amount, note } = req.body;
    const sql = "SELECT s.student_id,s.name,s.identity_number,r.class_group_id " +
        "FROM student s " +
        "join assignment_student asms on asms.student_id=s.student_id and asms.status=1 " +
        "inner join room r on r.room_id=asms.room_id " +
        "LEFT JOIN fee_collection fc ON s.student_id = fc.student_id AND fc.academic = YEAR(CURDATE()) " +
        "and fc.fee_type_id= ? " +
        "WHERE fc.id IS NULL;";
    connection.query(sql, [fee_type_id], (error, result) => {
        if (error)
            res.status(500).send(error);
        else {
            const tmp = result.map(item => {
                return {
                    ...item,
                    fee_type_id: fee_type_id,
                    amount: amount,
                    note: note
                };
            });
            res.json(tmp);
        }
    })
})

app.get('/backup', async (req, res) => {
    try {
        const tableNames = ['positions', 'user', 'role_user',
            'class_group', 'room', 'student',
            'assignment', 'assignment_student', 'attendance',
            'checkin', 'evaluation', 'health',
            'message', 'notification', 'salary',
            'subject', 'fee_type', 'subject_assignment',
            'prescription', 'expense', 'menu',
            'fee_collection']; // Replace with your table names
        console.log(123)

        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Combined Tables');

        let currentRow = 1;
        console.log(345)

        for (let table of tableNames) {
            // const [rows] = await pool.query(`SELECT * FROM ${table}`);
            // console.log(table)

            const sql = `SELECT * FROM ${table}`;
            connection.query(sql, (error, result) => {
                if (error)
                    res.status(500).send(error);
                else {
                    const rows = result;
                    // Define columns in the worksheet
                    const columns = Object.keys(result[0]).map(key => {
                        return {
                            header: key,
                            key: key,
                            width: 10
                        };
                    });
                    worksheet.columns = columns;
                    rows.forEach(row => {
                        worksheet.addRow(row);
                        currentRow++;
                    });

                    currentRow += 3; // leave 3 blank rows after each table
                    console.log(result[0], columns)



                }
            })
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=combined_tables.xlsx');

            await workbook.xlsx.write(res);
            // // Define columns in the worksheet
            // const columns = Object.keys(rows[0]).map(key => {
            //     return {
            //         header: key,
            //         key: key,
            //         width: 10
            //     };
            // });

            // worksheet.columns = columns;

            // rows.forEach(row => {
            //     worksheet.addRow(row);
            //     currentRow++;
            // });

            // currentRow += 3; // leave 3 blank rows after each table
        }

        // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // res.setHeader('Content-Disposition', 'attachment; filename=combined_tables.xlsx');

        // await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).send('Error exporting data to Excel.');
    }

})

app.get('/export-to-excel1', async (req, res) => {
    try {
        const tableNames = ['positions', 'user', 'role_user',
            'class_group', 'room', 'student',
            'assignment', 'assignment_student', 'attendance',
            'checkin', 'evaluation', 'health',
            'message', 'notification', 'salary',
            'subject', 'fee_type', 'subject_assignment',
            'prescription', 'expense', 'menu',
            'fee_collection']; // Replace with your table names
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Combined Tables');
        let currentRow = 1;
        const allResults = await Promise.all(tableNames.map(table => {
            return new Promise((resolve, reject) => {
                const sql = `SELECT * FROM ${table}`;
                connection.query(sql, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            });
        }));

        for (let i = 0; i < allResults.length; i++) {
            const rows = allResults[i];

            // Define columns in the worksheet
            const columns = Object.keys(rows[0]).map(key => ({
                header: key,
                key: key,
                width: 10
            }));

            // Add the table headers
            worksheet.addRow(Object.keys(rows[0]));
            // Add the table rows
            rows.forEach(row => {
                worksheet.addRow(row);
                currentRow++;
            });
            worksheet.columns = columns;

            // rows.forEach(row => {
            //     worksheet.addRow(row);
            //     currentRow++;
            // });

            // Add 3 blank rows after each table
            for (let j = 0; j < 3; j++) {
                worksheet.addRow([]);
                currentRow++;
            }
            console.log(tableNames[i], "/n/n/n")
            console.log(allResults[i], columns)
        }

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=combined_tables.xlsx');

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        res.status(500).send('Error exporting data to Excel.');
    }
});

app.get('/export-to-excel', async (req, res) => {
    try {
        const tableNames = ['positions', 'user', 'role_user',
            'class_group', 'room', 'student',
            'assignment', 'assignment_student', 'attendance',
            'checkin', 'evaluation', 'health',
            'message', 'notification', 'salary',
            'subject', 'fee_type', 'subject_assignment',
            'prescription', 'expense', 'menu',
            'fee_collection'];

        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Combined Tables');

        const allResults = await Promise.all(tableNames.map(table => {
            return new Promise((resolve, reject) => {
                const sql = `SELECT * FROM ${table}`;
                connection.query(sql, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            });
        }));

        for (let i = 0; i < allResults.length; i++) {
            const rows = allResults[i];

            // Add a header indicating table name
            worksheet.addRow([tableNames[i]]);

            // Add the table headers without setting the worksheet columns
            worksheet.addRow(Object.keys(rows[0]));

            // Add the table rows
            rows.forEach(row => {
                worksheet.addRow(Object.values(row));
            });

            // Add 3 blank rows after each table
            for (let j = 0; j < 3; j++) {
                worksheet.addRow([]);
            }
        }

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=combined_tables.xlsx');

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        res.status(500).send('Error exporting data to Excel.');
    }
});










































const fileUpload = require('express-fileupload');
const ExcelJS = require('exceljs');
app.use(fileUpload());

module.exports = app;
app.post('/import-from-excel', async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const uploadedFile = req.files.myFile; // 'myFile' should match the "name" attribute in your file input
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(uploadedFile.data);

        const worksheet = workbook.getWorksheet('Combined Tables'); // or any other sheet name

        // Read data from worksheet
        // Adjust this part based on your Excel structure
        let data = [];
        worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
            if (rowNumber > 1) { // skipping header row
                const rowData = {};
                row.eachCell(function(cell, colNumber) {
                    rowData[worksheet.getRow(1).getCell(colNumber).text] = cell.text;
                });
                data.push(rowData);
            }
        });

        // Save data to DB
        for (let item of data) {
            // Insert into your tables accordingly. Below is just a basic example.
            // await pool.query('INSERT INTO your_table SET ?', item);
            console.log(item)
        }

        // res.send('Data imported successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error importing data.');
    }
});

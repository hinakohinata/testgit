const express = require('express');
const connection = require('../config/db.config');
const app = express();
const { Workbook } = require('exceljs');

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
        // res.end();
        console.log('Exporting data to Excel.')
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
        let colNumber1 = 0
        worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            const rowData = [];
            colNumber1++
            // console.log("row ", colNumber1)
            for (let colNumber = 1; colNumber <= worksheet.columnCount; colNumber++) {
                const header = worksheet.getRow(1).getCell(colNumber).text;
                const value = row.getCell(colNumber).text;
                rowData[colNumber - 1] = value;
                // console.log(colNumber,"-> at[",colNumber1,colNumber,"]:/t ",header,"//t value: /t",value);

            }

            // console.log(rowData);

            data.push(rowData);
        });
        setSaveToDB(data);
        console.log("importing data")
        res.json("importing data")
    } catch (error) {
        console.error(error);
        res.status(500).send('Error importing data.');
    }
});

function setSaveToDB(data) {
    let tableName = "";
let fields = [];
let records = [];
let isTableNameRow = true;
let isEmptyRowEncountered = false;

data.forEach((row, index) => {
    // Nếu dòng rỗng
    if (row.every(cell => !cell)) {
        // Nếu dòng tiếp theo là tên bảng hoặc không có dòng nào tiếp theo
        if (data[index + 1] && !data[index + 1].every(cell => !cell) && data[index + 1][0]) {
            // Lưu dữ liệu hiện tại vào DB (nếu có)
            if (tableName) {
                saveToDB1(tableName, fields, records);
            }
            
            // Reset biến
            tableName = "";
            fields = [];
            records = [];
            isTableNameRow = true;
            isEmptyRowEncountered = false;
        }
        return;
    }

    // Xử lý tên bảng
    if (isTableNameRow) {
        tableName = row[0];
        isTableNameRow = false;
        return;
    }

    // Xử lý tiêu đề cột
    if (!fields.length) {
        fields = row;
        return;
    }

    // Xử lý dữ liệu
    records.push(row);
});

// Lưu dữ liệu còn lại
if (tableName) {
    saveToDB1(tableName, fields, records);
}

}

// Hàm lưu dữ liệu vào CSDL
function saveToDB1(tableName, data) {
    console.log("tableName", tableName)
    // console.log("data", data)
    const arr = data[0];
    let tmp = 0;
    if (!Array.isArray(data) || !Array.isArray(data[0])) {
        console.error('Data is not in the expected format.');
        return;
    }
    for (let item of arr) {
        if (item !== '') {
            tmp++;
        }
    }
    let fields = []
    for (let i = 0; i < tmp; i++) {
        fields.push(arr[i])
    }
    let fieldList = fields.join(',');
    let upList = fields.map(field => `${field}=VALUES(${field})`).join(', ');
    // console.log("fieldList",fieldList)
    let valueList = "";
    stt = 0;
    let dataList = [];
    for (let item of data) {
        if (stt > 0) {
            let fields = []
            for (let i = 0; i < tmp; i++) {
                fields.push(item[i])
            }

            const formattedFields = fields.map(formatValue);
            dataList.push(`(${formattedFields.join(',')})`);
        }
        stt++
    }
    valueList = dataList.join(',');
    // console.log("valueList",dataList)
    let sql = `INSERT IGNORE INTO ${tableName} (${fieldList}) VALUES ${valueList} ON DUPLICATE KEY UPDATE ${upList}`;

    connection.query(sql, (error, result) => {
        if (error) {
            // console.log(error)
            res.status(500).send(error);
        }
        else {
            // console.log(result)
            // res.json(result);
        }
    })
}
function formatValue(value) {
    if (value == '') {
        return `null`
    }
    if (typeof value == 'number') {
        return value;
    }
    return `'${value}'`;
}
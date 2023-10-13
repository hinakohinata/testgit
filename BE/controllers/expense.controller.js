const express = require('express');
const con = require('../config/db.config');
const app = express();

app.get('/getForTable', (req, res) => {
    const sql = "SELECT fc.*,ft.name ftname  FROM `expense` fc " +
        'INNER JOIN fee_type ft ON ft.id = fc.type ';
    con.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM `expense`";
    con.query(sql, function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})
app.get("/typeName", (req, res) => {
    const sql = `
      SELECT fee_type.id , fee_type.name
      FROM fee_type where status = 1;`
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.json(result);
    });
});
app.get('/search/:text', (req, res) => {
    const text = req.params.text;
    const sql = `
    SELECT expense.*, fee_type.name ftname
    FROM expense
    JOIN fee_type ON expense.type = fee_type.id
    WHERE fee_type.name LIKE ?
    `;
    con.query(sql, ['%' + text + '%'], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            console.log("API Search Results:", result);
            res.json(result);
        }
    })
});

app.get("/name/:fee_type_name", (req, res) => {
    const fee_type_name = `%${req.params.fee_type_name}%`; // Sử dụng dấu % trước và sau tên để tìm kiếm mọi nơi có từ khóa

    const sql = `
      SELECT expense.*
      FROM expense 
      INNER JOIN fee_type ON expense.type = fee_type.id 
      WHERE fee_type.name LIKE ?;
    `;

    con.query(sql, [fee_type_name], function (error, result) {
        if (error) res.status(500).send(error);
        res.json(result);
    });
});
app.get("/date/:date", (req, res) => {
    const date = req.params.date; 
    const sql = "SELECT expense.*, fee_type.name ftname FROM expense "+
    "JOIN fee_type ON expense.type = fee_type.id WHERE date = ?;";
    con.query(sql, [date], function (error, result) {
        if (error) res.status(500).send(error);
        res.json(result);
    });
});
app.post('/', (req, res) => {
    // const id = req.body.id;
    const type = req.body.type;
    const amount = req.body.amount;
    const date = req.body.date;

    if (!type) {
        res.status(500).send("Tên chi phí trống!");
    }
    else {
        const sql = "INSERT INTO `expense` (`type`,`amount`,`date`) VALUES (?,?,?);";
        con.query(sql, [type, amount, date], function (error, result) {
            if (error)
                res.status(500).send(error);
            res.json(result);
        })
    }
})


app.put('/:id', (req, res) => {
    const id = req.params.id;
    const type = req.body.type;
    const amount = req.body.amount;
    const date = req.body.date;

    if (!type) {
        res.status(500).send("Tên chi phí trống!");
    }
    else {
        const sql = "UPDATE `expense` SET `type` = ?, `amount` = ?, `date` = ? WHERE (`id` = ?);";
        con.query(sql, [type, amount, date, id], function (error, result) {
            if (error)
                res.status(500).send(error);
            res.json(result);
        })
    }
})


app.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM `expense` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else
            res.json(result);
    })
})



module.exports = app
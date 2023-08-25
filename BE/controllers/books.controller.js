const express = require('express');
const con = require('../config/db.config');
const app = express();

app.get('/', (req, res) => {
    const sql = "SELECT * FROM `books`";
    con.query(sql, function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})
app.get('/search/:text', (req, res) => {
    const text =req.params.text;
    const sql = "SELECT * FROM `books` WHERE (`name` like ?) ";
    con.query(sql,  ['%' + text + '%'],function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})

app.post('/', (req, res) => {
    // const id = req.body.id;
    const name = req.body.name;
    const authorId = req.body.authorId;
    const categoryId = req.body.categoryId;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const image = req.body.image;

    if (!name) {
        res.status(500).send("Tên task trống!");
    }
    else {
        const sql = "INSERT INTO `books` (`name`,`authorId`,`categoryId`,`price`, `quantity`,`image`) VALUES (?,?,?,?,?,?);";
        con.query(sql, [name, authorId, categoryId, price, quantity, image], function (error, result) {
            if (error)
                res.status(500).send(error);
            res.json(result);
        })
    }
})


app.put('/:id', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const authorId = req.body.authorId;
    const categoryId = req.body.categoryId;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const image = req.body.image;

    if (!name) {
        res.status(500).send("Tên book trống!");
    }
    else {
        const sql = "UPDATE `books` SET `name` = ?, `authorId` = ?, `categoryId` = ?, `price` = ?, `quantity` = ?, `image` = ? WHERE (`id` = ?);";
        con.query(sql, [name, authorId, categoryId, price, quantity, image, id], function (error, result) {
            if (error)
                res.status(500).send(error);
            res.json(result);
        })
    }
})

app.put('/send/:id', (req, res) => {
    const id = req.body.id;
    const checked_out = req.body.checked_out+1;

    if (!id) {
        res.status(500).send("Id trống!");
    }
    else {
        const sql = "UPDATE `books` SET  `checked_out` = ? WHERE (`id` = ?);";
        con.query(sql, [checked_out, id], function (error, result) {
            if (error)
                res.status(500).send(error);
            res.json(result);
        })
    }
})
app.put('/give/:id', (req, res) => {
    const id = req.body.id;
    const checked_out = req.body.checked_out-1;
    if (!id) {
        res.status(500).send("Id trống!"+id+checked_out);
    }
    else {
        const sql = "UPDATE `books` SET  `checked_out` = ? WHERE (`id` = ?);";
        con.query(sql, [checked_out, id], function (error, result) {
            if (error)
                res.status(500).send(error);
            res.json(result);
        })
    }
})

app.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM `books` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})

app.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM `books` WHERE id = ?;";
    con.query(sql, [id], function (error, result) {
        if (error)
            res.status(500).send(error);
        res.json(result);
    })
})



module.exports = app
const express = require("express");
const con = require("../config/db.config");
const nodemailer = require("nodemailer");
const app = express();
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'lamhtpk02207@fpt.edu.vn',
    pass: 'pbqu ncjo lzmo ptpm'
  }
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM `notification`";
  con.query(sql, function (error, result) {
    if (error) res.status(500).send(error);
    res.json(result);
  });
});

app.post("/", (req, res) => {
  const sender_id = req.body.sender_id;
  const receiver_id = req.body.receiver_id;
  const title = req.body.title;
  const content = req.body.content;
  const sent_date = req.body.sent_date;
  console.log(req.body, title);
  const sql = "INSERT INTO `notification` (`sender_id`, `receiver_id`, `title`, `content`, `sent_date`) VALUES (?,?,?,?,?);";
  con.query(sql, [sender_id, receiver_id, title, content, sent_date], function (error, result) {
    if (error) {
      res.status(500).send(error);
      res.json(result);
    }
    con.query('SELECT email FROM user WHERE user_id = ?', [receiver_id], (error, results) => {
      if (error) return res.status(500).send('Database error');
      const receiverMail = results[0].email;
      // Gửi email
      transporter.sendMail({
        from: 'Preschool',
        to: receiverMail,
        subject: title,
        html: `
        <html>
        <head>
            <style>
                /* CSS tùy chỉnh cho email */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #555;
                    font-size: 24px; /* Tăng kích thước nội dung */
                }
                .footer {
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                }
                .logo {
                    display: block;
                    margin: 10px auto;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <p>${content}</p>

                <!-- Footer -->
                <div class="footer">
                    <img src="https://iptime.com.vn/wp-content/uploads/2019/10/thiet-ke-logo-truong-mam-non-3.jpg" alt="Trường logo" width="100" class="logo"/>
                    <p>Trường ABC</p>
                    <p>Địa chỉ: 123 Đường XYZ, Thành phố A, Quốc gia B</p>
                    <p>Điện thoại: (012) 345-6789</p>
                    <p>Email: contact@truongabc.edu.vn</p>
                </div>
            </div>
        </body>
    </html>
        `, 
      }, (err, info) => {
        if (err) {
          console.error("Error sending email:", err);
          return res.status(500).send("Error sending email");
        }
        res.status(200).json({ ThongBao: "Thành công" + req.body.content });
      });
    });
  });
});

module.exports = app;

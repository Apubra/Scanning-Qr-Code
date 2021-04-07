const express = require("express");
const app = express();
const qr = require("qrcode");
const hbs = require("express-handlebars");
const path = require("path");

const port = 5000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "/public");
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// view engine setup
app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: path.join(__dirname, "views/partials"),
    })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.send("Welcome!");
});

app.get("/scanning", (req, res) => {
    qr.toDataURL("Apurba Daria", (err, src) => {
        if (err) res.send("Error occured");

        res.render("certificate", { layout: false, qrcode: src });
    });
});

app.get("/scanningbywebcam", (req, res) => {
    res.render("certificate", { layout: false });
    // res.render('anotherQrCodeScanner', {layout: false});
});

app.listen(port, () => console.log("Server at 5000"));

const express = require("express");
const app = express();
const fetch = require("node-fetch");
const fs = require("fs");
const bodyParser = require("body-parser");
const helmet = require("helmet");
var favMusic = require("./favoritesMusic.json");
var favBooks = require("./favoritesBooks.json");

app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());

//This app.get method uses the Api to find songs relating to what the user entered
app.get("/music", (req, res) => {
    fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(
      req.query.search
    )}&limit=10&entity=song`
        )
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            res.send(data.results);
        });
});

//This app.post method takes the information that the user selected as a favorite and adds it to "favoritesMusic.json"
app.post("/favoritesMusic", (req, res) => {
    favMusic.push(req.body);
    fs.writeFile("favoritesMusic.json", JSON.stringify(favMusic), err => {
        if (err) {
            console.log("Your file was not added to the json file", err);
        } else {
            console.log("Your file was added to the json file");
        }
    });
});

//This app.get method gets the information of all the songs in the "favoritesMusic.json" file and displays it in the app
app.get("/favoritesMusic", (req, res) => {
    fs.readFile("./favoritesBooks.json", (err, data) => {
        if (err) {
            console.log("Does not work");
        } else {
            res.send(favMusic);
        }
    });
});

//This app.delete method removes the the user selects from the favorites file
app.delete("/favoritesMusic", (req, res) => {
    console.log("access");
    favMusic = favMusic.filter(i => {
        return i.id != req.body.deleted;
    });
    fs.writeFile("favoritesMusic.json", JSON.stringify(favMusic), err => {
        if (err) {
            console.log(" it not working", err);
        } else {
            console.log("It is working");
        }
    });
});

//This app.get method uses the Api to find books relating to what the user entered
app.get("/book", (req, res) => {
    fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(
      req.query.search
    )}&limit=10&entity=ebook`
        )
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            res.send(data.results);
        });
});
//This app.post method takes the information that the user selected as a favorite and adds it to "favoritesBooks.json"
app.post("/favoritesBooks", (req, res) => {
    favBooks.push(req.body);
    fs.writeFile("favoritesBooks.json", JSON.stringify(favBooks), err => {
        if (err) {
            console.log("It's not working", err);
        } else {
            console.log("It's working");
        }
    });
});

//This app.get method gets the information of all the books in the "favoritesBooks.json" file and displays it in the app
app.get("/favoritesBooks", (req, res) => {
    fs.readFile("./favoritesBooks.json", (err, data) => {
        if (err) {
            console.log("cant read");
        } else {
            res.send(favBooks);
        }
    });
});

//This app.delete method removes the the user selects from the favorites file
app.delete("/favoritesBooks", (req, res) => {
    console.log("access");
    favBooks = favBooks.filter(i => {
        return i.id != req.body.deleted;
    });
    fs.writeFile("favoritesBooks.json", JSON.stringify(favBooks), err => {
        if (err) {
            console.log("It's not working", err);
        } else {
            console.log("It Works");
        }
    });
});

const path = require("path");
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
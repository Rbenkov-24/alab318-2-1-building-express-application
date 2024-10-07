import express from "express";
import morgan from "morgan";
import path from "path"; 

const app = express();
const PORT = 4000;

//setup
app.set("view engine", "pug");
app.set("views", "./views");

//middleware
app.use(express.static("public")); 
app.use(morgan("dev"));//logger

//routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/menu", (req, res) => {
    res.render("menu");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

//route to handle the menu download
app.get("/download-menu", (req, res) => {
    const file = path.resolve("public", "coffee_menu.jpg"); 
    res.download(file, "coffee_menu.jpg", (err) => {
        if (err) {
            console.error("Download error:", err);
            res.status(500).send("Error downloading file.");
        }
    });
});

//start the server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
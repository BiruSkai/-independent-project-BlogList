import express from "express";
import morgan from "morgan";

const port = 3000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
        res.render("index.ejs")
})

app.get("/view_blogs", (req, res) => {
        res.send("view blogs")
})

app.post("/create_blogs", (req, res) => {
        res.send("Create Blog")
})

app.listen(port, () => {
        console.log("Server listening to port: " + port)
})
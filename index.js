import express from "express";
import morgan from "morgan";

const port = 3000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(express.static("public"));

let blogList = [];

app.get("/", (req, res) => {
        res.render("index.ejs")
})

app.get("/view_blogs", (req, res) => {
        res.render("view_blogs.ejs", {blogList})
})

app.get("/write_blog", (req, res) => {
        res.render("write_blog.ejs")
})

app.post("/write_blog", (req, res) => {
        
        let time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        console.log("time" + time)

        const{title, blog} = req.body;
        let userInput = {time:time, title:title, blog:blog};

        blogList.push(userInput)
        console.log(blogList)

        res.render("view_blogs.ejs", {blogList})
})

app.listen(port, () => {
        console.log("Server listening to port: " + port)
})
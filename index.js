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

app.get("/view_titles", (req, res) => {
        res.render("view_titles.ejs", {blogList})
})

app.get('/reading_blog/:index', (req, res) => {
        let index = req.params.index;
        console.log("index: " + index);
        
        res.render("reading_blog.ejs", {blogList: blogList[index]});
})

app.get("/write_blog", (req, res) => {
        res.render("write_blog.ejs")
})

app.post("/write_blog", (req, res) => {
        
        let time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

        const{title, blog} = req.body;
        let userInput = {time:time, title:title, blog:blog};

        blogList.push(userInput)
        console.log(blogList)

        res.render("view_titles.ejs", {blogList})
})

app.listen(port, () => {
        console.log("Server listening to port: " + port)
})
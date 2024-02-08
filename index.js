import express from "express";
import morgan from "morgan";

const port = 3000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(express.static("public"));

let blogList = [];
let id = 0;

app.get("/", (req, res) => {
        res.render("index.ejs")
})

app.get("/view_titles", (req, res) => {
        res.render("view_titles.ejs", {blogList})
})

app.get('/reading_blog/:index', (req, res) => {
        let index = parseInt(req.params.index);
        console.log("index: " + index);
        console.log(blogList)

        const content = blogList.find(item => item.id === index)
        console.log(content)
        
        res.render("reading_blog.ejs", {blogList:content});
})

app.get("/write_blog", (req, res) => {
        res.render("write_blog.ejs", {submit:"Post Blog"})
})

app.get("/update_blog/:index", (req, res) => {
        const index = parseInt(req.params.index);
        const updateBlog = blogList.find(blog => blog.id === index)
        res.render("write_blog.ejs", {blogData:updateBlog, submit:"Update Blog", index});
})

app.post("/write_blog", (req, res) => {
        const {index, type, title, blog} = req.body;
        console.log("type, index: ", type, index);
        
        let time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

        
        if (type === "Post Blog") {
                id++ ;
                let userInput = {id, time, title, blog};
                blogList.push(userInput)
                console.log(blogList)
        
                res.render("view_titles.ejs", {blogList})
        } else {
                const findIndex = blogList.findIndex(blog => blog.id === parseInt(index));
                console.log("findIndex: ", findIndex);
                blogList[findIndex] = {
                        id:parseInt(index),
                        time,
                        title,
                        blog
                };
                console.log("updated blog: ", blogList[findIndex]);
                res.redirect(`/reading_blog/${index}`);
        }
})

app.post("/delete_blog/:index", (req, res) => {
        let index = parseInt(req.params.index);
        console.log("index: ", index)

        const trueIndex = blogList.findIndex(item => item.id === index);
        console.log("trueIndex: ", trueIndex);
        blogList.splice(trueIndex, 1);
  
        res.redirect("/view_titles")
})

app.listen(port, () => {
        console.log("Server listening to port: " + port)
})
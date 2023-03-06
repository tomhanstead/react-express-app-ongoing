//PUT 
//Edit an item
app.put("/edit", (req, res) => {
    const itemId = Number(req.body.id);
    let editedId = {
        id: itemId,
        title: title,
        description: description, 
        URL: URL
    }
    data.push(editedId)
    res.send(data)
    // const editedId = req.body;
    // console.log("Editing item: ", itemId, " to be ", editedId);
 
    // const updatedListItems = [];
    // // loop through list to find and replace one item
    // data.forEach(oldItem => {
    //    if (oldItem.id === itemId) {
    //       updatedListItems.push(editedId);
    //    } else {
    //       updatedListItems.push(oldItem);
    //    }
    // });
 
    // replace old list with new one
    data = updatedListItems;
 
    res.json(data);
 });






 const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//ARRAY of web items
let data = [
{  id: 1, title: "React Game!", description: "Tic tac toe game created using Create React app.", URL: "http://heroku/myapp/game/"},
{  id: 2, title: "Online store", description: "Online store created with HTML, CSS and JavaScript.", URL: "https://git.com/myrepos/shop/index"}
];

// id: 2, title: "Online store", description: "Online store created with HTML, CSS and JavaScript.", URL: "https://git.com/myrepos/shop/index"

//GET
app.get('/', (req, res) => {
    res.send(data);
})

//POST
app.post('/create', (req, res) => {
    // console.log(req.body)
    let {title, description, URL} = req.body
    let newProject = {
        id: data.length +1, 
        title: title,
        description: description, 
        URL: URL
    }
    data.push(newProject)
    res.send(data)
})

//PUT 
//update an item
app.put("/edit", (req, res) => {
    const itemId = Number(req.body.id);
    const editedId = req.body;
    console.log("Editing item: ", itemId, " to be ", editedId);
 
    const updatedListItems = [];
    // loop through list to find and replace one item
    data.forEach(oldItem => {
       if (oldItem.id === itemId) {
          updatedListItems.push(editedId);
       } else {
          updatedListItems.push(oldItem);
       }
    });
 
    // replace old list with new one
    data = updatedListItems;
 
    res.json(data);
 });


// /DELETE
// delete item from list
app.delete("/delete", (req, res) => {
    const itemId = Number(req.body.id);
 //Console logged below - Figuring out what ojbect itemId was - came out as string, so changed it to a number 
 //so that the correct web item id is identified. 
    // console.log(typeof itemId);
 
    // filter list copy, by excluding item to delete
    const filtered_list = data.filter(item => item.id !== itemId);
 
    // replace old list with new one
    data = filtered_list;
 
    res.send(data);
 });

const port = 8000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

//REFERENCES
// REST API with Node and Express in 5 minutes https://dev.to/lennythedev/quick-rest-api-with-node-and-express-in-5-minutes-336j


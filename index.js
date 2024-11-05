const express = require('express');
const app = express();
const items= require('./Items');
console.log(items)

const bodyParser= require('body-parser');

// app.use(express.urlencoded)({extended: true});


app.use (bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/api/items', (req, res) => {
    res.json(items)
})

app.post('/api/items', (req,res)=>{
    const newItems= {
       
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,

        }
        items.push (newItems);
        res.json(items);
} )

app.delete ('/api/items/:name', (req, res)=> {
    let {name} = req.params;

    let itemToBeDeleted = items.find (item=>
        item.name === name) 

    if (itemToBeDeleted) {
        res.json ({
            message:'ITEMS DELETED',
            items: items.filter( item=> item.name !==name)
        })
    } else {
        res.status (404)
        .json ({message: "Товар не существует"})
    }
})


app.put ('/api/items/:name', (req,res)=> {
    let {name}=req.params;
    let itemToBeUpdated= items.find (item=>
        item.name === name) ;
    
        if (itemToBeUpdated) {
            const updateItem = req.body
            items.forEach(item => {
                if(item.name === req.params.name) {
                    item.name = updateItem ? updateItem.name : item.name ; 
                    res.json ({message: 'Название изменено', item})
                }
                     })
                             }
            else {
                res.status (404)
                .json ({message: 'Товар $ {req.params.name} не существует'})
            }
            
})
app.listen(4000, ()=> {
    console.log("Порт 4000 работает" )
})
var express = require('express');
var path = require('path');
var app = express();
const exphbs = require('express-handlebars');
//const helpers = require('handlebars-helpers');

// Set the port to either the environment variable PORT or 3000 if not provided
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars as the view engine
// app.engine('.hbs', exphbs.engine({
//   extname: '.hbs',
//   defaultLayout: "main"
// }));
// app.set('view engine', 'hbs');

const hbs= exphbs.create({
    extname: '.hbs',
    defaultLayout:'main',
  
    //DEFINE HELPER FOR STEP 9
    helpers:
    {
        notZero: function (value) {
            if (value == 0) return false;
            else return true;
          },
          changeZero: function (value) {
            if (value == "0") return "N/A";
            else return value;
          }
    }
  });
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');



// Route for the homepage
app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// Route for the /users endpoint
app.get('/users', function(req, res) {
  //Step 6 assignment 1 part
  res.send('respond with a resource');
});

const file = require('./datasetB.json');

app.get('/data', (req, res) => {
    console.log("JSON is loaded and ready!!!");
    console.log(file);
    res.render('partials/data', {title: 'Data page'});
});

app.get("/data/product/:index", (req, res) => {
    const index=req.params.index;
    const product= file[index];
    if(product){
        res.render('partials/productindex', {product});
    } else {
      res.status(404).send('<b>Invalid INDEX!!!</b>');
    }
});

app.get('/data/search/prdID/', (req, res) =>{
    res.render('partials/productform');
});

app.get('/data/search/prdID/result', (req,res)=>{
    const productId=req.query.productId;
    const product = file.find(item =>item.asin === productId);
    if (product){
        res.render('partials/productformdata', {product});
        }
    else {
        res.status(404).send('<h1>Wrong Id</h1>');
    }
    });
  

//assignment 1 end

app.get('/alldata', (req,res)=>{
    res.render('partials/allData', {products: file, title:'All Products'})
    });


// Catch-all route for any other URL
app.get('*', function(req, res) {
  res.render('error', { title: 'Error', message: 'Wrong Route' });
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

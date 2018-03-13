const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}, methos is ${req.method}, path is ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err) =>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
   });

//    app.use((req,res,next) =>{
//       res.render('maintenance.hbs');
//    });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear()
  
});

hbs.registerHelper('screamIt', (text) =>{
return text.toUpperCase();
});


// app.get('/', (req,res) =>{
   
//     res.send({
//          name : 'hitesh',
//          likes : [
//              'cricket',
//              'movies'
//          ]

//     });
// });

app.get('/', (req,res) =>{
    // res.send('<h1>Hello express</h1>');
     res.render('home.hbs',{
         pageTitle: 'Home Page',
         welcomeMessage: 'Welcome to hitesh website',
        

     });
 });

// app.get('/about', (req,res) =>{

//     res.send('about page');
// });

app.get('/about', (req,res) =>{
    
        res.render('about.hbs',{
            pageTitle: 'About Page',
            welcomeMessage: 'Welcome to hitesh website',
            
        });
    });


//bad request
app.get('/bad', (req,res) =>{
    // res.send('<h1>Hello express</h1>');
     res.send({
          errorMessage: 'unable to handle error'
 
     });
 });


app.listen(port, () =>{
    console.log(`Server is up on the ${port}`);
}); //app will listen on the 3000 port
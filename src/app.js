import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';


const app= express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + "/../public"))

app.use('/views', viewsRouter);



const server= app.listen(8080, () => {
    console.log('Listen on PORT 8080');
});
 
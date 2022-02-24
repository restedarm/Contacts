import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { router, contacts } from './routes/contactRoutes.js'; 

const app = express();

app.set('views', path.resolve(path.dirname(''), 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/contacts', router);


app.get('/', (req, res) => {
    res.render('Home', { contacts: contacts });
})




app.listen(3000, () => {
    console.log('Server started on port 3000 ...');
})
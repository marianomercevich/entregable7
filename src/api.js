import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routs/products.router.js';
import cartsRouter from './routs/carts.router.js';
/* import viewRouter from './routs/views.router.js'; */
import mongoose, {mongo} from 'mongoose';
import MongoStore from 'connect-mongo'
import session from "express-session";
import sessionsRouter from "./routs/sessions.router.js"

const app = express();


app.use(express.json());
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'));

app.use(express.urlencoded({ extended: true }));

app.use(session({
  store: MongoStore.create({
      mongoUrl: 'mongodb+srv://CoderUser:123@cluster0.ghinxw0.mongodb.net',
      dbName: 'sessions',
      mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true
      }
  }),
  secret: 'victoriasecret',
  resave: true,
  saveUninitialized: true
}))

app.get('/', (req, res) => res.render('index'));
/* app.use('/products', viewRouter); */
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use("/api/sessions", sessionsRouter)


/* http://localhost:8080/api/sessions/githubcallback
Client ID: Iv1.2086dbfa0e4cbdef
 Client secret: 72fed1b52ef5db6b8e2b9458600fd03fdb872ba9 */

await mongoose.connect(
    "mongodb+srv://CoderUser:123@cluster0.ghinxw0.mongodb.net/ProyectoFinal"
);
const httpServer = app.listen(8080, () => console.log('Server Up'));

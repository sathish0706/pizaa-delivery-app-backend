import  express  from "express";
import  { MongoClient }  from "mongodb";
import * as dotenv from "dotenv";
import pizzaRouter from './Routes/pizza.route.js';
import customerRouter from "./Routes/customers.route.js"
// import cors from 'cors';


dotenv.config()

const app = express();

// app.use(cors())1


const PORT=process.env.PORT;
console.log(PORT)

const DB_URL=process.env.DB_URL;

console.log(DB_URL)

const client =new MongoClient(DB_URL);
await client.connect();
console.log("Mongodb is connected");

app.use(express.json())

app.get("/",  async function (request, response) {
  response.send("hello world")
});


app.use("/pizza", pizzaRouter)
app.use("/customers", customerRouter)



app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


export { client }


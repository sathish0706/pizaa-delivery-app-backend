import  express  from "express";
import { client } from "../index.js";
import { auth } from "../Middleware/auth.js";

const router = express.Router()


router.get("/",  async function (request, response) {
  const pizza = await client.db("test").collection("pizza").find({}).toArray()
  response.send(pizza)
  });
  

  router.get("/:id",async function (request, response) {
    const { id } = request.params;
    const pizza = await client.db("test").collection("pizza").findOne({id : +id})
    pizza ? response.send(pizza) : response.status(404).send({msg : "pizza not found"});
  });
  


  router.post("/" , async function (request, response) {
    const data = request.body;
    const res = await client.db("test").collection("pizza").insertMany(data);
    response.send(res)
  });
  
 router.post("/" , async function (request, response) {
    const data = request.body;
    const res = await client.db("test").collection("pizza").insertOne(data);
    response.send(res)
  });
  
  
  router.delete("/:id", async function (request, response) {
    const { id } = request.params;
    console.log(id);
    const result = await client.db("test").collection("pizza").deleteOne({ id: +id });
    console.log(result);
    result.deletedCount > 0 
    ? response.send({ msg : "pizza was deleted successfully"})
    : response.status(404).send({msg : "pizza not found"})                        
  });
  
  
  router.put("/:id" , async function (request, response) {
    const { id } = request.params;
    const data = request.body;
    const result = await client.db("test").collection("pizza").updateOne({id : +id}, {$set : data})
    result ? response.send(result) : response.status(404).send({msg : "movie not found"});
  });
  
  export default router;

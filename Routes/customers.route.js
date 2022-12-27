import  express  from "express";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import { createCustomer, getCustomerByName } from "../Services/customers.service.js";

const router = express.Router()

async function genHashedPassword (password) {
  const noOfRounds = 10;
  const salt = await bcrypt.genSalt(noOfRounds);
  const hashedPassword = await bcrypt.hash(password, salt)
  // console.log(salt)
  // console.log(hashedPassword)
  return hashedPassword

}
genHashedPassword("password@123")
  
  router.post("/signin" , async function (request, response) {
    const { username, password } = request.body;
    
    const userFromDB = await getCustomerByName(username)
    if(userFromDB){
      response.status(400).send({msg : "User Already Exist"})
    }else if(password.length < 8){
      response.status(400).send({msg : "password must be 8 charactors"})
    }else{
    const hashedPassword = await genHashedPassword(password)
    console.log(hashedPassword, password);
    const res = await createCustomer({username: username, password : hashedPassword});
    response.send(res)
    }
  });

    router.post("/login" , async function (request, response) {
      const { username, password } = request.body;
      
      const userFromDB = await getCustomerByName(username)

      // console.log(userFromDB, password);

      if(!userFromDB){
        response.status(401).send({msg : "Invalid credential"})
      }else {

        const storedDBPassword = userFromDB.password;
        const isPsswordMatch = await bcrypt.compare(password, storedDBPassword);
        // console.log(isPsswordMatch);
        if(isPsswordMatch){
          const token = jwt.sign({id : userFromDB._id}, process.env.SECRET_KEY)
          response.send({ message : "Succesful login...", token: token });
        } else {
          response.status(401).send({ message : "invalid credential"})
        }
      }

  });
  
  
  export default router
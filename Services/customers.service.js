import { client } from "../index.js";

export async function createCustomer(data) {

    // console.log(data)
   
    return await client.db("test").collection("customers").insertOne(data)
}
export async function getCustomerByName(username) {

    return await client.db("test").collection("customers").findOne({ username: username })
}
const { MongoClient } = require("mongodb");

const URI =
  "mongodb+srv://vyshnavi:sQD0gA6Mq0EiKcTW@cluster0.buvjlyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

const user1 = {
  first_name: "xyz",
  last_name: "abc",
  age: 28,
};

async function run(){
  try {

    // connect to db
    await client.connect();

    // database name
    const db = client.db("myApp");
    await db.command({ ping: 1 }); 

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // collection inside the db
    const collection = db.collection("users");

    // insert operation
    const insertResult = await collection.insertMany([user1]);
    console.log("Inserted documents =>", insertResult);

   // find all the documents
    const findResult = await collection.find({}).toArray();
    console.log("Found documents =>", findResult);

    // find one document with filter query
    const filteredDocs = await collection.find({ first_name: "vyshnavi" }).toArray();
    console.log("Found documents filtered by first_name =>", filteredDocs);

    // update the document
    const updateResult = await collection.updateOne(
      { first_name: "vyshnavi" },
      { $set: { first_name: "vysh" } }
    );
    console.log("Updated documents =>", updateResult);

    // delete the document
    const deleteResult = await collection.deleteMany({
      first_name: "xyz",
    });
    console.log("Deleted documents =>", deleteResult);

  } catch (error) {
    console.log(error);
  } finally {
    // close the connection after the operation
    await client.close()
  }
}

run();
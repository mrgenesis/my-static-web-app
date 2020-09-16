const crypto = require('crypto');
const DB_COLLECTION = process.env.DB_COLLECTION;

module.exports = async function (context, req) {
  const product = {
    id: crypto.randomBytes(3).toString('hex'),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  };

  try {
    //const newProduct = data.addProduct(product);
    const dbSetConection = require('../shared/db');
    const { db, closeConnection } = await dbSetConection();
    const newProduct = await db.collection(DB_COLLECTION).insertOne(product);
    context.res.status(201).json(newProduct.ops);
    closeConnection();
  } catch (error) {
    context.res.status(500).send(error);
  }
};


module.exports = async function (context, req) {
  const product = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };
  try {
    //const updatedProduct = data.updateProduct(product);
    const DB_NAME = process.env.DB_NAME
    , DB_COLLECTION = process.env.DB_COLLECTION
    , setConnection = require('../shared/db')
    , { db, closeConnection } = await setConnection(DB_NAME);

    await db.collection(DB_COLLECTION).updateOne({ id: product.id }, { $set: { ...product }});

    context.res.status(200).json({});
    closeConnection();
  } catch (error) {
    context.res.status(500).send(error);
  }
};

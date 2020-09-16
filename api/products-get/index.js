const DB_COLLECTION = process.env.DB_COLLECTION;

module.exports = async function (context, req) {
  try {
    const setConnection = require('../shared/db')
      , { db, closeConnection } = await setConnection()
      , query = await db.collection(DB_COLLECTION).find({})
      , products = [];
    //const products = data.getProducts();
    await query.forEach(doc => products.push(doc));
    context.res.status(200).json(products);
    closeConnection();
  } catch (error) {
    context.res.status(500).send(error);
  }
};
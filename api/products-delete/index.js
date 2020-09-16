
module.exports = async function (context, req) {
  const DB_NAME = process.env.DB_NAME
  , DB_COLLECTION = process.env.DB_COLLECTION
  , setConnection = require('../shared/db')
  , { db, closeConnection } = await setConnection(DB_NAME)
  , id = req.params.id;
  //const id = parseInt(req.params.id, 10);

  try {
    //data.deleteProduct(id);
    await db.collection(DB_COLLECTION).deleteOne({ id });

    context.res.status(200).json({});
  } catch (error) {
    context.res.status(500).send(error);
  }
  closeConnection();
};

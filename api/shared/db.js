const mongo = require('./mongoClient');
module.exports = (async (dbName = process.env.DB_NAME) => {
  let client = await mongo()
    , db     = await client.db(dbName)
    , closeConnection  = () => client.close();
  return {db, closeConnection};
});
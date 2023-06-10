console.log(process.env.SERVICE_ACCOUNT_FILE);
const admin = require('firebase-admin');
const serviceAccount = require(`../../${process.env.SERVICE_ACCOUNT_FILE}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_DATABASE_URL
});

module.exports = {
  admin: admin,
};

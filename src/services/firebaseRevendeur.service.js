const { admin} = require('./Firebase');

async function findHash( userId ) {
    let db = admin.firestore();
    try {
        const data = await db.collection('users').doc(userId).get()
        return data._fieldsProto.hash.stringValue
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    findHash
}
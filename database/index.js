const crypto = require('crypto')

crypto.randomBytes(256, (err, buf) => {
    if(err) throw err;
    console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
});

if(process.env.NODE_ENV === 'testing'){
    module.exports = {
        uri: process.env.TEST_DB_URI,
        seccret: process.env.TEST_SECRET_KEY,
        db: process.env.TEST_DB_NAME
    }
}
module.exports = {
    uri: process.env.DB_URI,
    secret: process.env.SECRET_KEY,
    db: process.env.DB_NAME
}

const fs = require('fs');
const fetch = require('node-fetch');
const jsonwebtoken = require('jsonwebtoken');
const cacheFile = './controllers/auth/keys.json';

async function getKeys() {

    let keysCache = {};
    if (fs.existsSync(cacheFile)) {
        console.log('Reading from cache...');
        keysCache = JSON.parse(fs.readFileSync(cacheFile));
        const expired = new Date(keysCache.expiresAt) < new Date();
        if (expired) {
            keysCache = {};
        }
        else {
            return keysCache.keysCache;
        }
    } else {
        keysCache = {};
    }
    if (Object.keys(keysCache).length === 0) {
        console.log('Fetching new keys...');
        const response = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
        keysCache = await response.json();
        fs.writeFileSync(cacheFile, JSON.stringify({
            keysCache: keysCache,
            expiresAt: new Date(new Date().getTime() + 3600 * 1000)
        }
        ));
    }
    return keysCache;
}

const verify = async (token) => {
    try {
        const keys = await getKeys();
        const jwt = token.match(
            /(?<header>[^.]+)\.(?<payload>[^.]+)\.(?<signature>[^.]+)/
        ).groups;
        const decodedToken = await jsonwebtoken.verify(token, keys[JSON.parse(atob(jwt.header)).kid]);
        return decodedToken;
    } catch (err) {
        return new Error(err);
    }
};

module.exports = verify;
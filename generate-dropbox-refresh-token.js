const http = require('http');
const crypto = require('crypto');

const APP_KEY = process.env.DROPBOX_APP_KEY;
const APP_SECRET = process.env.DROPBOX_APP_SECRET;

const PORT = 53682;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

if (!APP_KEY || !APP_SECRET) {
    console.error('Faltan DROPBOX_APP_KEY o DROPBOX_APP_SECRET en el entorno.');
    process.exit(1);
}

const state = crypto.randomBytes(16).toString('hex');

const authUrl = new URL('https://www.dropbox.com/oauth2/authorize');
authUrl.searchParams.set('client_id', APP_KEY);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('token_access_type', 'offline');
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('state', state);

console.log('Abre esta URL en tu navegador y autoriza la app:');
console.log(authUrl.toString());

const server = http.createServer(async (req, res) => {
    try {
        const url = new URL(req.url, REDIRECT_URI);
        if (url.pathname !== '/callback') {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
            return;
        }

        const code = url.searchParams.get('code');
        const returnedState = url.searchParams.get('state');
        const error = url.searchParams.get('error');

        if (error) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(`Error: ${error}`);
            return;
        }

        if (!code || returnedState !== state) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Codigo o estado invalido.');
            return;
        }

        const body = new URLSearchParams({
            code,
            grant_type: 'authorization_code',
            client_id: APP_KEY,
            client_secret: APP_SECRET,
            redirect_uri: REDIRECT_URI
        });

        const tokenResponse = await fetch('https://api.dropboxapi.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(tokenData, null, 2));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Token generado. Vuelve a la consola para verlo.');

        console.log('\nRefresh token:');
        console.log(tokenData.refresh_token || 'No se recibio refresh_token');
        console.log('\nAccess token:');
        console.log(tokenData.access_token || 'No se recibio access_token');
        console.log('\nGuarda el refresh token en tus variables de entorno.');
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno al generar token.');
        console.error(err);
    } finally {
        server.close();
    }
});

server.listen(PORT, () => {
    console.log(`\nEsperando callback en ${REDIRECT_URI} ...`);
});

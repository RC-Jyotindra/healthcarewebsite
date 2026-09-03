import https from 'https';
https.get('https://surveybuilder.io/api/pmm/ingest/caddee1a-877e-4fa2-92c0-ecda289116be/schema', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => { console.log(data); });
}).on("error", (err) => { console.log("Error: " + err.message); });

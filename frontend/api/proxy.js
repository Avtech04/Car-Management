import fetch from 'node-fetch';

export default async function handler(req, res) {
  const targetUrl = `http://car-management.ap-south-1.elasticbeanstalk.com${req.url}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' ? req.body : undefined,
    });

    const data = await response.text();

    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).send({ error: 'Error connecting to the backend' });
  }
}

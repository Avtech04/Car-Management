import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Build the target URL to your Elastic Beanstalk backend
  const targetUrl = `http://car-management.ap-south-1.elasticbeanstalk.com${req.url}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined, // Remove host header to avoid issues with the backend
      },
      body: req.method !== 'GET' ? req.body : undefined,
    });

    // Forward the response back to the client
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Proxy failed' });
  }
}

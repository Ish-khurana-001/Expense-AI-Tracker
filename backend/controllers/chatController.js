const fetch = global.fetch;

exports.chat = async (req, res) => {
  const { message } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured on server. Set OPENAI_API_KEY in .env' });
  }

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    const reply = data?.choices?.[0]?.message?.content || null;

    if (!reply) {
      return res.status(502).json({ error: 'No reply from OpenAI', raw: data });
    }

    return res.json({ reply, raw: data });
  } catch (error) {
    console.error('Chat proxy error:', error);
    return res.status(500).json({ error: 'Failed to contact OpenAI' });
  }
};

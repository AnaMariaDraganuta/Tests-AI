import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

const MY_API_KEY = `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`;
const MY_MODEL_ID = `EleutherAI/gpt-neo-2.7B`;
app.use(bodyParser.json());

app.post('/generate-offer', (request, response) => {
  const  prompt = request.body.prompt;

  axios.post(
    `https://api-inference.huggingface.co/models/${MY_MODEL_ID}`,
    { inputs: prompt },
    { headers:
         { 'Authorization': `Bearer ${MY_API_KEY}` } }
  )
  .then(res => {
    response.json(res.data);
  })
  .catch(err => {
    console.error(err);
    response.status(500).json({ error: 'Error generating offer', details: err.response.data });
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
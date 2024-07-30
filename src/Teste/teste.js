import axios from 'axios';

async function testGenerateOffer() {
  const response = await axios.post('http://localhost:5000/generate-offer', {
    prompt: "Generați o ofertă detaliată pentru o aplicație e-commerce."
  });
  console.log(response.data);
}

testGenerateOffer();

const fs = require('fs');
const { groq } = require('@ai-sdk/groq');
const { streamText } = require('ai');

// Manually parse .env.local
const envPath = '.env.local';
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      process.env[key] = val;
    }
  });
}

async function main() {
  try {
    const model = groq('llama-3.1-8b-instant');
    const result = await streamText({
      model,
      system: "You are helpful.",
      messages: [{ role: 'user', content: 'Hi' }],
    });
    
    console.log("Prototype keys:", Object.getOwnPropertyNames(Object.getPrototypeOf(result)));
    console.log("Direct keys:", Object.keys(result));
    
    // Check if result has toDataStreamResponse
    console.log("toDataStreamResponse exists?", typeof result.toDataStreamResponse);
    console.log("toTextStreamResponse exists?", typeof result.toTextStreamResponse);
    console.log("toAIStreamResponse exists?", typeof result.toAIStreamResponse);
  } catch (err) {
    console.error(err);
  }
}

main();

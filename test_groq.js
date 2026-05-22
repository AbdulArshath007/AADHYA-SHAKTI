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
  console.log("GROQ KEY:", process.env.GROQ_API_KEY ? "EXISTS" : "MISSING");
  
  try {
    const model = groq('llama-3.1-8b-instant');
    const result = await streamText({
      model,
      system: "You are a helpful assistant.",
      messages: [{ role: 'user', content: 'Say hello in 3 words' }],
    });
    
    console.log("Streaming response...");
    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
    }
    console.log("\nSuccess!");
  } catch (err) {
    console.error("FAILED calling Groq:", err);
  }
}

main();

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js')
const { BardAPI } = require('bard-api-node')
require('dotenv').config()

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

async function testAssistant(message) {
  try {
    const assistant = new BardAPI()
    const cookie = `egiTioOqqfLM7cCbcyAW97l1ugg59g3oW3BKp1bqg6v3V4geMLMzFOuFg7p9JmbjHNyBYA.`
    // Set session information for authentication
    await assistant.setSession('__Secure-1PSID', cookie) // or '__Secure-3PSID'
    // ...
    if (message.toLowerCase().replace(/\s/g, '') === 'fuckyou') {
      return `Sorry, I don't understand.`
    }
    // Send a query to Bard
    const response = await assistant.getBardResponse(message)

    if (response) {
      console.log(response.content)
      return response.content
    } else {
      throw new Error('This prompt error!')
    }
    // console.log('Bard:', response.content)
  } catch (error) {
    // console.error('Error in testAssistant:', error.message)
    // Handle the error gracefully, e.g., return a default response or log the error
    return `Please try again!, I don't understand what you said.`
  }
}

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})
client.on(Events.MessageCreate, async (message) => {
  console.log(message)

  if (message.channelId == 1060215201791758388) {
    if (message.content && !message.author.bot) {
      // Send back "Pong." to the same channel the message was sent in
      const answer =
        (await testAssistant(message.content)) || "I don't understand"
      await message.reply(answer)
    }
  }
})

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)

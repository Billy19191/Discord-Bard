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
    const cookie = `egiTigKtY_wMXfXm3bh_luokzNS5-4tavs3TZhXsmPNUWr58Y7R27NJmoqAjVBMbc1f6EA.`
    // Set session information for authentication
    await assistant.setSession('__Secure-1PSID', cookie) // or '__Secure-3PSID'
    // ...

    // Send a query to Bard
    const response = await assistant.getBardResponse(message)
    console.log(response.content)
    return response.content
    // console.log('Bard:', response.content)
  } catch (error) {
    console.error('Error:', error)
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
  if (message.content) {
    // Send back "Pong." to the same channel the message was sent in
    const answer = await testAssistant(message.content)
    await message.reply(answer)
  }
})

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)

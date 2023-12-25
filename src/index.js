// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js')
require('dotenv').config()

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})
client.on(Events.MessageCreate, (message) => {
  console.log(message)
  if (message.content === 'Test') {
    // Send back "Pong." to the same channel the message was sent in
    message.reply('I am bard bot')
  }
})

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)

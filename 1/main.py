import discord

tokens = ["MTEwMjcwMzI5MDIxNjYxMjAwMA.Gra7ol.yVZLdgZxA5EYrlsMx64BLsmy-6hmgVBYg7ppdE", "MTEwMjcwNDA5OTcyMTQ4MjM2Mg.GwaHYC.mKQ2p9eBJmBpFyeGw_4wRH4nadMb8pkBPVS-Q8", "MTEwMjcwNDA1NzEwNzM2MTk0Mg.GRpqp5.qynjxDyJhR3aRTAF00RfM1jAVJglB3M_hxcLtQ"]
channels = ["1050315042270228511", "1048275568619171840", "1055476299197591552"]

clients = []
for token in tokens:
    client = discord.Client()
    clients.append(client)

async def connect_voice(channel_id, client):
    voice_channel = client.get_channel(int(channel_id))
    await voice_channel.connect()

@client.event
async def on_ready():
    for i in range(len(tokens)):
        await connect_voice(channels[i], clients[i])

for i in range(len(tokens)):
    clients[i].run(tokens[i])

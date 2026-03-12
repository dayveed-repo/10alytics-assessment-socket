const { createClient } = require("redis");

async function initRedisSubscriber(io) {
  const subscriber = createClient({
    url: process.env.REDIS_URL,
  });

  await subscriber.connect();

  console.log("Redis subscriber connected");

  await subscriber.subscribe("notifications", (message) => {
    const data = JSON.parse(message);

    console.log("Notification received:", data);

    io.to(`user:${data.userId}`).emit("notification", data);
  });
}

module.exports = { initRedisSubscriber };

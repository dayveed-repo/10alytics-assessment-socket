const { createClient } = require("redis");

async function initRedisSubscriber(io) {
  const subscriber = createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  });

  subscriber.on("error", (err) => {
    console.error("Redis Subscriber Error:", err);
  });

  await subscriber.connect();

  console.log("Redis subscriber connected");

  await subscriber.subscribe("notifications", (message) => {
    const data = JSON.parse(message);

    console.log("Notification received:", data);

    io.emit("notification", data);
  });
}

module.exports = { initRedisSubscriber };

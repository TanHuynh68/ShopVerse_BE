const { createClient } = require("redis");

const client = createClient({
  url: "redis://localhost:6379"
});

client.on("error", (err) => console.error("❌ Redis Client Error", err));

(async () => {
  try {
    await client.connect();
    console.log("✅ Redis connected!");
  } catch (err) {
    console.error("Redis connect error:", err);
  }
})();

module.exports = client;

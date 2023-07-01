import TwitterApi from "twitter-api-v2";
import "dotenv/config"

// Get the keys from the .env file
const TWITTER_API_KEY: string = process.env.API_KEY || "";
const TWITTER_API_SECRET_KEY: string = process.env.API_KEY_SECRET || "";
const TWITTER_ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || "";
const TWITTER_ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || "";

// Create a client instance
const client = new TwitterApi({
  appKey: TWITTER_API_KEY,
  appSecret: TWITTER_API_SECRET_KEY,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
});

// Function to tweet something
async function tweetSomething(tweetText: string) {
  try {
    const tweet = await client.v2.tweet(tweetText);
    console.log(tweet);
    return tweet.data.id;
  } catch (error) {
    console.error(error);
  }
}

// Delete a tweet
async function deleteTweet(id: string) {
  try {
    const deleted = await client.v2.deleteTweet(id);
    console.log(deleted);
  } catch (error) {
    console.error(error);
  }
}

client.v2.me().then((info) => { console.log(info.data.username) });

const tweetData: string = "twitter L, sent using twitter-api-v2";
tweetSomething(tweetData).then((id) => {
  setTimeout(() => {
    deleteTweet(id!);
  }, 60 * 1000);
});
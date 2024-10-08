import { TwitterApi } from 'twitter-api-v2';
import cron from 'node-cron';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

interface ScheduledTweet {
  id: string;
  content: string;
  scheduledTime: Date;
}

const scheduledTweets: ScheduledTweet[] = [];

let twitterUsername: string | null = null;

async function getTwitterUsername() {
  if (!twitterUsername) {
    try {
      const user = await client.v2.me();
      twitterUsername = user.data.username;
    } catch (error) {
      console.error('Error fetching Twitter username:', error);
      twitterUsername = 'Unknown';
    }
  }
  return twitterUsername;
}

export async function scheduleTweet(content: string, scheduledTime: Date): Promise<{ id: string, username: string }> {
  const id = Math.random().toString(36).substr(2, 9);
  scheduledTweets.push({ id, content, scheduledTime });
  
  const username = await getTwitterUsername();
  
  return { id, username };
}

// ... rest of the functions (cancelScheduledTweet, getScheduledTweets, postTweet) remain the same

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const tweetsToPost = scheduledTweets.filter(tweet => tweet.scheduledTime <= now);
  
  for (const tweet of tweetsToPost) {
    await postTweet(tweet.content);
    cancelScheduledTweet(tweet.id);
  }
});

export async function getAccountInfo() {
  const username = await getTwitterUsername();
  return { username };
}

export function cancelScheduledTweet(id: string): boolean {
  const index = scheduledTweets.findIndex(tweet => tweet.id === id);
  if (index !== -1) {
    scheduledTweets.splice(index, 1);
    return true;
  }
  return false;
}

async function postTweet(content: string) {
  try {
    await client.v2.tweet(content);
    console.log('Tweet posted successfully');
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

cron.schedule('* * * * *', () => {
  const now = new Date();
  const tweetsToPost = scheduledTweets.filter(tweet => tweet.scheduledTime <= now);
  
  tweetsToPost.forEach(tweet => {
    postTweet(tweet.content);
    cancelScheduledTweet(tweet.id);
  });
});





cron.schedule('* * * * *', async () => {
  const now = new Date();
  const tweetsToPost = scheduledTweets.filter(tweet => tweet.scheduledTime <= now);
  
  for (const tweet of tweetsToPost) {
    await postTweet(tweet.content);
    cancelScheduledTweet(tweet.id);
  }
});


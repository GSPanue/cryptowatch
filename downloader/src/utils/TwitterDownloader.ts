import * as Twitter from 'twitter';

/**
 * @name TwitterDownloader
 * @description Class for downloading data from Twitter.
 */
class TwitterDownloader {
  private client: Twitter;

  constructor(
    consumerKey: string,
    consumerSecret: string,
    accessTokenKey: string,
    accessTokenSecret: string
    ) {
      this.client = new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        access_token_key: accessTokenKey,
        access_token_secret: accessTokenSecret
      });
  }

  public getClient(): Twitter {
    return this.client;
  }

  public setClient(newClient: Twitter) {
    this.client = newClient;
  }

  public async searchTweets(keyword: string): Promise<TwitterObject> {
    try {
      const response = await this.client.get('search/tweets', {
        q: keyword,
        count: 25,
        lang: 'en',
        result_type: 'recent'
      });

      return response;
    }
    catch (error) {
      console.log('Could not get tweets.');
      console.log(`Reason: ${error[0].message}`);

      return Promise.reject(new Error(error[0].message));
    }
  }
}

export default TwitterDownloader;

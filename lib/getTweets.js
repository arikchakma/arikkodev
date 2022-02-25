import { encode } from 'qss';

import { getReferencedTweets, formatTweet } from 'utils/twitter';

export default async function getTweets(ids) {
  if (ids.length === 0) return [];

  const queryParams = encode({
    ids: ids.join(','),
    expansions: [
      'author_id',
      'attachments.media_keys',
      'referenced_tweets.id',
      'referenced_tweets.id.author_id'
    ].join(','),
    'tweet.fields': [
      'id',
      'author_id',
      'created_at',
      'text',
      'attachments',
      'in_reply_to_user_id',
      'public_metrics',
      'referenced_tweets',
      'entities'
    ].join(','),
    'user.fields': [
      'id',
      'name',
      'profile_image_url',
      'protected',
      'username',
      'verified'
    ].join(','),
    'media.fields': [
      'media_key',
      'type',
      'height',
      'width',
      'url',
      'preview_image_url',
      'alt_text'
    ].join(',')
  });

  const api = await fetch(`https://api.twitter.com/2/tweets?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
  }).then(x => x.json());

  let tweets = [];

  for (const tweet of api.data) {
    const formattedTweet = formatTweet(api.includes, tweet);
    const referencedTweets = getReferencedTweets(api.includes, tweet);
    const quoteTweet = referencedTweets?.find(t => t.type === 'quoted');
    const linkPreview = tweet.entities?.urls?.find(
      x => x.status === 200 && tweet.text.endsWith(x.url)
    );

    tweets.push({
      ...formattedTweet,
      ...(linkPreview ? { linkPreview } : {}),
      ...(quoteTweet
        ? { quoteTweet: formatTweet(api.includes, quoteTweet) }
        : {})
    });
  }

  return tweets;
}

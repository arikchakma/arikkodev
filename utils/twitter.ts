import { format } from 'date-fns';

export const getAuthor = (users, author_id) => {
  return users.find(user => user.id === author_id);
};

export const getMedia = (media, media_keys) => {
  if (!media || !media_keys) {
    return undefined;
  }

  let medias = [];

  media_keys.forEach(key => {
    const _media = media.find(media => media.media_key === key);

    if (_media) {
      medias.push(_media);
    }
  });

  return medias;
};

export const getReferencedTweets = (includes, tweet) => {
  if (!tweet.referenced_tweets) {
    return undefined;
  }

  let referencedTweets = [];

  for (const referencedTweet of tweet.referenced_tweets) {
    const tweet = includes.tweets.find(
      tweet => tweet.id === referencedTweet.id
    );

    if (tweet) {
      referencedTweets.push({
        ...tweet,
        type: referencedTweet.type
      });
    }
  }

  return referencedTweets;
};

export const replaceBetween = (origin, startIndex, endIndex, insertion) =>
  origin.substring(0, startIndex) + insertion + origin.substring(endIndex);

export const getStartEnd = (str, sub) => [
  str.indexOf(sub),
  str.indexOf(sub) + sub.length
];

export const formatTweet = (includes, tweet) => {
  let textFormatted = tweet.text;

  if (tweet.entities?.urls) {
    for (const url of tweet.entities.urls) {
      let replacement = url.display_url;
      if (
        (url.status && tweet.text.endsWith(url.url)) ||
        (tweet.text.endsWith(url.url) &&
          url.display_url.startsWith('pic.twitter.com/')) ||
        tweet.referenced_tweets?.find(
          x => x.type === 'quoted' && url.expanded_url.endsWith(x.id)
        )
      ) {
        replacement = '';
      }

      const [start, end] = getStartEnd(textFormatted, url.url);

      textFormatted = replaceBetween(textFormatted, start, end, replacement);
    }
  }

  const author = getAuthor(includes.users, tweet.author_id);
  const media = getMedia(includes.media, tweet.attachments?.media_keys);

  const createdAtFormatted = format(new Date(tweet.created_at), 'MMM d, y');

  const metricsFormatted = {
    replies: tweet.public_metrics?.reply_count
      ? tweet.public_metrics.reply_count.toLocaleString()
      : '0',
    retweets: tweet.public_metrics?.retweet_count
      ? tweet.public_metrics.retweet_count.toLocaleString()
      : '0',
    likes: tweet.public_metrics?.like_count
      ? tweet.public_metrics.like_count.toLocaleString()
      : '0',
    quotes: tweet.public_metrics?.quote_count
      ? tweet.public_metrics.quote_count.toLocaleString()
      : '0'
  };

  const formattedTweet = {
    id: tweet.id,
    author: {
      name: author.name,
      imageUrl: author.profile_image_url,
      authorUrl: `https://twitter.com/${author.username}`,
      username: author.username,
      verified: author.verified
    },
    text: textFormatted.trim(),
    createdAt: createdAtFormatted,
    metrics: metricsFormatted,
    likeUrl: `https://twitter.com/intent/like?tweet_id=${tweet.id}`,
    retweetUrl: `https://twitter.com/intent/retweet?tweet_id=${tweet.id}`,
    replyUrl: `https://twitter.com/intent/tweet?in_reply_to=${tweet.id}`,
    tweetUrl: `https://twitter.com/${author.username}/status/${tweet.id}`,
    ...(media ? { media } : {}),
    ...(tweet.type ? { type: tweet.type } : {})
  };

  return formattedTweet;
};

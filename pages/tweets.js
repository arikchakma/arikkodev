import { Octokit } from '@octokit/core';

import getTweets from '@/lib/getTweets';

import Container from '@/components/Container';
import Divider from '@/components/Divider';
import { Tweet } from '@/components/Tweet';

export default function Tweets({ tweets }) {
  return (
    <Container>
      <div className="mt-28">
        <h1 className="text-4xl font-bold tracking-tight">Appreciated Tweets</h1>
        <p className="mt-4 text-xl text-gray-400">
          Tweets that capture a sentiment I'd love to remember #BlessedTweets
        </p>
      </div>
      <div className="mt-20 grid gap-10">
        {tweets.map(tweet => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
      <Divider />
    </Container>
  );
}

export const getStaticProps = async () => {
  // Get tweet ids from a Github project using Github's REST API
  const octokit = new Octokit({
    auth: `${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
  });

  const response = await octokit.request(
    'GET /projects/columns/{column_id}/cards',
    {
      column_id: 17854225
    }
  );
  const tweetIds = response.data.map(card => card.note);

  // Get the actual tweets from Twitter using the Twitter API
  const tweets =
    tweetIds && tweetIds.length > 0 ? await getTweets(tweetIds) : [];

  return { props: { tweets } };
};

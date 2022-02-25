import { Octokit } from '@octokit/core';

export default async function handler(req, res) {
  const octokit = new Octokit({
    auth: `${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
  });

  const response = await octokit.request(
    'GET /projects/columns/{column_id}/cards',
    {
      column_id: 17854225
    }
  );

  const data = response.data.map(card => card.note);

  res.status(200).json(data);
}

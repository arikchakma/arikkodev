// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { postmark } from '@/lib/postmark';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
    const { feedback, emoji } = req.body;
    const schema = z.object({
      feedback: z
        .string()
        .trim()
        .min(0, 'Must be at least 1 character')
        .max(500),
      emoji: z.string().min(0).max(500),
    });

    const validation = schema.safeParse({ feedback, emoji });
    if (!validation.success) {
      return res.status(400).json({ message: validation.error.message });
    }

    await postmark.sendEmail({
      From: 'hello@arikko.dev',
      To: 'feedback@arikko.dev',
      Subject: 'Feedback from arikko.dev',
      HtmlBody: `<strong>${emoji}</strong> - <span>${feedback}</span>`,
      // TextBody: 'Hello from Postmark!',
      MessageStream: 'outbound',
    });

    res.status(201).json({ message: 'Success' });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong: ${e}` });
  }
}

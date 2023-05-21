// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';
import { format } from 'date-fns';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const messages = await prisma.guestbook.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    return res.status(200).json(
      messages.map(message => {
        return {
          id: message.id.toString(),
          created_by: message.created_by,
          body: message.body,
          created_at: format(
            new Date(message.updated_at),
            "d MMM yyyy 'at' h:mm bb"
          ),
        };
      })
    );
  }

  const session = await getSession({ req });
  const { body } = req.body;

  if (!session) {
    return res.status(403).send('Unauthorized');
  }

  if (req.method === 'POST') {
    const newMessage = await prisma.guestbook.create({
      data: {
        email: session?.user?.email as string,
        body,
        created_by: session?.user?.name as string,
      },
    });
    return res.status(201).json({
      id: newMessage.id.toString(),
      body: newMessage.body,
      created_by: newMessage.created_by,
      updated_at: newMessage.updated_at,
    });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

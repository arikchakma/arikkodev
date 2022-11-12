import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const { id } = req.query;
  const { email } = session?.user as { email: string };

  const message = await prisma.guestbook.findUnique({
    where: {
      id: String(id),
    },
  });

  if (req.method === 'GET') {
    return res.status(200).json({
      id: message?.id.toString(),
      created_by: message?.created_by,
      body: message?.body,
      created_at: message?.updated_at,
    });
  }

  if (!session || message?.email !== email) {
    return res.status(403).send('Unauthorized');
  }

  if (req.method === 'DELETE') {
    await prisma.guestbook.delete({
      where: {
        id: String(id),
      },
    });
    return res.status(204).json({});
  }

  if (req.method === 'PUT') {
    const body = (req.body.body || '').trim().slice(0, 500);
    const updatedMessage = await prisma.guestbook.update({
      where: {
        id: String(id),
      },
      data: {
        body,
        updated_at: new Date().toISOString(),
      },
    });
    return res.status(201).json({
      id: updatedMessage.id.toString(),
      created_by: updatedMessage.created_by,
      body: updatedMessage.body,
      created_at: updatedMessage.updated_at,
    });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

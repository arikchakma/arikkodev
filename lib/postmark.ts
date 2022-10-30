import { Client } from 'postmark';

export const postmark = new Client(process.env.POSTMARK_API_KEY as string);

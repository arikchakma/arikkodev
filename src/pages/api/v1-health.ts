import type { APIRoute } from 'astro';

export const GET: APIRoute = async function () {
  return new Response(
    JSON.stringify({
      success: true,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, apikey, prefer, range, x-client-info",
};

const DB_URL = "http://49.13.63.120:8000";

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Extract the path after /functions/v1/db-proxy/
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/db-proxy\/?/, '');
    const search = url.search;

    // Build the target URL
    const targetUrl = `${DB_URL}/${path}${search}`;

    console.log(`Proxying request to: ${targetUrl}`);

    // Forward headers (excluding host and origin)
    const forwardHeaders = new Headers();
    req.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey !== 'host' && lowerKey !== 'origin' && lowerKey !== 'referer') {
        forwardHeaders.set(key, value);
      }
    });

    // Make the request to the HTTP database
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: forwardHeaders,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.text() : undefined,
    });

    // Get response body and headers
    const responseBody = await response.text();
    const responseHeaders = new Headers(corsHeaders);

    // Forward important headers from the database response
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey === 'content-type' || lowerKey === 'content-range' || lowerKey.startsWith('x-')) {
        responseHeaders.set(key, value);
      }
    });

    return new Response(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(
      JSON.stringify({
        error: 'Proxy error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

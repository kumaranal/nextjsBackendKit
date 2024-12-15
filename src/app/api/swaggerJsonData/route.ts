import swaggerDocs from "../util/swagger";

export async function GET(request: Request) {
  return new Response(JSON.stringify(swaggerDocs), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

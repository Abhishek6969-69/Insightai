export async function GET() {
  console.log("ENV from server:", process.env.MY_SECRET);
  return Response.json({ processEnv: process.env.DATABASE_URL });
}

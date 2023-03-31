import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// create an instance of the application
const app = new Application();

// create a router for handling requests
const router = new Router();

// define your API endpoints
router.post("/api", async (ctx) => {
    const {url} = await ctx.request.body().value;
    console.log(url)
    
    
    
  // retrieve a list of posts from a database or other data source
  const posts = [
    { id: 1, title: "First post", content: "Lorem ipsum dolor sit amet" },
    { id: 2, title: "Second post", content: "Consectetur adipiscing elit" },
  ];

  // send the list of posts as a JSON response
  ctx.response.body = posts;
  ctx.response.headers.set("Content-Type", "text/html");
});

// add a middleware to reject non-GET requests and non-API routes
app.use(async (ctx, next) => {
  if (ctx.request.method !== "POST") {
    ctx.response.status = 405; // Method Not Allowed
    ctx.response.body = { message: "Method Not Allowed" };
    return;
  }

  if (!ctx.request.url.pathname.startsWith("/api")) {
    ctx.response.status = 404; // Not Found
    ctx.response.body = { message: "Please use /api" };
    return;
  }

  await next();
});

// use the router middleware
app.use(router.routes());
app.use(router.allowedMethods());

// start the server
console.log("API server listening on http://localhost:8000");
await app.listen({ port: 8000 });
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pokemon/:id", "routes/pokemon.$id.tsx"),
  route("api/evolutions/:id", "routes/api.evolutions.$id.tsx"),
] satisfies RouteConfig;

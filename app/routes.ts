import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pokemon/:id", "routes/pokemon.$id.tsx"),
] satisfies RouteConfig;

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pokemon/:id", "routes/pokemon.$id.tsx"),
  route("home-outlet", "routes/home-outlet.tsx", [
    index("routes/home-outlet._index.tsx"),
    route(":id", "routes/home-outlet.$id.tsx", [
      index("routes/home-outlet.$id.notes.tsx"),
    ]),
  ]),
  route("api/evolutions/:id", "routes/api.evolutions.$id.tsx"),
] satisfies RouteConfig;

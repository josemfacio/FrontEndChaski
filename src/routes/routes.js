import routesAdmin from "./routes.admin";
import { BasicLayout } from "../layouts";
import { Error404 } from "../pages";
const routes = [
  ...routesAdmin,
  { path: "/*", layout: BasicLayout, component: Error404 },
];
export default routes;

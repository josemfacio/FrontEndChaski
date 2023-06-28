import { ClientLayout } from "../layouts";
import { Home, Almacen } from "../pages/Client";
const routesClient = [
  {
    path: "/",
    layout: ClientLayout,
    component: Home,
  },
  {
    path: "/almacen",
    layout: ClientLayout,
    component: Almacen,
  },
];
export default routesClient;

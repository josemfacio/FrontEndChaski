import { AdminLayout } from "../layouts";
import {
  HomeAdmin,
  Usuarios,
  Almacen,
  Historico,
  AlmacenUsers,
  Taller,
  Limite,
  MiTaller,
  Mrp,
  Muletos,
  Herramientas,
  MisPedidos,
} from "../pages/admin";
const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: HomeAdmin,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: Usuarios,
  },
  {
    path: "/admin/almacen",
    layout: AdminLayout,
    component: Almacen,
  },
  {
    path: "/admin/historico",
    layout: AdminLayout,
    component: Historico,
  },
  {
    path: "/admin/almacenusers",
    layout: AdminLayout,
    component: AlmacenUsers,
  },
  {
    path: "/admin/taller",
    layout: AdminLayout,
    component: Taller,
  },
  {
    path: "/admin/limite",
    layout: AdminLayout,
    component: Limite,
  },
  {
    path: "/admin/miTaller",
    layout: AdminLayout,
    component: MiTaller,
  },
  {
    path: "/admin/mrp",
    layout: AdminLayout,
    component: Mrp,
  },
  {
    path: "/admin/muletos",
    layout: AdminLayout,
    component: Muletos,
  },
  {
    path: "/admin/herramientas",
    layout: AdminLayout,
    component: Herramientas,
  },
  {
    path: "/admin/misPedidos",
    layout: AdminLayout,
    component: MisPedidos,
  },
];
export default routesAdmin;

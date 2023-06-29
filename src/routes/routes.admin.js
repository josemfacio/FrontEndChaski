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
    path: "/",
    layout: AdminLayout,
    component: HomeAdmin,
  },
  {
    path: "/users",
    layout: AdminLayout,
    component: Usuarios,
  },
  {
    path: "/almacen",
    layout: AdminLayout,
    component: Almacen,
  },
  {
    path: "/historico",
    layout: AdminLayout,
    component: Historico,
  },
  {
    path: "/almacenusers",
    layout: AdminLayout,
    component: AlmacenUsers,
  },
  {
    path: "/taller",
    layout: AdminLayout,
    component: Taller,
  },
  {
    path: "/limite",
    layout: AdminLayout,
    component: Limite,
  },
  {
    path: "/miTaller",
    layout: AdminLayout,
    component: MiTaller,
  },
  {
    path: "/mrp",
    layout: AdminLayout,
    component: Mrp,
  },
  {
    path: "/muletos",
    layout: AdminLayout,
    component: Muletos,
  },
  {
    path: "/herramientas",
    layout: AdminLayout,
    component: Herramientas,
  },
  {
    path: "/misPedidos",
    layout: AdminLayout,
    component: MisPedidos,
  },
];
export default routesAdmin;

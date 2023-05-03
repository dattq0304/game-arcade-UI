import config from "~/config";

// Layouts
import { NoSidebar } from "~/layouts";

// Pages
import Home from "~/pages/Home";
import Game from "~/pages/Game";
import Upload from "~/pages/Upload";
import Submit from "~/pages/Submit";
import Edit from "~/pages/Edit";
import GameDemo from "~/pages/GameDemo";

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.game, component: Game },
  { path: config.routes.upload, component: Upload, layout: NoSidebar },
  { path: config.routes.submit, component: Submit, layout: NoSidebar },
  { path: config.routes.edit, component: Edit, layout: NoSidebar },
  { path: config.routes.demo, component: GameDemo, layout: NoSidebar },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

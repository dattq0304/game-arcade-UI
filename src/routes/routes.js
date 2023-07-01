import config from "~/config";

// Layouts
import { NoSidebar, OnlyContent } from "~/layouts";

// Pages
import Home from "~/pages/Home";
import Game from "~/pages/Game";
import Upload from "~/pages/Upload";
import Submit from "~/pages/Submit";
import Edit from "~/pages/Edit";
import GameDemo from "~/pages/GameDemo";
import AllGames from "~/pages/AllGames";
import AllUsers from "~/pages/AllUsers";
import About from "~/pages/About/About";
import Contact from "~/pages/Contact/Contact";
import Privacy from "~/pages/Privacy/Privacy";
import Terms from "~/pages/Terms/Terms";
import NotFound from "~/pages/NotFound";
import PlayFrame from "~/pages/PlayFrame/PlayFrame";

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.game, component: Game },
  { path: config.routes.upload, component: Upload, layout: NoSidebar },
  { path: config.routes.submit, component: Submit, layout: NoSidebar },
  { path: config.routes.edit, component: Edit, layout: NoSidebar },
  { path: config.routes.demo, component: GameDemo, layout: NoSidebar },
  { path: config.routes.allGames, component: AllGames, layout: NoSidebar },
  { path: config.routes.allUsers, component: AllUsers, layout: NoSidebar },
  { path: config.routes.about, component: About, layout: NoSidebar },
  { path: config.routes.contact, component: Contact, layout: NoSidebar },
  { path: config.routes.privacy, component: Privacy, layout: NoSidebar },
  { path: config.routes.terms, component: Terms, layout: NoSidebar },
  { path: config.routes.notFound, component: NotFound, layout: NoSidebar },
  { path: config.routes.playFrame, component: PlayFrame, layout: OnlyContent }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

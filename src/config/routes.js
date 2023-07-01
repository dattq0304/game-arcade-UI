const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  game: "/game/:id",
  upload: "/upload",
  submit: "/upload/submit",
  edit: "/upload/edit/:id",
  demo: "/upload/demo/:id",
  allGames: "/admin/games",
  allUsers: "/admin/users",
  playFrame: "/play/:id",
  notFound: "*"
};

export default routes;

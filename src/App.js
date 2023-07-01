import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import ReactGa from "react-ga4";

import { publicRoutes } from "~/routes";
import DefaultLayout from "~/layouts";

ReactGa.initialize('G-BT4Y98K8N0');

function App() {
  useEffect(() => {
    ReactGa.send({
      hitType: "pageview",
      page: document.location.pathname,
      title: "Home page"
    });
    // ReactGa.pageview(document.location.pathname);

    console.log("google-analytics");
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

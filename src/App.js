import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import routes from "./routes"
import Layout from "./Page/Layout/Layout"

function App() {

  return (
    // @ts-ignore
    <Router history={History}>
      <Routes>
        {routes.map((route, idx) => {
          return (
            <Route
              key={idx}
              //@ts-ignore
              exact={route.exact}
              path={route.path}
              element={
                <Layout>
                  <route.component />
                </Layout>}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;

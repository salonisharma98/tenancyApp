import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme";
import outerTheme from "./OuterTheme";
import Form from "./components/form/Form";
import { useEffect, useState } from "react";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";

const App = () => {
  const [urlState, setUrlState] = useState(false);

  useEffect(() => {
    const urlCaptured = window.location.href;
    urlCaptured.includes("red") ? setUrlState(true) : setUrlState(false);
  });

  return (
    <Router>
      <ThemeProvider theme={urlState ? theme : outerTheme}>
        <Nav />
        <Routes>
          {["/login", "/signup"].map((path, index) => (
            <Route
              path={path}
              element={<Form urlState={urlState} />}
              key={index}
            />
          ))}
          <Route path={"/home"} element={<Home />} />
          <Route path={" "} element={NotFoundPage} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};
export default App;

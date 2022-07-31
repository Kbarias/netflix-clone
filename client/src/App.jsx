import "./app.scss";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  //if a user, go to homepage, if not go to register
  const user = true;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> :<Redirect to="register"/>}
        </Route>
        <Route exact path="/register">
          {!user ? <Register /> : <Redirect to="register"/>}
        </Route>
        <Route exact path="/login">
          {user ? <Login /> :<Redirect to="login"/>}
        </Route>
        {user && (
          <>
            <Route path="/movies">
              <Home type="movie"/>
            </Route>
            <Route path="/series">
              <Home type="series"/>
            </Route>
            <Route path="/watch">
              <Watch/>
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
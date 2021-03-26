import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Home from "./views/Home";
import List from "./views/List";
import "bootstrap/dist/css/bootstrap.min.css";

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function App() {
  return (
    <Router>
      <AlertProvider template={AlertTemplate} {...options}>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Enterprise App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Link to="/">Registrar empresa</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/list">Lista de empresas</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AlertProvider>
    </Router>
  );
}

export default App;

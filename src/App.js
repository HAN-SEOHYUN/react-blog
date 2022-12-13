import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BlogForm from './components/BlogForm';

function App() {
  return (
    <Router>
      <nav className="navbar navbar navbar-dark bg-dark">
        <div class="container">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/blogs">
                Blogs
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
      <Switch>
        <Route path="/" exact>
          Home Page
        </Route>
        <Route path="/blogs">
          <BlogForm/>
        </Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;

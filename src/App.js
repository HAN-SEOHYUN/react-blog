import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import routes from "./routes";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          {routes.map((route)=> { //배열 map 사용 //고유 key를 반드시 넣어줘야 함
            return <Route key ={route.path} exact path ={route.path} component ={route.component}/>
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

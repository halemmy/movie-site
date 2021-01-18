import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// import MovieDetailPage from "./pages/MovieDetailPage";
import WatchNow from './pages/WatchNow';
import TopRated from './pages/TopRated';
import Upcoming from './pages/Upcoming';
import PublicNavBar from './components/PublicNavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
  return (
	<Router>
		  <PublicNavBar /> 
		  <Switch>
			<Route exact path="/" component={WatchNow} />
			  <Route path="/top_rated" component={TopRated} />
			  <Route path="/upcoming" component={Upcoming} />
			  <Route path="/movie/:id" component={MovieDetailPage} />

		  </Switch>
		
	</Router>
);
}

export default App;

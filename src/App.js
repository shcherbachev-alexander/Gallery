import './App.css';
import AlbumList from './components/AlbumList/AlbumList';
import AlbumItem from './components/AlbumItem/AlbumItem';
import {
  BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <AlbumList />
          </Route>
          <Route exact path="/album:albumId">
            <AlbumItem />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

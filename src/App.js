import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Play from './pages/Play';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/Search'>
          <Search />
        </Route>
        <Route path='/Play'>
          <Play />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

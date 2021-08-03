import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
 
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PlayPage from './pages/PlayPage';
import PasswordFindPage from './pages/PasswordFindPage';
import TroupePage from './pages/TroupePage';
import NotFoundPage from './pages/NotFoundPage';
import SearchResultPage from './pages/SearchResultPage';

function App() {
  return (
    <Router>
      {/* header component 위치 */}
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {/* 그냥 /search 일때 검색하는 페이지 */}
        {/* /search?query=검색어 검색(종합) 페이지 */}
        {/* /search/ongoing?query=검색어 현재 상영중인 연극 검색 결과 페이지 */}
        {/* /search/tobe?query=검색어 상영 예정 연극 검색 결과 페이지 */}
        {/* /search/closed?query=검색어 상영 종료된 연극 검색 결과 페이지 */}
        <Route path='/search/:type'>
          <SearchResultPage />
        </Route>
        <Route path='/search'>
          <SearchPage />
        </Route>
        <Route path='/play/:id'>
          <PlayPage />
        </Route>
        <Route path='/troupe/:id'>
          <TroupePage />
        </Route>
        <Route path='/auth/password-find'>
          <PasswordFindPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

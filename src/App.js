import { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom'
import './App.css';
import List from './components/List';

function App() {



  const [list, setList] = useState([])
  const [favorite, setFavorite] = useState([])
  const [params, setParams] = useState({
    limit: 100,
    order: 'Rand',
    visibleItem: 15,
    currentPage: 1,
  })

  useEffect(() => {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=${params.limit}&order=${params.order}`, {
      method: 'get',
      headers: {
        'x-api-key': '05048036-d0f0-47f8-ac4b-0c48c112f301'
      }
    }
    )
      .then(resp => resp.json())
      .then(data => setList(data.map(item => {
        return {
          ...item,
          status: false
        }
      })))
  }, [])



  const changePage = (event) => {
    event.deltaY > 0
      ? setParams({
        ...params,
        currentPage: params.currentPage == Math.ceil(params.limit / params.visibleItem) ? 1 : params.currentPage + 1
      })
      : setParams({
        ...params,
        currentPage: params.currentPage == 1 ? Math.ceil(params.limit / params.visibleItem) : params.currentPage - 1
      })
    console.log(Math.ceil(params.limit / params.currentPage))

  }

  const setFavorCat = (elem) => {
    elem.status = !elem.status
    elem.status
      ? setFavorite(list.filter(item => item.status))
      : setFavorite(favorite.filter(item => item.status))
  }

  return (

    <BrowserRouter>
      <div className='App'>
        <div className="container">
          <div className='navigation'>
            <NavLink to='/main' className='main_link' >
              Все котики
            </NavLink>
            <NavLink to='/favorite' className='favor_link'>
              Любимые котики
            </NavLink>
          </div>
          <div className="content">
            <Switch>
              <Route path='/main' render={() => <div className="main_list">
                <List arr={list}
                  setFavorCat={setFavorCat}
                  changePage={changePage}
                  visibleItem={params.visibleItem}
                  page={params.currentPage} />
              </div>} />
              <Route path='/favorite' render={() => <div className="favorite_list">
                <List arr={favorite}
                  setFavorCat={setFavorCat}
                />
              </div>} />
              <Redirect from='/' to='/main' />
            </Switch>
          </div>

        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;



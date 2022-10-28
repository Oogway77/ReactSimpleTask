import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/css/index.css';

import Detail from './components/detail';
import Loading from './components/loading';

const ENDPOINT = "https://api.punkapi.com/v2";

function App() {
  
  const perPage = 30;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [beerList, setBeerList] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [selID, setSelID] = useState(0);

  useEffect(() => {
    let requestUrl = ENDPOINT + '/beers?page=' + page + '&per_page=' + perPage;

    setLoading(true);
    axios
      .get(requestUrl)
      .then(function(response) {
        setBeerList(response.data);
      })
      .catch(error => {
        console.log(error)}
      )
      .finally(() =>
        setLoading(false)     
      );

  }, [page]);

  return (
    <div className="App">
      <div>
        <label>Search</label>
        <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
      </div>
      <table>
        <colgroup>
          <col width="60"/>
          <col width="60"/>
          <col />
          <col width="60"/>
          <col />
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr className="type2">
            <th >NO</th>
            <th >ABV</th>
            <th >NAME</th>
            <th >PH</th>
            <th >TAGLINE</th>
            <th >FIRST_BREWED</th>
            <th >IMAGE</th>
          </tr>
          {
            beerList.length > 0 && beerList
            .map((item, idx) => {     
              
              if (searchVal !== '' && !item.name.includes(searchVal))
                return null;
              return (
                <tr key={'beer_' + item.id} >
                  <td onClick={() => setSelID(item.id)}> {(page - 1) * perPage + idx + 1} </td>
                  <td onClick={() => setSelID(item.id)}> {item.abv}</td>
                  <td onClick={() => setSelID(item.id)}> {item.name}</td>
                  <td onClick={() => setSelID(item.id)}> {item.ph}</td>
                  <td onClick={() => setSelID(item.id)}> {item.tagline}</td>
                  <td onClick={() => setSelID(item.id)}> {item.first_brewed}</td>
                  <td onClick={() => setSelID(item.id)}> <img src={item.image_url} alt='beer'/></td>
                </tr>  
              );
            })
          }        
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>Prev</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      {
        selID > 0 &&<Detail selID={selID} setSelID={setSelID} setLoading={setLoading}/>
      }
      {
        loading && <Loading />
      }
    </div>
  );
}

export default App;

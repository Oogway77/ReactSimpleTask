import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ENDPOINT = "https://api.punkapi.com/v2";

function Detail(props) {

  const { selID, setSelID, setLoading } = props;
  
  const [beerInfo, setBeerInfo] = useState([]);

  useEffect(() => {
    let requestUrl = ENDPOINT + '/beers/' + selID;

    setLoading(true);
    axios
      .get(requestUrl)
      .then(function(response) {
        setBeerInfo(response.data[0]);
      })
      .catch(error => {
        console.log(error)}
      )
      .finally(() =>
        setLoading(false)     
      );

  }, [selID, setLoading]);
    

  return (
    <div className='detail'>
      <div className='container'>
        <h2>Detail Page</h2>
        {
          beerInfo.id !== undefined &&
          <table>
            <colgroup>
              <col width="60"/>
              <col />
            </colgroup>
            <tbody>
              <tr className="type2">
                <th >TITLE</th>
                <th >CONTENT</th>
              </tr>
              <tr >
                <th >NAME</th>
                <td >{beerInfo.name}</td>
              </tr> 
              <tr >
                <th >IBU</th>
                <td >{beerInfo.ibu}</td>
              </tr> 
              <tr >
                <th >HOPS</th>
                <td >
                  {
                    beerInfo.ingredients.hops
                    .map((item, idx) => <p key={idx}>{item.name}</p>)
                  }
                </td>
              </tr> 
              <tr >
                <th >MALT</th>
                <td >
                  {
                    beerInfo.ingredients.malt
                    .map((item, idx) => <p key={idx}>{item.name}</p>)
                  }
                </td>
              </tr> 
              <tr >
                <th >IMAGE</th>
                <td > <img src={beerInfo.image_url} alt='beer'/></td>
              </tr>  
            </tbody>
          </table>
        }     
        <button onClick={() => setSelID(0)}>CLOSE</button>   
      </div>
    </div>
  );
}

export default Detail;

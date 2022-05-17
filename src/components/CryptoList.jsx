import React from 'react';
import axios from 'axios';
import './CryptoList.css';
import { Link } from 'react-router-dom';
import LoadingComponent from './LoadingComponent';

export default class CryptoList extends React.Component {
  state = {
    cryptos: [],
    range: 10,
    ready: false
  }
  setFilter() {
    var r = document.getElementById('filter').value
    this.setState({ range: r })
  }
  componentDidMount() {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=10+0&page=1&sparkline=false')
      .then(res => {
        this.setState({ cryptos: res.data, ready: true });
      })
  }
  render() {
    return (

      <div className='contentcontainer'>

        <div className="hero"><h2>Cryptocurrency Prices Live
        </h2><h3>Top Coins by Market Cap</h3>
        </div>

        <div className='bodyContainer'>
          <div className="crypto-table">
            <div className='tableFunctions'>
              <div className='elementsFilter'>
                <select defaultValue={10} onChange={() => { this.setFilter() }} id="filter">
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            <div className="content">
              <LoadingComponent load={!this.state.ready}/>
              {this.state.cryptos
                .slice(0, this.state.range)
                .map(crypto =>
                  <>
                    <div className="crypto-pair" key={crypto.id}>
                      <div className="crypto-name">
                        <div><img src={crypto.image} alt={crypto.name + " logo"}></img></div>
                        <div><Link to={"info/" + crypto.id}>{crypto.name}</Link></div>
                      </div>
                      <div className='crypto-price'>$ {crypto.current_price}</div>
                    </div>

                  </>

                )
              }
            </div>
          </div>
        </div>

      </div>
    )
  }
}
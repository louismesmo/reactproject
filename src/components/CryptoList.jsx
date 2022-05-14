import React from 'react';
import axios from 'axios';
import './CryptoList.css';
import {Link} from 'react-router-dom';

export default class CryptoList extends React.Component {
    state = {
      cryptos: []
    }
    
    componentDidMount() {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(res => {
            console.log(res.data)
          const cryptos = res.data;
          this.setState({ cryptos });
        })
    }
  
    render() {
      return (
        <div className="crypto-table">
          {
            this.state.cryptos
              .map(crypto =>
                <>
                <div className="crypto-pair" key={crypto.id}>
                    <div className="crypto-name">
                        <div><img src={crypto.image} alt={crypto.name + " logo"}></img></div>
                        <div><Link to={"info/"+crypto.id}>{crypto.name}</Link></div>
                    </div>
                    <div>USD {crypto.current_price}</div>
                </div>
                </>
              )
          }
        </div>
      )
    }
  }
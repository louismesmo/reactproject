import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { createChart } from 'lightweight-charts';


class CryptoInfo extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        info: []
      };

    }
chart() {
  const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
  const chart = createChart(document.getElementById('container'), chartOptions);
  const lineSeries = chart.addLineSeries({ color: '#2962FF' });
  const data = {};
  const apicall = [{
    "prices": [
      [
        1651708800000,
        39699.02404125388
      ],
      [
        1651795200000,
        36612.229548803036
      ],
      [
        1651881600000,
        36116.394294982965
      ],
      [
        1651968000000,
        35573.31019883488
      ],
      [
        1652054400000,
        34070.31219757961
      ],
      [
        1652140800000,
        30269.586956629482
      ],
      [
        1652227200000,
        31026.93386836242
      ],
      [
        1652313600000,
        28913.48836365432
      ],
      [
        1652400000000,
        29126.11597686014
      ],
      [
        1652486400000,
        29310.728959858257
      ],
      [
        1652567094000,
        29752.876106780015
      ]
    ]
  }]
  console.log(data);
  apicall[0]['prices'].map((pair)=>{
    data.splice('time',0,pair[0]);
    data.splice('value',0,pair[1]);
  });
  console.log(data);
  /* lineSeries.setData(data);
  
  chart.timeScale().fitContent(); */
}
componentDidMount() {
this.chart();
  
    axios.get('https://api.coingecko.com/api/v3/coins/'+this.props.coinid['coinid'])
    .then(res => {
        console.log(res.data)
        const info = res.data;
      this.setState({ info });
      this.render();
    })
}

render() {
  return(
    <div className="content">
      <div className="header">
        <div className="logo">
          <img src={this.state.info.image && this.state.info.image['small']} alt="" />
        </div>
        <div className="desc">
          <div className="name">
            <div className="full">
              <p>{this.state.info['name']}</p>
            </div>
            <div className="symbol">
            <p>{this.state.info['symbol']}</p>
            </div>
          </div>
          <div className="value">
            <div className="current">
              <p>{this.state.info.tickers && this.state.info.tickers[0].last}</p>
            </div>
            <div className="variation">
              {}
            </div>
          </div>
        </div>

      </div>


      <div className="description">
        
        <p dangerouslySetInnerHTML={{__html: this.state.info.description && this.state.info.description['en']}}>
        </p>
      </div>

      <div className="buttonswrapper">
        
        <div className="buttonTrade">
            <a href={"https://whitebit.com/trade/"+this.state.info.symbol+"-USDT"} rel="noreferrer" type="button" id="bTrade">
            <FontAwesomeIcon icon={faCartShopping}/> Trade Crypto </a>
      </div>

      <div className="buttonSite">
            <a href={this.state.info.links && this.state.info.links.homepage[0]} rel="noreferrer" target="_blank" type ="button" id="bInfo"> Official Website</a>
      </div>
      </div>

      <div className="contentGrid">
       
       <div className="cgrid1">
         <div className="info"><h3>Market Rank</h3><p>{this.state.info.coingecko_rank}</p></div>
         <div className="info"><h3>Bitcoin Price</h3><p>${this.state.info.market_data && this.state.info.market_data.current_price['usd']}</p></div>
         <div className="info"><h3>Market Cap</h3><p>{this.state.info.market_data && this.state.info.market_data.market_cap['usd']}</p></div>
         <div className="info"><h3>Trading Volume (24H)</h3><p>{this.state.info.market_data && this.state.info.market_data.total_volume['usd']}</p></div>
         </div>  

       <div className="cgrid2">
         
        <div className="info"><h3>Price Change (24h)</h3><p>{this.state.info.market_data && this.state.info.market_data.price_change_24h}</p></div>
        <div className="info"><h3>Circulating Supply</h3><p>{this.state.info.market_data && this.state.info.market_data.circulating_supply}</p>
        </div>
        <div className="info"><h3>24h Low / 24h High</h3><p>{this.state.info.market_data && this.state.info.market_data.high_24h['usd'] +" / "+ this.state.info.market_data.low_24h['usd']}</p>
        </div>
        <div className="info"><h3>Max Supply</h3><p>{this.state.info.market_data && this.state.info.market_data.total_supply}</p></div>
        </div>      
      </div>

      
<div className="chart">
  <h2>Historical Data Price Chart</h2>

  
</div>
<div id="container"></div>
      </div>
      
  );
}
}

export default CryptoInfo;
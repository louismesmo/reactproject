import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import "./CryptoInfo.css"
import CryptoChart from './CryptoChart';
import CryptoSwap from "./CryptoSwap";
class CryptoInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      usdprice: null,
      btcprice: null
    };
  }

  componentDidMount() {
    axios.get('https://api.coingecko.com/api/v3/coins/' + this.props.coinid['coinid'])
      .then(res => {
        console.log(res.data)
        const info = res.data;
        const usdprice = res.data.tickers.find(e => e.base===res.data.symbol.toUpperCase() && e.target==='USD')
        var btcprice = []
        if(res.data.symbol==='btc'){
          btcprice = res.data.tickers.find(e => e.base==='ETH' && e.target==='BTC')
          btcprice.last = 1/btcprice.last
        }else{
          btcprice = res.data.tickers.find(e => e.base===res.data.symbol.toUpperCase() && e.target==='BTC')
          if (!btcprice) {
            btcprice = res.data.tickers.find(e => e.base==='BTC' && e.target===res.data.symbol.toUpperCase())
            btcprice.last = 1/btcprice.last
          }
        }
        this.setState({ info,usdprice:usdprice.last,btcprice:btcprice.last}, () => {
          this.render();
        });
      })
  }

  render() {
    return (
      <div className="contentcontainer">
        <div className="cryptoinfo">
          <div className="header">
            <div className="logo">
              <img src={this.state.info.image && this.state.info.image['small']} alt="" />
            </div>
            <div className="desc">
              <div className="name">
                <h2>{this.state.info['name']}</h2>
                <p><uppercase>{this.state.info['symbol']}</uppercase></p>
              </div>
              <div className="value">
                <h2>{this.state.usdprice} USD</h2>
                <p>{this.state.btcprice}{this.state.info['symbol']==='btc'?' ETH':' BTC'}</p>
              </div>
            </div>

          </div>

          <CryptoChart />



          <div className="buttonswrapper">

            <div className="buttonTrade">
              <a href={"https://whitebit.com/trade/" + this.state.info.symbol + "-USDT"} rel="noreferrer" target="_blank" type="button" id="bTrade" className="primary-button">
                <FontAwesomeIcon icon={faCartShopping} /> Trade Crypto </a>
            </div>

            <div className="buttonSite">
              <a href={this.state.info.links && this.state.info.links.homepage[0]} rel="noreferrer" target="_blank" type="button" id="bInfo" className="primary-button"> Official Website</a>
            </div>
          </div>

          <div className="contentGrid">

            <div className="cgrid">
              <div className="info"><h3>Market Rank</h3><p>{this.state.info.coingecko_rank}</p></div>
              <div className="info"><h3>Bitcoin Price</h3><p>${this.state.info.market_data && this.state.info.market_data.current_price['usd']}</p></div>
              <div className="info"><h3>Market Cap</h3><p>{this.state.info.market_data && this.state.info.market_data.market_cap['usd']}</p></div>
              <div className="info"><h3>Trading Volume (24H)</h3><p>{this.state.info.market_data && this.state.info.market_data.total_volume['usd']}</p></div>
            </div>

            <div className="cgrid">

              <div className="info"><h3>Price Change (24h)</h3><p>{this.state.info.market_data && this.state.info.market_data.price_change_24h}</p></div>
              <div className="info"><h3>Circulating Supply</h3><p>{this.state.info.market_data && this.state.info.market_data.circulating_supply}</p>
              </div>
              <div className="info"><h3>24h Low / 24h High</h3><p>{this.state.info.market_data && this.state.info.market_data.low_24h['usd'] + " / " + this.state.info.market_data.high_24h['usd']}</p>
              </div>
              <div className="info"><h3>Max Supply</h3><p>{this.state.info.market_data && this.state.info.market_data.total_supply}</p></div>
            </div>
          </div>
          <div className="description">

            <p dangerouslySetInnerHTML={{ __html: this.state.info.description && this.state.info.description['en'] }}>
            </p>
          </div>

          <CryptoSwap value={this.state.info.tickers && this.state.info.tickers[0].last} goal={this.state.info['symbol']} />
        </div>
      </div>

    );
  }
}

export default CryptoInfo;
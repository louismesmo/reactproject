import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import "./CryptoInfo.css"
import CryptoChart from './CryptoChart';

class CryptoInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: []
    };
  }

  componentDidMount() {

    axios.get('https://api.coingecko.com/api/v3/coins/' + this.props.coinid['coinid'])
      .then(res => {
        console.log(res.data)
        const info = res.data;
        this.setState({ info }, () => {
          this.render();
        });
      })
  }

  render() {
    return (
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
                { }
              </div>
            </div>
          </div>

        </div>


        <div className="description">

          <p dangerouslySetInnerHTML={{ __html: this.state.info.description && this.state.info.description['en'] }}>
          </p>
        </div>

        <div className="buttonswrapper">

          <div className="buttonTrade">
            <a href={"https://whitebit.com/trade/" + this.state.info.symbol + "-USDT"} rel="noreferrer" type="button" id="bTrade">
              <FontAwesomeIcon icon={faCartShopping} /> Trade Crypto </a>
          </div>

          <div className="buttonSite">
            <a href={this.state.info.links && this.state.info.links.homepage[0]} rel="noreferrer" target="_blank" type="button" id="bInfo"> Official Website</a>
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
            <div className="info"><h3>24h Low / 24h High</h3><p>{this.state.info.market_data && this.state.info.market_data.high_24h['usd'] + " / " + this.state.info.market_data.low_24h['usd']}</p>
            </div>
            <div className="info"><h3>Max Supply</h3><p>{this.state.info.market_data && this.state.info.market_data.total_supply}</p></div>
          </div>
        </div>


        <CryptoChart />
      </div>

    );
  }
}

export default CryptoInfo;
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
  async setchartdata(range, serie, chart){
    const data = await this.getData(range)
    serie.setData(data);
    chart.timeScale().fitContent();
  }
  getData(range) {
    return new Promise(resolve => {
      axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=' + range).then(res => {
        var apicall = res.data
        resolve(apicall.prices.map((pair) => {
          return { time: pair[0] / 1000, value: pair[1] }
        }))
      })
    })
  }
  async newchart(range) {
    const chartOptions = {
      layout: { textColor: 'black', background: { type: 'solid', color: 'white' } },
      timeScale: {
        timeVisible: true
      }
    };
    this.chart = createChart(document.body, chartOptions);
    this.lineSeries = this.chart.addLineSeries({ color: '#2962FF' });
    this.setchartdata(30,this.lineSeries, this.chart);
  }
  
  componentDidMount() {

    this.newchart(30);

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


        <div className="chart">
          <h2>Historical Data Price Chart</h2>
          <button onClick={() => { this.setchartdata(1,this.lineSeries, this.chart) }}>24h</button>
          <button onClick={() => { this.setchartdata(7,this.lineSeries, this.chart) }}>Week</button>
          <button onClick={() => { this.setchartdata(30,this.lineSeries, this.chart) }}>Month</button>
          <button onClick={() => { this.setchartdata(90,this.lineSeries, this.chart) }}>Trimester</button>


        </div>
        <div id="container"></div>
      </div>

    );
  }
}

export default CryptoInfo;
import React from "react";
import axios from "axios";
import { createChart } from 'lightweight-charts';

class CryptoChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = { range: 0, price: "", date: "", left: 0, display: 0 };
    }
    async setchartdata(range, serie, chart) {
        const data = await this.getData(range)
        serie.setData(data);
        chart.timeScale().fitContent();
        range > 1 ? chart.applyOptions({
            timeScale: {
                timeVisible: false
            }
        })
            :
            chart.applyOptions({
                timeScale: {
                    timeVisible: true
                }
            })
        range === 'max' && chart.applyOptions({
            timeScale: {
                timeVisible: false
            }
        })
    }
    getData(range) {
        return new Promise(resolve => {
            axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=' + range).then(res => {
                var apicall = res.data
                resolve(apicall.prices.map((pair) => {
                    this.setState({range:range})
                    return { time: pair[0] / 1000, value: pair[1] }
                }))
            })
        })
    }
    async newchart(range) {
        const chartOptions = {
            layout: { 
            textColor: 'black',
            background: { type: 'solid', color: 'white' }
        },
            timeScale: {
                timeVisible: true,
                fixRightEdge: true,
                fixLeftEdge: true
            },
            
        };
        this.chart = createChart(document.querySelector('#container'), chartOptions);
        this.lineSeries = this.chart.addLineSeries({ color: '#2962FF' });
        this.setchartdata(30, this.lineSeries, this.chart);

    }

    componentDidMount() {
        this.newchart(30);
        this.chart.subscribeCrosshairMove(param => {
            if (!param.point) {
                this.setState({ display: 0 })
                return
            }
            var x = param.point.x;
            var xcentage = (((x - 0) / (document.getElementById("container").offsetWidth - 0)) * 81)
            var date = new Date(param.time * 1000);
            var year = date.getFullYear();
            var month = date.getMonth().toString().padStart(2, 0);
            var day = date.getDate().toString().padStart(2, 0);
            var hour = date.getHours().toString().padStart(2, 0);
            var minute = date.getMinutes().toString().padStart(2, 0);
            var second = date.getSeconds().toString().padStart(2, 0);
            var formatteddate = ''
            if (this.state.range>1 || this.state.range==='max'){
                formatteddate = month + '-' + day + '-' + year;
            } else {
                formatteddate = hour + ':' + minute + ':' + second;
            }
            this.setState({ price: param.seriesPrices.get(this.lineSeries), date: formatteddate,left: xcentage, display: 1 });

        });
    }
    render() {
        return (
            <>
                <div className="chart">
                    <h2>Historical Data Price Chart</h2>
                    <button onClick={() => { this.setchartdata(1, this.lineSeries, this.chart) }}>24h</button>
                    <button onClick={() => { this.setchartdata(7, this.lineSeries, this.chart) }}>Week</button>
                    <button onClick={() => { this.setchartdata(30, this.lineSeries, this.chart) }}>Month</button>
                    <button onClick={() => { this.setchartdata(90, this.lineSeries, this.chart) }}>Trimester</button>
                    <button onClick={() => { this.setchartdata(365, this.lineSeries, this.chart) }}>Year</button>
                    <button onClick={() => { this.setchartdata('max', this.lineSeries, this.chart) }}>Max</button>
                </div>

                <div id="container">
                <span className="floating-tooltip-2" id="toolTip" style={{left: `${this.state.left}%`, opacity: `${this.state.display}` }}>
                    {this.state.price}<br />
                    {this.state.date}
                </span>
                </div>
            </>
        )
    }
}
export default CryptoChart
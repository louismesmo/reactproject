import React from "react";
import axios from "axios";
import { createChart } from 'lightweight-charts';
import './CryptoChart.css';
import LoadingComponent from "./LoadingComponent";
class CryptoChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = { range: 0, price: "", date: "", left: 0, display: 0, active: false, ready: false };
    }
    toggleButton(e) {
        var buttons = document.getElementsByClassName('primary-button')
        for (let b of buttons) {
            b.classList.remove('selected')
            b.disabled = false
        }
        document.getElementById(e).classList.add("selected")
        document.getElementById(e).disabled = true;

    }
    async setchartdata(range, serie, chart, e) {
        e && this.toggleButton(e.target.id)
        var data = 0
        if (serie === this.lineSeries) {
            data = await this.getData(range, 'price')
        } else {
            data = await this.getData(range, 'total_volumes')
        }
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
    getData(range, d) {
        if (d === 'price') {
            return new Promise(resolve => {
                axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=' + range).then(res => {
                    var apicall = res.data
                    this.setState({ range: range, ready: true },()=>{console.log(this.state.ready)})
                    resolve(apicall.prices.map((pair) => {
                        return { time: pair[0] / 1000, value: pair[1] }
                    }))
                })
            })
        } else {
            return new Promise(resolve => {
                axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=' + range).then(res => {
                    var apicall = res.data
                    resolve(apicall.total_volumes.map((pair) => {
                        this.setState({ range: range, ready: true })
                        return { time: pair[0] / 1000, value: pair[1] }
                    }))
                })
            })
        }
    }
    newchart(range) {
        const chartOptions = {
            layout: {
                textColor: 'white',
                background: { type: 'solid', color: '#373951' }
            },
            timeScale: {
                timeVisible: true,
                fixRightEdge: true,
                fixLeftEdge: true,
                borderVisible: false
            },
            height: 400,
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false }
            },
            priceScale: {
                borderVisible: false,
                visible: false
            }


        };
        this.chart = createChart(document.querySelector('#container'), chartOptions);
        this.lineSeries = this.chart.addAreaSeries({ topColor: '#5561FF', bottomColor: '#373951', lineColor: '#ffffffaa', lineWidth: '2px' });
        /* this.areaSeries = this.chart.addAreaSeries({ color: '#2258FB' }); */
        this.setchartdata(range, this.lineSeries, this.chart);
        /* this.setchartdata(range, this.areaSeries, this.chart); */
    }

    componentDidMount() {
        document.getElementById('month').disabled = true;
        document.getElementById('month').classList.add('selected')
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
            var monthnum = date.getMonth() + 1;
            var month = monthnum.toString().padStart(2, 0);
            var day = date.getDate().toString().padStart(2, 0);
            var hour = date.getHours().toString().padStart(2, 0);
            var minute = date.getMinutes().toString().padStart(2, 0);
            var second = date.getSeconds().toString().padStart(2, 0);
            var formatteddate = ''
            if (this.state.range > 1 || this.state.range === 'max') {
                formatteddate = month + '-' + day + '-' + year;
            } else {
                formatteddate = hour + ':' + minute + ':' + second;
            }
            this.setState({ price: param.seriesPrices.get(this.lineSeries), date: formatteddate, left: xcentage, display: 1 });
        });
    }
    render() {
        return (
            <div className="chartcontainer">
                <LoadingComponent load={!this.state.ready} />
                <div id="container">
                    <span className="floating-tooltip-2" id="toolTip" style={{ left: `${this.state.left}%`, opacity: `${this.state.display}` }}>
                        {this.state.price}
                        <br />
                        {this.state.date}
                    </span>
                </div>
                <div className="chartbuttons">
                    <button className={this.state.active ? 'primary-button selected' : 'primary-button'} onClick={(e) => { this.setchartdata(1, this.lineSeries, this.chart, e) }} id="day">24h</button>
                    <button className={this.state.active ? 'primary-button selected' : 'primary-button'} onClick={(e) => { this.setchartdata(7, this.lineSeries, this.chart, e) }} id="week">Week</button>
                    <button className={this.state.active ? 'primary-button selected' : 'primary-button'} onClick={(e) => { this.setchartdata(30, this.lineSeries, this.chart, e) }} id="month">Month</button>
                    <button className={this.state.active ? 'primary-button selected' : 'primary-button'} onClick={(e) => { this.setchartdata(90, this.lineSeries, this.chart, e) }} id="trimester">Trimester</button>
                    <button className={this.state.active ? 'primary-button selected' : 'primary-button'} onClick={(e) => { this.setchartdata(365, this.lineSeries, this.chart, e) }} id="year">Year</button>
                    <button className={this.state.active ? 'primary-button selected' : 'primary-button'} onClick={(e) => { this.setchartdata('max', this.lineSeries, this.chart, e) }} id="max">Max</button>
                </div>
            </div>
        )
    }
}
export default CryptoChart
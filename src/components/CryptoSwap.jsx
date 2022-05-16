import React from "react";
import './CryptoSwap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';

class CryptoSwap extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            to: '',
            from: '',
            operation: 1
        }
    }
    setValue(){
        this.state.operation>0?this.setState({from: document.getElementById('from').value, to: document.getElementById('from').value/(this.props.value)}):this.setState({from: document.getElementById('from').value, to: document.getElementById('from').value*(this.props.value)})
    }
    switchOperation(){
        this.setState({from:this.state.to,to:this.state.from,operation:this.state.operation*(-1)},this.setValue())
    }
    render() {
        return (
            <>
                <div className="swapper">
                    <div className="text">
                        <h3>
                            Swap USD to <uppercase>{this.props.goal}</uppercase>
                        </h3>
                        <p>
                            Use our calculator to swap your currency with current crypto value
                        </p>
                    </div>
                    <div className="inputs">
                        <div className="from">
                            <input type="text" id="from" value={this.state.from} onChange={()=>{this.setValue()}}/>
                        </div>
                        <div className="swap">
                            <button onClick={()=>{this.switchOperation()}}>
                                <FontAwesomeIcon icon={faArrowRightArrowLeft} className="rotate90"/>
                            </button>
                        </div>
                        <div className="to">
                            <input type="text" id="to" value={this.state.to} readOnly/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default CryptoSwap
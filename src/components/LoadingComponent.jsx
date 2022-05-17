import React from "react";
import './LoadingComponent.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

function LoadingComponent(props) {
    return props.load && (
        <div className="loading-toast" id="Loading">
            <FontAwesomeIcon icon={faCompass} />
            <span>Loading...</span>
        </div>
    )

}
export default LoadingComponent

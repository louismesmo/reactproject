import React from "react";
import { useParams } from "react-router-dom";

import CryptoInfo from "./CryptoInfo";

function GetParam() {

    let id = useParams();
    console.log(id.coinid);

    return (
        <>
            <CryptoInfo coinid={id} />
        </>
    );
}

export default GetParam;
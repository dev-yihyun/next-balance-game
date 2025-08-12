import React from "react";
import { BeatLoader } from "react-spinners";

function Loading() {
    return <BeatLoader color="#000000" size={25} />;
}

export default React.memo(Loading);

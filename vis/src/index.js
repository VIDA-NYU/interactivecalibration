// react
import React from "react";
import ReactDOM from "react-dom";

// bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';

// third-party libs
import { select } from 'd3-selection'

// components
import Calibration from './Calibration';

// Testing in the browser
ReactDOM.render(<Calibration/>, document.querySelector("#root") );

// export function renderCalibration(divName, data){
// 	ReactDOM.render( <Calibration chartdata={data.points}/>, select(divName).node() );
// }
// renderCalibration();
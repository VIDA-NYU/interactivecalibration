import React from "react";
import ReactDOM from "react-dom";
import { select } from 'd3-selection'

export function renderCalibration(divName, data){
	ReactDOM.render(<div style={{width: 400, height: 600, backgroundColor:'red'}}><h1>Hello World 44</h1></div>, select(divName).node() );
	//ReactDOM.render(<App/>, select(divName).node() );
	//ReactDOM.render(<App/>, document.querySelector("#root") );
}

//renderCalibration();

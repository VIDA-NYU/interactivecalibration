// react
import React from 'react';

// styles
import './Classiccalibration.css';

// hooks
import { renderD3 } from '../../hooks/render.hook';

// third-party
import * as d3 from 'd3';

const ClassicCalibrationPlot = ( props ) => {

    const ref = renderD3( 
        (svgref) => {

            // constants
            const margins = {
                top: 40,
                left: 40,
                right: 40,
                bottom: 40
            }

            // creating groups
            const yAxisGroup = svgref
                .append("g")
                .attr("transform", `translate(${margins.left},${margins.top})`);

            const xAxisGroup = svgref
                .append("g")
                .attr("transform", `translate(${margins.left},${svgref.node().getBoundingClientRect().height -  margins.bottom})`);
            
            // svg size
            const svgWidthRange = [0, svgref.node().getBoundingClientRect().width - margins.left - margins.right];
            const svgHeightRange = [0, svgref.node().getBoundingClientRect().height - margins.top - margins.bottom];

            // calculating data domain
            const xDomain = d3.extent( props.chartdata, point => point.x);
            const yDomain = d3.extent( props.chartdata, point => point.y);

            // creating scales
            const xScale = d3.scaleLinear().domain(xDomain).range(svgWidthRange);
            const yScale = d3.scaleLinear().domain(yDomain).range(svgHeightRange);

            console.log(svgHeightRange);

            // appending axes
            xAxisGroup
                .style("color", "steelblue")
                .call(d3.axisBottom(xScale));

            yAxisGroup
                .style("color", "steelblue")
                .call(d3.axisLeft(yScale));


            //  creating groups
            console.log('PROPS INSIDE: ', props);

        });

    return (
        <div className='plot-container'>
            <svg ref={ref}></svg>
        </div>
    );
}

export default ClassicCalibrationPlot;
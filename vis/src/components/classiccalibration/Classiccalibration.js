// react
import React, { useState } from 'react';

// styles
import './Classiccalibration.css';

// hooks
import { renderD3 } from '../../hooks/render.hook';

// third-party
import * as d3 from 'd3';

const ClassicCalibrationPlot = ( props ) => {   
    
    const create_brush = (chartGroup, svgref, margins, xScale) => {

        // creating brush
        const brush = d3.brushX()
        .extent([ 
            [0, 0], 
            [svgref.node().getBoundingClientRect().width - margins.left - margins.right, svgref.node().getBoundingClientRect().height - margins.top - margins.bottom]
        ])
        .on("end", (event) => { props.onDiagramBrushed({'start': xScale.invert(event.selection[0]), 'end': xScale.invert(event.selection[1]) }) });

        // appending brush
        chartGroup.call(brush);
    }

    const clear_plot = (svgref) => {
        svgref.selectAll('*').remove();
    }

    const render_calibration_line = ( chartGroup, xScale, yScale, data  ) => {

        // creating line function
        const line = d3.line()
            .curve(d3.curveLinear)
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));
        
        // appending circles
        chartGroup
            .append('path')
            .datum(data) 
            .attr("class", "line") 
            .attr("d", line)
            .style("fill", "none")
            .style("stroke", "#a2a3a2")
            .style("stroke-width", "1");

    }

    const render_support_line = ( chartGroup, xScale, yScale ) => {

        // support line data
        const supportLineData = [];
        for(let i = 0; i < 1; i += 0.1){
            const point = {'x': i, 'y': i};
            supportLineData.push(point);
        }

        // creating line function
        const line = d3.line()
            .curve(d3.curveLinear)
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));
        
        // appending circles
        chartGroup
            .append('path')
            .datum(supportLineData) 
            .attr("class", "line") 
            .attr("d", line)
            .attr('stroke-dasharray', '5 5')
            .style("fill", "none")
            .style("stroke", "#a2a3a2")
            .style("stroke-width", "1");

    }

    const ref = renderD3( 
        (svgref) => {

            // constants
            const margins = {
                top: 40,
                left: 40,
                right: 40,
                bottom: 40
            }

            // clearing
            clear_plot(svgref);

            // creating groups
            const yAxisGroup = svgref
                .append("g")
                .attr("transform", `translate(${margins.left},${margins.top})`);

            const xAxisGroup = svgref
                .append("g")
                .attr("transform", `translate(${margins.left},${svgref.node().getBoundingClientRect().height -  margins.bottom})`);

            const chartGroup = svgref
                .append("g")
                .attr("transform", `translate(${margins.left},${margins.top})`);
            
            // svg size
            const svgWidthRange = [0, svgref.node().getBoundingClientRect().width - margins.left - margins.right];
            const svgHeightRange = [0, svgref.node().getBoundingClientRect().height - margins.top - margins.bottom];

            // calculating data domain
            const xDomain = [0,1];
            const yDomain = [0,1];

            // creating scales
            const xScale = d3.scaleLinear().domain(xDomain).range(svgWidthRange);
            const yScale = d3.scaleLinear().domain(yDomain).range([svgHeightRange[1], svgHeightRange[0]]);

            // appending axes
            xAxisGroup
                .style("color", "#a2a3a2")
                .call(d3.axisBottom(xScale));

            yAxisGroup
                .style("color", "#a2a3a2")
                .call(d3.axisLeft(yScale));

            // appending brush
            create_brush( chartGroup, svgref, margins, xScale );

            // rendering support line
            render_support_line( chartGroup, xScale, yScale );

            // mocking data
            render_calibration_line( chartGroup, xScale, yScale, props.chartdata );
            
        });

    return (
        <div className='plot-container'>
            <svg ref={ref}></svg>
        </div>
    );
}

export default ClassicCalibrationPlot;
// react
import React, { useState } from 'react';

// styles
import './Featurehistogram.css';

// hooks
import { renderD3 } from '../../hooks/render.hook';

// third-party
import * as d3 from 'd3';

const Featurehistogram = ( props ) => {

    const add_header = ( headerGroup, name ) => {
        headerGroup
            .append('text')
            .style('fill', '#969696')
            .style('font-family', "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif")
            .style('font-size', '12px')
            .text(name)
            
    }

    const render_histogram = ( chartGroup, xScale, yScale, data ) => {

        // calculating width of the bar
        const bartWidth = (xScale.range()[1] / data.length) - 2;

        chartGroup
            .selectAll('.bar')
            .data( data )
            .join(
                enter => 
                    enter.append('rect')
                        .attr('x', (d, index) => xScale(index) - 2)
                        .attr('y', (d, index) => yScale(d) )
                        .attr('width', bartWidth)
                        .attr('height', (d, index) => yScale.range()[0] - yScale(d)  )
                        .attr('fill', '#a6bddb')
                        .attr('stroke', '#3690c0')
                        .attr('stroke-width', '1')
        )            
    }

    const ref = renderD3( 
        (svgref) => {

            // constants
            const margins = {
                top: 30,
                left: 20,
                right: 20,
                bottom: 20
            }

            const chartGroup = svgref
                .append("g")
                .attr("transform", `translate(${margins.left},${margins.top})`);

            const headerGroup = svgref
                .append("g")
                .attr("transform", `translate(${margins.left},${margins.top/2})`);

            // svg size
            const svgWidthRange = [0, svgref.node().getBoundingClientRect().width - margins.left - margins.right];
            const svgHeightRange = [0, svgref.node().getBoundingClientRect().height - margins.top - margins.bottom];

            // calculating data domain
            const xDomain = [ 0, props.histdata.values.length - 1 ];
            const yDomain = [ d3.min(props.histdata.values) - 5, d3.max(props.histdata.values)] ;

            // creating scales
            const xScale = d3.scaleLinear().domain(xDomain).range(svgWidthRange);
            const yScale = d3.scaleLinear().domain(yDomain).range([svgHeightRange[1], svgHeightRange[0]]);

            // adding header
            add_header( headerGroup, props.histdata.name );

            // rendering chart
            render_histogram( chartGroup, xScale, yScale, props.histdata.values);

        });

    return (
        <div className='histogram-plot-wrapper'>
            <div className='histogram-plot-container'>
                <svg ref={ref}></svg>
            </div>
        </div>
    );

}

export default Featurehistogram;
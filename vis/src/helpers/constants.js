// third-party
import * as d3 from 'd3';

export const nameTranslator = {

    'currentmodel': 'Model',
    'selectedclass': 'Class',
    'nbins': 'Bins'

};


// creating color scale
export const divergingColorScale10 = d3.scaleOrdinal(d3.schemeCategory10).domain([0, 10])

// export default nameTranslator;
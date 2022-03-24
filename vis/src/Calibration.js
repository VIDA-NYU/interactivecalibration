// react
import React, { useState } from 'react';

// styles
import './Calibration.css'

// components
import ClassicCalibrationPlot from './components/classiccalibration/Classiccalibration';
import Header from './components/header/Header';
import Featurehistogram from './components/histogram/Featureshistogram';
import Instanceview from './components/instanceview/Instanceview';


const Calibration = ( props ) => {    

    // setting state
    const [chartdata, setChartData] = useState( [] );
    const [tableHeader, setTableHeader] = useState( [] );
    const [tableBody, setTableBody] = useState( [] );
    const [classifications, setClassifications] = useState( [] );
    const [featureFilters, setFeatureFilters] = useState( {} );

    const reliability_diagram_brushed = (brushrange) => {

        const mockheader = ['Age', 'Education-Num', 'Sex', 'Capital Gain', 'Capital Loss','Hours per week'];
        const mockbody = 
        [[ 3.000,  1.130,  1.000,  2.174,  0.000, 4.000],
        [ 8.400,  1.130,  1.000,  0.000,  0.000, 2.220],
        [4.000, 4.200,  1.000,  0.000,  0.000, 4.000],
        [1.060, 1.200,  1.000,  0.000,  0.000, 4.000],
        [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
        [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
        [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
        [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
        [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
        [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
        [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
        [1.200,  1.520,  0.000,  0.000,  0.000, 4.000]];

        const classifications = [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1];


        setTableHeader( mockheader );
        setTableBody( mockbody );
        setClassifications( classifications );
        
        
    //     const instance_table = ( data ) => {

    //         console.log('TEST: ', data);
            
    //         setTableHeader( data.tableheader );
    //         setTableBody( data.tablebody );
    //         setClassifications( data.classifications );

            
    //    };
    //    let comm_instance_table = new CommAPI('filter_by_pred_range', instance_table);

    //    // Send data
    //    comm_instance_table.call({'params': { 'rangestart': brushrange.start, 'rangeend': brushrange.end  }  });

    }

    const feature_brushed = (featureconditions) =>   {

        const currentFilters = {
            ...featureFilters,
        }
        currentFilters[featureconditions['name']] = featureconditions;
        setFeatureFilters(currentFilters);

        console.log(featureFilters);


    }
 
    const configuration_changed = (configuration) => {

        const reliability_diagram = ( data ) => {
             setChartData( data.chartdata );
        };
        let comm_configuration_changed = new CommAPI('get_reliability_diagram', reliability_diagram);

        // Send data
        comm_configuration_changed.call({'params': { nbins: parseInt(configuration.nbins), currentclass: parseInt(configuration.currentClass) }  });

    }

    return (
        <div>
            <div className='calibration-wrapper'>
                <div className='header-container'>
                    <Header  onConfigurationChanged={configuration_changed} />
                </div>
                <div className='plot-wrapper'>
                    <div className='calibration-container'>
                        <ClassicCalibrationPlot chartdata={chartdata} onDiagramBrushed={reliability_diagram_brushed}></ClassicCalibrationPlot>
                    </div>
                    <div className='histograms-wrapper'>
                        <div className='histograms-wrapper-scrollable'>
                            {props.histdata.map( (histogram, index) => 
                                <div key={index} className='histogram-container'>
                                    <Featurehistogram histdata={histogram} onFeatureBrushed={feature_brushed} />
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className='footer-container'>
                    <div className='instance-view-wrapper'>
                        <Instanceview 
                            tableheader={tableHeader}
                            tablebody={tableBody}
                            classifications={classifications} />
                    </div>
                    <div className='confusion-matrix-wrapper'></div>
                </div>
            </div>
        </div>
    );
}

export default Calibration;
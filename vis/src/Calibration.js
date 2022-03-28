// react
import React, { useState } from 'react';

// styles
import './Calibration.css'

// components
import ClassicCalibrationPlot from './components/classiccalibration/Classiccalibration';
import Header from './components/header/Header';
import Featurehistogram from './components/histogram/Featureshistogram';
import Instanceview from './components/instanceview/Instanceview';
import ConfusionMatrix from './components/confusionmatrix/Confusionmatrix';


const Calibration = ( props ) => {   
    
    const [ filters, setFilters ] = useState( {
        'nbins': 10,
        'selectedclass': 0,
        'currentmodel': props.models[0],
        'predrange': [],
        'featurefilters': {}
    });

    const [ reliabilitycharts, setReliabilitycharts ] = useState( [] );
    const [ curveInstances, setCurveInstances ] = useState( {
        'tableheader': [],
        'tablebody': []
    });

    const [matrixdata, setMatrixdata ] = useState([]);

    // setting state
    // const [chartdata, setChartData] = useState( [] );

    // const [tableHeader, setTableHeader] = useState( [] );
    // const [tableBody, setTableBody] = useState( [] );
    // const [classifications, setClassifications] = useState( [] );
    // const [featureFilters, setFeatureFilters] = useState( {} );
    // const [learnedCurve, setLearnedCurve] = useState( { 'active': false, 'curvedata': null } );



    // const on_learned_curve_requested = () => {

    //     const learnedCurveData = ( data ) => {
    //         const newData = { 'active': !learnedCurve.active,  'curvedata': data.learnedcurve };
    //         setLearnedCurve(newData);
    //    };

    //    let comm_learned_curve = new CommAPI('get_learned_curve', learnedCurveData);

    //    // Send data
    //    comm_learned_curve.call({});


    // }

    // const reliability_diagram_brushed = (brushrange) => {

    //     // const mockheader = ['Age', 'Education-Num', 'Sex', 'Capital Gain', 'Capital Loss','Hours per week'];
    //     // const mockbody = 
    //     // [[ 3.000,  1.130,  1.000,  2.174,  0.000, 4.000],
    //     // [ 8.400,  1.130,  1.000,  0.000,  0.000, 2.220],
    //     // [4.000, 4.200,  1.000,  0.000,  0.000, 4.000],
    //     // [1.060, 1.200,  1.000,  0.000,  0.000, 4.000],
    //     // [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    //     // [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    //     // [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    //     // [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    //     // [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    //     // [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    //     // [7.800,  1.130,  0.000,  0.000,  0.000, 4.000],
    //     // [1.200,  1.520,  0.000,  0.000,  0.000, 4.000]];

    //     // const classifications = [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1];


    //     // setTableHeader( mockheader );
    //     // setTableBody( mockbody );
    //     // setClassifications( classifications );
        
        
    //     const instance_table = ( data ) => {
            
    //         setTableHeader( data.tableheader );
    //         setTableBody( data.tablebody );
    //         setClassifications( data.classifications );

            
    //    };
    //    let comm_instance_table = new CommAPI('filter_by_pred_range', instance_table);

    //    // Send data
    //    comm_instance_table.call({'params': { 'rangestart': brushrange.start, 'rangeend': brushrange.end  }  });

    // }

    // const feature_brushed = (featureconditions) =>   {

    //     const currentFilters = {
    //         ...featureFilters,
    //     }
    //     currentFilters[featureconditions['name']] = featureconditions;
    //     setFeatureFilters(currentFilters);

    //     const feature_filtered_instance_table = ( data ) => {
            
    //         setTableHeader( data.instancetable.tableheader );
    //         setTableBody( data.instancetable.tablebody );
    //         setClassifications( data.instancetable.classifications );

    //         // new reliability curve
    //         setChartData( data.reliabilitydiagram.chartdata );
    //    };

    //    let comm_feature_brushed = new CommAPI('filter_by_feature_range', feature_filtered_instance_table);

    //    // Send data
    //    comm_feature_brushed.call({'params': {'filters': currentFilters }});

    // }
 
    // const on_class_changed = (configuration) => {

    //     const reliability_diagram = ( data ) => {
    //         const newLines = [];
    //         for(let i = 0; i < chartdata.length; i++){
    //             newLines.push( chartdata[i] );
    //         }
    //         newLines.push( data.chartdata );
    //         setChartData( newLines );
    //     };
    //     let comm_configuration_changed = new CommAPI('get_reliability_diagram', reliability_diagram);

    //     // Send data
    //     comm_configuration_changed.call({'params': { nbins: parseInt(configuration.nbins), currentclass: parseInt(configuration.currentClass) }  });

    // }

    // const configuration_changed = (configuration) => {

    //     const reliability_diagram = ( data ) => {
    //         setChartData( [data.chartdata] );
    //     };
    //     let comm_configuration_changed = new CommAPI('get_reliability_diagram', reliability_diagram);

    //     // Send data
    //     comm_configuration_changed.call({'params': { nbins: parseInt(configuration.nbins), currentclass: parseInt(configuration.currentClass) }  });

    // }

    //********** CALIBRATION PLOT EVENTS **********/
    const on_mouse_out_curve = () => {

        console.log('MOUSE OUT');
        setCurveInstances( {
            'tableheader': [],
            'tablebody': []
        });

        setMatrixdata([]);

    };

    const on_mouse_enter_curve = () => {
        setMatrixdata([['#f1eef6','#bdc9e1'],['#74a9cf','#0570b0']]);
    };

    const on_curve_click = ( event ) => {

        // callback
        const curve_instance_data = ( data ) => {

            setCurveInstances( {
                'tableheader': data.tableheader,
                'tablebody': data.tablebody
            })

        };

        let comm_curve_instance_data_request = new CommAPI('get_curve_instance_data', curve_instance_data);
        comm_curve_instance_data_request.call(event);

    };

    //********** HEADER EVENTS **********/
    const clear_all = () => {

        // clearing curves
        setReliabilitycharts( [] );

        // clearing filters
        setFilters({
            'nbins': 10,
            'selectedclass': 0,
            'currentmodel': props.models[0],
            'predrange': [],
            'featurefilters': {}
        });
        

    };

    const on_curve_requested = () => {

        // callback
        const reliability_diagram = ( data ) => {

            const charts = [...reliabilitycharts];
            charts.push( data.reliabilitychart )
            setReliabilitycharts( charts );

            // clearing filters
            setFilters({
                'nbins': 10,
                'selectedclass': 0,
                'currentmodel': props.models[0],
                'predrange': [],
                'featurefilters': {}
            });

        };

        let comm_curve_request = new CommAPI('get_reliability_curve', reliability_diagram);
        comm_curve_request.call(filters);

    };


    const header_changed = ( headerConf ) => {

        const newFilters = {
            ...filters,
            ...headerConf
        };

        // setting new filters
        setFilters(newFilters);
    };


    //********** HISTOGRAMS EVENTS **********/
    const on_feature_brushed = ( histogramFilters ) => {

        // adding histogram filters
        const featurefilters = {
            ...filters.featurefilters,
        };
        featurefilters[histogramFilters.name] = histogramFilters;

        
        // setting new filters
        const newFilters = {
            ...filters,
            'featurefilters': featurefilters
        }; 
        
        // updating state
        setFilters(newFilters);
    };

    return (
        <div>
            <div className='calibration-wrapper'>

                <div className='header-container'>
                    <Header 
                        models={props.models}
                        nclasses={props.nclasses}
                        headerChanged={header_changed}
                        onCurveRequested={on_curve_requested}
                        onClearCliked={clear_all}  
                        // onClassChanged={on_class_changed} 
                        // onLearnedCurveRequested={on_learned_curve_requested} 
                        // onConfigurationChanged={configuration_changed} 
                    />
                </div>

                <div className='plot-wrapper'>
                    <div className='calibration-container'>
                        <ClassicCalibrationPlot 
                            chartdata={reliabilitycharts}
                            onCurveClick={on_curve_click}
                            onMouseEnterCurve={on_mouse_enter_curve}
                            onMouseOutCurve={on_mouse_out_curve}
                            // onMouseOutCurve={}
                            // onDiagramBrushed={reliability_diagram_brushed} 
                            // learnedCurve={learnedCurve} 
                        />
                    </div>
                    <div className='histograms-wrapper'>
                        <div className='histograms-wrapper-scrollable'>
                            {props.histdata.map( (histogram, index) => 
                                <div key={index} className='histogram-container'>
                                    <Featurehistogram 
                                        histdata={histogram} 
                                        appliedFilters={filters.featurefilters}
                                        onFeatureBrushed={on_feature_brushed}
                                        // onFeatureBrushed={feature_brushed} 
                                        // appliedFilters={featureFilters}
                                    />
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className='footer-container'>
                    <div className='instance-view-wrapper'>
                        <Instanceview 
                            tableheader={curveInstances.tableheader}
                            tablebody={curveInstances.tablebody}
                            // classifications={classifications} 
                        />
                    </div>
                    <div className='confusion-matrix-wrapper'>
                        <ConfusionMatrix matrixdata={matrixdata}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calibration;
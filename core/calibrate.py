from copyreg import constructor
from gc import callbacks
from notebookjs import execute_js
from helpers import calculate_histograms
from reliabilitycurve import ReliabilityCurve
# from callbacks import reliability_diagram, learned_reliability_diagram, filter_by_range, filter_by_feature_range
from callbacks import get_reliability_curve, learned_reliability_diagram



class Calibrate:

    def __init__(self, data) -> None:

        ## calculating histograms
        self.histograms = calculate_histograms( data )

        ## user-generated data
        self.data = data

        ## models
        self.predictions = {}
        self.labels = {}
        self.models = []
        
        ## number of classes
        self.nClasses = 0

        ## created curves
        self.createdCurves = []

        ## loading vis lib
        self.vislib = None
        with open ('../vis/dist/calibration.js', "r") as f:
            self.vislib = f.read()


    def add_model(self, predictions, labels, name):

        ## TODO: make sure all models have same number of classes

        ## appending model name
        self.models.append(name)

        ## appending model data
        self.labels[name] = labels
        self.predictions[name]  = predictions

        ## updating nclasses
        self.nClasses = predictions.shape[1]
        
    def calibrate(self):

        ## setting callbacks
        callbacks = {
            'get_reliability_curve': self.get_reliability_curve,
            'get_learned_curve': self.get_learned_curve,
            'get_curve_instance_data': self.get_curve_instance_data,
            'clear_curves': self.clear_curves
        }

        ## setting input data
        input_data = {
            'histograms': self.histograms,
            'models': self.models,
            'nclasses': self.nClasses
        }

        # Plotting the Radial Bar Chart
        execute_js(
            library_list=[self.vislib],
            main_function="calibration.renderCalibration", 
            data_dict=input_data,
            callbacks=callbacks )


    def get_reliability_curve( self, event ):

        ## current model
        modelPredictions = self.predictions[event['currentmodel']]
        modelLabels = self.labels[event['currentmodel']]
        
        ## getting curve
        currentcurvedata, instancedata, confusionmatrix, preds, labels = get_reliability_curve( event, data=self.data, preds=modelPredictions, labels=modelLabels )
        
        ## saving instance data
        curve = ReliabilityCurve( tableheader=instancedata['tableheader'], tablebody=instancedata['tablebody'], confusionMatrix=confusionmatrix, preds=preds, labels=labels )
        self.createdCurves.append(curve)

        ## getting curve
        return currentcurvedata

    def get_learned_curve( self, event ):

        selectedCurve = event['curveIndex']

        return {'test': selectedCurve}

    def get_curve_instance_data( self, event ):

        currentInstanceData = {
            'tableheader':  self.createdCurves[event['curveIndex']].tableheader,
            'tablebody': self.createdCurves[event['curveIndex']].tablebody,
            'confusionmatrix': self.createdCurves[event['curveIndex']].confusionMatrix,
        }

        return currentInstanceData


    def clear_curves(self, event):

        nCurves = len(self.createdCurves)
        self.createdCurves = []

        return {'ncurves':  nCurves}


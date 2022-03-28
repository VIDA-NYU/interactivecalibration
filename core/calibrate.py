from copyreg import constructor
from gc import callbacks
from notebookjs import execute_js
from helpers import calculate_histograms
from reliabilitycurve import ReliabilityCurve
# from callbacks import reliability_diagram, learned_reliability_diagram, filter_by_range, filter_by_feature_range
from callbacks import get_reliability_curve



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

        # callbacks = {
        #     'get_reliability_diagram': self.get_reliability_diagram,
        #     'filter_by_pred_range': self.filter_input_data_by_pred_range,
        #     'filter_by_feature_range': self.filter_input_data_by_feature_range,
        #     'get_learned_curve': self.get_learned_curve
        # }

        ## setting callbacks
        callbacks = {
            'get_reliability_curve': self.get_reliability_curve,
            'get_curve_instance_data': self.get_curve_instance_data
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
        currentcurvedata, instancedata = get_reliability_curve( event, data=self.data, preds=modelPredictions, labels=modelLabels )
        
        ## saving instance data
        curve = ReliabilityCurve( tableheader=instancedata['tableheader'], tablebody=instancedata['tablebody'])
        self.createdCurves.append(curve)

        ## getting curve
        return currentcurvedata


    def get_curve_instance_data( self, event ):

        currentInstanceData = {
            'tableheader':  self.createdCurves[0].tableheader,
            'tablebody': self.createdCurves[0].tablebody
        }

        return currentInstanceData


    # def get_reliability_diagram(self, event):
    #     return reliability_diagram( self.predictions, self.labels, event['params']['currentclass'], event['params']['nbins'] )

    # def filter_input_data_by_pred_range(self, event):
    #     return filter_by_range( self.predictions, self.data, self.labels, event['params']['rangestart'], event['params']['rangeend'] )

    # def filter_input_data_by_feature_range(self, event):
    #     return filter_by_feature_range( self.data, self.predictions, self.labels, event['params']['filters'] )

    # def get_learned_curve( self, event ):
    #     return learned_reliability_diagram( self.predictions, self.labels )


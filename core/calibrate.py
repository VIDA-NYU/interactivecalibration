from copyreg import constructor
from gc import callbacks
from notebookjs import execute_js
from callbacks import reliability_diagram, learned_reliability_diagram, calculate_histograms, filter_by_range


class Calibrate:

    def __init__(self, data, predictions, labels) -> None:

        ## calculating histograms
        self.histograms = calculate_histograms( data )

        ## user-generated data
        self.data = data
        self.predictions = predictions
        self.labels = labels

        ## loading vis lib
        self.vislib = None
        with open ('../vis/dist/calibration.js', "r") as f:
            self.vislib = f.read()

    def calibrate(self):

        callbacks = {
            'get_reliability_diagram': self.get_reliability_diagram,
            'filter_by_pred_range': self.filter_input_data_by_pred_range
        }

        # Plotting the Radial Bar Chart
        execute_js(library_list=[self.vislib], main_function="calibration.renderCalibration", data_dict={'histograms': self.histograms}, callbacks=callbacks )


    def get_reliability_diagram(self, event):
        return reliability_diagram( self.predictions, self.labels, event['params']['currentclass'], event['params']['nbins'] )


    def filter_input_data_by_pred_range(self, event):
        return filter_by_range( self.predictions, self.data, self.labels, event['params']['rangestart'], event['params']['rangeend'] )



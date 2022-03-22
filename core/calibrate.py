from copyreg import constructor
from notebookjs import execute_js
from callbacks import reliability_diagram, learned_reliability_diagram, calculate_histograms


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

        # Plotting the Radial Bar Chart
        execute_js(library_list=[self.vislib], main_function="calibration.renderCalibration", data_dict={'histograms': self.histograms}, callbacks={'get_reliability_diagram': self.get_reliability_diagram} )


    def get_reliability_diagram(self, data):
        return reliability_diagram( self.predictions, self.labels, data['params']['currentclass'], data['params']['nbins'] )



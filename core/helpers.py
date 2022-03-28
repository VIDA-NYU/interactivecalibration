import numpy as np

def calculate_histograms( data ):

    histograms = []
    for column in data.columns:
        
        currentHistogram = np.histogram(data[column].values, bins=20)
        histvalues = currentHistogram[0].tolist()
        histbounds = currentHistogram[1].tolist()
        currentFeature = { 'name': column, 'values': histvalues, 'bounds': histbounds }
        histograms.append(currentFeature)
        
    return histograms
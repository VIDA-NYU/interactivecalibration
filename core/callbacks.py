from sklearn.calibration import calibration_curve
from sklearn.metrics import confusion_matrix
from interpret.glassbox import ExplainableBoostingClassifier
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

def confusion( preds, labels ):
    
    y_pred = np.argmax(preds, axis=1)
    y_true = np.argmax(labels, axis=1)
    
    return confusion_matrix(y_true, y_pred)

def reliability_diagram( preds, labels, class_index=1, bins=10 ):
    
        '''
            n = number of samples
            k = number of classseex

            preds - n x k numpy array of predicted probabilities
            labels - n x k numpy array of one-hot encoded labels
            class_index - integer of what class to consider
            bins - integer for number of bins used to make curve
        '''

        acc, conf = calibration_curve(labels[:,class_index], preds[:,class_index], n_bins=bins, strategy="uniform")
        chartData = [ { 'x': conf[i], 'y': acc[i] }  for i in range(acc.shape[0])]
        return {'chartdata': chartData}


def learned_reliability_diagram(preds, labels, class_index=1, bins=100, random_state=0):

    '''
        n = number of samples
        k = number of classes

        preds - n x k numpy array of predicted probabilities
        labels - n x k numpy array of one-hot encoded labels
        class_index - integer of what class to consider
        bins - integer for number of bins in EBM model
        random_state - for reproducibility
    '''

    ebm = ExplainableBoostingClassifier(random_state=random_state, binning="uniform", max_bins=bins)
    ebm.fit(preds[:,class_index], labels[:,class_index])
    conf = np.linspace(0,1,num=100)
    acc = ebm.predict_proba(conf.reshape(-1,1))[:,1]
    return conf, acc

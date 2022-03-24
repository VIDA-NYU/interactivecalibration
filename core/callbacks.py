from sklearn.calibration import calibration_curve
from sklearn.metrics import confusion_matrix
from interpret.glassbox import ExplainableBoostingClassifier
import numpy as np
import pandas as pd


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


def filter_by_feature_range(data, preds, labels, filters, classindex=0):
    
    filteredPreds = pd.DataFrame()
    filteredLabels = pd.DataFrame()
    filteredData = pd.DataFrame()

    for key in filters:

        if(filteredData.shape[0] == 0):
            
            currentconds = ((data[filters[key]['name']] >= filters[key]['start']) & (data[filters[key]['name']] <= filters[key]['end']))
            
            filteredData = data[ currentconds ]
            filteredPreds = preds[:, classindex][ currentconds ] 
            filteredLabels = labels[:, classindex][ currentconds ]
            
        else:
            
            currentconds = (filteredData[filters[key]['name']] >= filters[key]['start']) &  (filteredData[filters[key]['name']] <= filters[key]['end'])
            
            filteredData = filteredData[ currentconds ]
            filteredPreds = filteredPreds[ currentconds ] 
            filteredLabels = filteredLabels[ currentconds ]
            
            
    return {
        'tableheader': filteredData.columns.tolist(),
        'tablebody': np.around(filteredData.values, decimals=2).tolist(),
        'classifications': filteredLabels.tolist()
    }

## filtering input data by prediction range
def filter_by_range( preds, data, labels, rangestart, rangeend, classindex=0 ):
    
    conds = ( (preds[:, classindex] >= rangestart) & (preds[:, classindex] <= rangeend) )
    filtereddataset = data[conds]
    classifications = labels[:,classindex][conds]
    
    return {
        'tableheader': filtereddataset.columns.tolist(), 
        'tablebody': np.around(filtereddataset.values, decimals=2).tolist(),
        'classifications':  classifications.tolist() }

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

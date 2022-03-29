from sklearn.calibration import calibration_curve
from sklearn.metrics import confusion_matrix
from interpret.glassbox import ExplainableBoostingClassifier
import numpy as np
import pandas as pd

def get_reliability_curve(filters, data, preds, labels):

    filteredPreds = preds
    filteredLabels = labels
    filteredData = data

    ## Filtering by features
    for key in filters['featurefilters']:

        ## setting boolean conditions
        currentconds = ( (filteredData[filters['featurefilters'][key]['name']] >= filters['featurefilters'][key]['start']) & (filteredData[filters['featurefilters'][key]['name']] <= filters['featurefilters'][key]['end']) )
        
        ## filtering dataframes
        filteredData = filteredData[ currentconds ]
        filteredPreds = filteredPreds[ currentconds ] 
        filteredLabels = filteredLabels[ currentconds ]


    ## confusion matrix
    confusionMatrix = confusion(filteredPreds, filteredLabels)

    ## filtering to current class index
    filteredPreds = filteredPreds[:, filters['selectedclass']]
    filteredLabels = filteredLabels[:, filters['selectedclass']]

    # new reliability curve
    chartData = reliability_diagram( preds=filteredPreds, labels=filteredLabels, bins=filters['nbins'] )

            
    return {'reliabilitychart': chartData }, {
            'tableheader': filteredData.columns.tolist(),
            'tablebody': np.around(filteredData.values, decimals=2).tolist(),
            # 'classifications': filteredLabels.tolist()
        }, confusionMatrix, filteredPreds, filteredLabels


def reliability_diagram( preds, labels, bins ):

    '''
        n = number of samples
        k = number of classseex

        preds - n x k numpy array of predicted probabilities
        labels - n x k numpy array of one-hot encoded labels
        class_index - integer of what class to consider
        bins - integer for number of bins used to make curve
    '''

    acc, conf = calibration_curve(labels, preds, n_bins=bins, strategy="uniform")
    chartData = [ { 'x': conf[i], 'y': acc[i] }  for i in range(acc.shape[0]) ]
    return chartData

def confusion( preds, labels ):
    
    y_pred = np.argmax(preds, axis=1)
    y_true = np.argmax(labels, axis=1)
    
    return confusion_matrix(y_true, y_pred)

def learned_reliability_diagram(preds, labels, bins=10, random_state=42):

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
    ebm.fit(preds.reshape(-1,1), labels.reshape(-1,1))
    conf = np.linspace(0,1,num=100)
    acc = ebm.predict_proba(conf.reshape(-1,1))[:,1]

    chartData = [ { 'x': conf[i], 'y': acc[i] }  for i in range(acc.shape[0])]
    return {'learnedcurve': chartData }


# def reliability_diagram( preds, labels, class_index=1, bins=10 ):

#     '''
#         n = number of samples
#         k = number of classseex

#         preds - n x k numpy array of predicted probabilities
#         labels - n x k numpy array of one-hot encoded labels
#         class_index - integer of what class to consider
#         bins - integer for number of bins used to make curve
#     '''

#     acc, conf = calibration_curve(labels[:,class_index], preds[:,class_index], n_bins=bins, strategy="uniform")
#     chartData = [ { 'x': conf[i], 'y': acc[i] }  for i in range(acc.shape[0])]


    # for key in filters:

    #     if(filteredData.shape[0] == 0):

    #         currentconds = ((data[filters[key]['name']] >= filters[key]['start']) & (data[filters[key]['name']] <= filters[key]['end']))
            
    #         filteredData = data[ currentconds ]
    #         filteredPreds = preds[:, classindex][ currentconds ] 
    #         filteredLabels = labels[:, classindex][ currentconds ]
            
    #     else:
            
    #         currentconds = (filteredData[filters[key]['name']] >= filters[key]['start']) &  (filteredData[filters[key]['name']] <= filters[key]['end'])
            
    #         filteredData = filteredData[ currentconds ]
    #         filteredPreds = filteredPreds[ currentconds ] 
    #         filteredLabels = filteredLabels[ currentconds ]
            

#     ## new reliability curve
#     chartData = reliability_diagram_from_features( filteredPreds, filteredLabels )
            
#     return {
#         'reliabilitydiagram': chartData ,
#         'instancetable': {
#             'tableheader': filteredData.columns.tolist(),
#             'tablebody': np.around(filteredData.values, decimals=2).tolist(),
#             'classifications': filteredLabels.tolist()
#         }
#     }

# def confusion( preds, labels ):
    
#     y_pred = np.argmax(preds, axis=1)
#     y_true = np.argmax(labels, axis=1)
    
#     return confusion_matrix(y_true, y_pred)


# def filter_by_feature_range(data, preds, labels, filters, classindex=0):
    
#     filteredPreds = pd.DataFrame()
#     filteredLabels = pd.DataFrame()
#     filteredData = pd.DataFrame()

#     for key in filters:

#         if(filteredData.shape[0] == 0):

#             # currentconds = ( (data['Age'] >= 1.093) & (data['Age'] <= 2.361))
#             currentconds = ((data[filters[key]['name']] >= filters[key]['start']) & (data[filters[key]['name']] <= filters[key]['end']))
            
#             filteredData = data[ currentconds ]
#             filteredPreds = preds[:, classindex][ currentconds ] 
#             filteredLabels = labels[:, classindex][ currentconds ]
            
#         else:
            
#             currentconds = (filteredData[filters[key]['name']] >= filters[key]['start']) &  (filteredData[filters[key]['name']] <= filters[key]['end'])
            
#             filteredData = filteredData[ currentconds ]
#             filteredPreds = filteredPreds[ currentconds ] 
#             filteredLabels = filteredLabels[ currentconds ]
            

#     ## new reliability curve
#     chartData = reliability_diagram_from_features( filteredPreds, filteredLabels )
            
#     return {
#         'reliabilitydiagram': chartData ,
#         'instancetable': {
#             'tableheader': filteredData.columns.tolist(),
#             'tablebody': np.around(filteredData.values, decimals=2).tolist(),
#             'classifications': filteredLabels.tolist()
#         }
#     }

# ## filtering input data by prediction range
# def filter_by_range( preds, data, labels, rangestart, rangeend, classindex=0 ):
    
#     conds = ( (preds[:, classindex] >= rangestart) & (preds[:, classindex] <= rangeend) )
#     filtereddataset = data[conds]
#     classifications = labels[:,classindex][conds]
    
#     return {
#         'tableheader': filtereddataset.columns.tolist(), 
#         'tablebody': np.around(filtereddataset.values, decimals=2).tolist(),
#         'classifications':  classifications.tolist() }


# def reliability_diagram_from_features( preds, labels, class_index=1, bins=10 ):
    
#         '''
#             n = number of samples
#             k = number of classseex

#             preds - n x k numpy array of predicted probabilities
#             labels - n x k numpy array of one-hot encoded labels
#             class_index - integer of what class to consider
#             bins - integer for number of bins used to make curve
#         '''

#         acc, conf = calibration_curve(labels[:], preds[:], n_bins=bins, strategy="uniform")
#         chartData = [ { 'x': conf[i], 'y': acc[i] }  for i in range(acc.shape[0])]
#         return {'chartdata': chartData}

# def reliability_diagram( preds, labels, class_index=1, bins=10 ):
    
#         '''
#             n = number of samples
#             k = number of classseex

#             preds - n x k numpy array of predicted probabilities
#             labels - n x k numpy array of one-hot encoded labels
#             class_index - integer of what class to consider
#             bins - integer for number of bins used to make curve
#         '''

#         acc, conf = calibration_curve(labels[:,class_index], preds[:,class_index], n_bins=bins, strategy="uniform")
#         chartData = [ { 'x': conf[i], 'y': acc[i] }  for i in range(acc.shape[0])]
#         return {'chartdata': chartData}


# def learned_reliability_diagram(preds, labels, class_index=1, bins=10, random_state=0):

#     '''
#         n = number of samples
#         k = number of classes

#         preds - n x k numpy array of predicted probabilities
#         labels - n x k numpy array of one-hot encoded labels
#         class_index - integer of what class to consider
#         bins - integer for number of bins in EBM model
#         random_state - for reproducibility
#     '''

#     ebm = ExplainableBoostingClassifier(random_state=random_state, binning="uniform", max_bins=bins)
#     ebm.fit(preds[:,class_index], labels[:,class_index])
#     conf = np.linspace(0,1,num=100)
#     acc = ebm.predict_proba(conf.reshape(-1,1))[:,1]

#     chartData = [ { 'x': conf[i], 'y': acc[i] }  for i in range(acc.shape[0])]
#     return {'learnedcurve': chartData }

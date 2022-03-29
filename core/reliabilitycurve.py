class ReliabilityCurve:

    def __init__(self, tableheader, tablebody, confusionMatrix, preds, labels ):

        self.tableheader = tableheader
        self.tablebody = tablebody

        ## saving confusion matrix
        self.confusionMatrix = confusionMatrix

        self.preds = preds
        self.labels = labels

        # self.nBins = 0
        # self.model = 0

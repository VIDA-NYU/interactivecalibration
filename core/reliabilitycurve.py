class ReliabilityCurve:

    def __init__(self, tableheader, tablebody, confusionMatrix ):

        self.tableheader = tableheader
        self.tablebody = tablebody

        ## saving confusion matrix
        self.confusionMatrix = confusionMatrix

        # self.nBins = 0
        # self.model = 0

function formatLedgerData(data) {

 	const uniqueTransactions = data.reduce((acc, curr) => {
 		if (acc.transactionIds[curr.activity_id]) return acc;

		return {
 			transactions: [...acc.transactions, curr],
 			transactionIds: {...acc.transactionIds, [curr.activity_id]: true}
 		};

	}, {transactions: [], transactionIds: {}}).transactions;


 	return uniqueTransactions.sort((a, b) => (
 		new Date(a.date) - new Date(b.date)
 	));

}

module.exports = {formatLedgerData};
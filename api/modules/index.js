function getUniqueTransactions(transactions) {
	return transactions.reduce((acc, curr) => {
		if (acc.transactionIds[curr.activity_id]) return acc;

		return {
			transactions: [...acc.transactions, curr],
			transactionIds: {...acc.transactionIds, [curr.activity_id]: true}
		};

	}, {transactions: [], transactionIds: {}}).transactions;
}

function formatLedgerData(data) {
	const transactions = getUniqueTransactions(data).sort((a, b) => (
		new Date(b.date) - new Date(a.date)
	));

	const balance = transactions[0].balance;


	return {transactions, balance};

}

module.exports = {formatLedgerData};

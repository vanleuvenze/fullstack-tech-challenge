function formatTransaction(transaction) {
	const {destination, source, method, ...rest} = transaction;
	const description = {source: source.description, destination: destination.description, method: method};

	return {...rest, description};
}

function getUniqueTransactions(transactions) {
	return transactions.reduce((acc, curr) => {
		if (acc.transactionIds[curr.activity_id]) return acc;

		const transaction = formatTransaction(curr);

		return {
			transactions: [...acc.transactions, transaction],
			transactionIds: {...acc.transactionIds, [curr.activity_id]: true}
		};

	}, {transactions: [], transactionIds: {}}).transactions;
}

function formatLedgerData(data) {
	const transactions = getUniqueTransactions(data).sort((a, b) => (
		new Date(b.date) - new Date(a.date)
	));

	return {transactions, balance: transactions[0].balance};
}

module.exports = {formatLedgerData};

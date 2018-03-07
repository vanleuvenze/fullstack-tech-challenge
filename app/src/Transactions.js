import React from 'react';
import {capitalize} from './helpers';
import styles from './styles/transactions.css';

function getDisplayValue(column, transaction) {
	const key = displayAliasMap[column] || column;
	const value = displayFormatters[key] ? displayFormatters[key](transaction) : transaction[key];

	return value;
}

function getAmountOperand(amount) {
	return Math.sign(amount) > 0
		? '+'
		: Math.sign(amount) < 0
		? '-'
		: '';
}

const transactionColumns = [
	'date',
	'transaction',
	'amount',
	'balance'
];

const displayAliasMap = {
	'transaction': 'type'
};

const displayFormatters = {
	amount: transaction => {
		const operand = getAmountOperand(transaction.amount);
		const cleanAmount = Math.abs(transaction.amount);
		// TODO const className = operand -- add classname here based on operand

		return <span className>{`${operand} $${cleanAmount}`}</span>
	},
	balance: transaction => `$${transaction.balance}`,
	date: transaction => {
		const dateTime = new Date(transaction.date).toLocaleString().split(',');
		return (
			<div>
				<div className={styles.date}>{dateTime[0]}</div>
				<div className={styles.time}>{dateTime[1]}</div>
			</div>
		)
	}
};

const Header = () => (
	<thead>
		<tr>
			{transactionColumns.map((column, i) => <th key={i}>{capitalize(column)}</th>)}
		</tr>
	</thead>
);

const Body = ({transactions}) => (
	<tbody>
		{transactions.map((transaction, i) => (
			<tr key={i}>
				{transactionColumns.map((column, i) => (
					<td key={i}>{getDisplayValue(column, transaction)}</td>
				))}
			</tr>
		))}
	</tbody>
);

const Transactions = props => (
	<table className={styles.table}>
		<Header/>
		<Body {...props}/>
	</table>
);

export default Transactions;

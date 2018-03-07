import React from 'react';
import {capitalize} from '../../helpers';
import formatters from './formatters';
import styles from '../../styles/transactions.css';


const transactionColumns = [
	'date',
	'transaction',
	'description',
	'amount',
	'balance'
];

const displayAliasMap = {
	'transaction': 'type',
	'description': ''
};

function getDisplayValue(column, transaction) {
	const key = displayAliasMap[column] || column;
	const value = formatters[key] ? formatters[key](transaction[key]) : transaction[key];

	return value;
}

const Header = () => (
	<thead>
		<tr>
			{transactionColumns.map((column, i) => (
				<th key={i}>{capitalize(displayAliasMap.hasOwnProperty(column) ? displayAliasMap[column] : column)}</th>
			))}
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

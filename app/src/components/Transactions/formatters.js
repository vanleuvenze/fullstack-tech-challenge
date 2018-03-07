import React from 'react';
import {monetize, capitalize} from '../../helpers';
import styles from '../../styles/transactions.css';

function getOperandDisplayAttributes(amount) {
	return Math.sign(amount) > 0
		? {operand: '+', className: styles.positive}
		: Math.sign(amount) < 0
		? {operand: '-', className: styles.negative}
		: {operand: '', className: ''};
}

const displayFormatters = {
	amount: amount => {
		const {operand, className} = getOperandDisplayAttributes(amount);
		const cleanAmount = Math.abs(amount);

		return (<span className={className}>{`${operand} ${monetize(cleanAmount)}`}</span>);
	},
	balance: balance => `$${balance}`,
	date: date => {
		const dateTime = new Date(date).toLocaleString().split(',');
		return (
			<div>
				<div className={styles.date}>{dateTime[0]}</div>
				<div className={styles.time}>{dateTime[1]}</div>
			</div>
		);
	},
	description: description => (
		<div>
			{description.source && <span className={styles.descriptionText}>{description.source}</span>}
			{description.source && String.fromCharCode(183)}
			{description.destination && <span className={styles.descriptionText}>{description.destination}</span>}
			{description.method && <div className={styles.descriptionMethod}>{description.method}</div>}
		</div>
	),
	type: type => <span className={styles.type}>{capitalize(type)}</span>
};

export default displayFormatters;

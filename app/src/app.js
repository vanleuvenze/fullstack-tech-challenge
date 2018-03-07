import React, {Component} from 'react';

import {getLedger} from '../requests';
import {monetize} from './helpers';

import Transactions from './components/Transactions';
import styles from './styles/ledger.css';


const emptyTransactionData = {transactions: [], balance: null};

const apiLedgerNames = {
	simple: 'simple-ledger',
	duplicate: 'duplicate-ledger',
	complicated: 'complicated-ledger'
};


class Ledger extends Component {
	constructor(props) {
		super(props);

		this.state = {
			simple: emptyTransactionData,
			complicated: emptyTransactionData,
			duplicate: emptyTransactionData,
			display: 'simple',
			loading: false
		};

		this.getLedgerData = this.getLedgerData.bind(this);
		this.updateLedgerData = this.updateLedgerData.bind(this);
	}

	componentDidMount() {
		this.updateLedgerData('simple');
	}

	componentWillUpdate(nextProps, nextState) {
		const changingDisplay = nextState.display !== this.state.display;

		if (changingDisplay && !this.state[nextState.display].length) {
			this.updateLedgerData(nextState.display);
		}
	}

	getLedgerData(ledgerName) {
		return getLedger(apiLedgerNames[ledgerName])
			.then(transactions => (
				this.setState({loading: false, [ledgerName]: transactions})
			))
			.catch(err => console.log(`error fetching data for ${ledgerName}`, err));
	}

	updateLedgerData(ledgerName) {
		this.setState({loading: true}, () => this.getLedgerData(ledgerName));
	}

	render() {
		const {transactions, balance} = this.state[this.state.display];

		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Investing Account Transactions</h1>
					<div>
						{['simple', 'complicated', 'duplicate'].map((variation, i) => (
							<span
								key={i}
								className={styles.ledgerTabs}
								onClick={() => this.setState({display: variation})}>
								{variation}
								{i < 2 && <span className={styles.ledgerTabSeparation}>{String.fromCharCode(183)}</span>}
							</span>
						))}
					</div>
				</div>
				<div className={styles.balance}>
					<span>{monetize(balance)}</span>
					<div className={styles.balanceText}>balance</div>
				</div>
				<div className={styles.transactionContainer}>
					{this.state.loading ? <div>loading...</div> : <Transactions transactions={transactions}/>}
				</div>
			</div>
		);
	}
}

export default Ledger;

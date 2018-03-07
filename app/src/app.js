import React, {Component} from 'react';
import {getLedger} from '../requests';
import Transactions from './Transactions';

import styles from './styles/ledger.css';

const apiLedgerNames = {
	simple: 'simple-ledger',
	duplicate: 'duplicate-ledger',
	complicated: 'complicated-ledger'
};

class Ledger extends Component {
	constructor(props) {
		super(props);

		this.state = {
			simple: [],
			complicated: [],
			duplicate: [],
			display: 'simple',
			balance: null,
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
			.then(({transactions, balance}) => (
				this.setState({loading: false, [ledgerName]: transactions, balance})
			))
			.catch(err => console.log(`error fetching data for ${ledgerName}`, err))
	}

	updateLedgerData(ledgerName) {
		this.setState({loading: true}, () => this.getLedgerData(ledgerName));
	}

	render() {
		const transactions = this.state[this.state.display];
		console.log('transactions', transactions);

		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Investing Account</h1>
					<div>
						{['simple', 'complicated', 'duplicate'].map((variation, i) => (
							<span key={i} className={styles.ledgerVariations} onClick={() => this.setState({display: variation})}>
								{variation}
							</span>
						))}
					</div>
				</div>

			<div className={styles.balance}>{this.state.balance}</div>

			<div className={styles.transactionContainer}>
				<h3>Past Transactions</h3>
				{this.state.loading
					? <div>loading...</div>
					: <Transactions transactions={transactions}/>
				}
			</div>

			</div>
		);
	}
}

export default Ledger;

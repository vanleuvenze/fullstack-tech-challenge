import React, {Component} from 'react';
import {getLedger} from '../requests';

class Ledger extends Component {
	constructor(props) {
		super(props);

		this.state = {
			simple: [],
			complicated: [],
			duplicate: []
		};
	}

	componentWillMount() {
		getLedger()
			.then(json => this.setState({simple: json}));

		getLedger('complicated-ledger')
			.then(json => this.setState({complicated: json}));

		getLedger('duplicate-ledger')
			.then(json => this.setState({duplicate: json}));
	}

	render() {
		return (
			<div>
				<ul>
					{this.state.simple.map((transaction, i) => <li key={i}>{new Date(transaction.activity_id).toLocaleString()}</li>)}
				</ul>
				<ul>
					{this.state.complicated.map((transaction, i) => <li key={i}>{new Date(transaction.activity_id).toLocaleString()}</li>)}
				</ul>
				<ul>
					{this.state.duplicate.map((transaction, i) => <li key={i}>{new Date(transaction.activity_id).toLocaleString()}</li>)}
				</ul>
			</div>
		);
	}
}

export default Ledger;

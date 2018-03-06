import path from 'path';


export function getLedger(ledgerName='simple-ledger') {
	return fetch(`http://localhost:3000/ledger/${ledgerName}`)
		.then(res => res.json())
		.catch(err => console.log('error fetching!', err))
}

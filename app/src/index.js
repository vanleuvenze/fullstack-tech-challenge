import React from 'react';
import {render} from 'react-dom';

import Ledger from './app';

const root = document.createElement('div');
document.body.appendChild(root);

render(<Ledger/>, root);

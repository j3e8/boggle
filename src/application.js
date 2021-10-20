import React from 'react';
import ReactDOM from 'react-dom';

import BoggleApp from './BoggleApp';

window.addEventListener('load', () => {
  ReactDOM.render(<BoggleApp/>, window.document.getElementById('react-container'));
});

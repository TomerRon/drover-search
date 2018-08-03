import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route } from 'react-router-dom';
import { history } from './history';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchPage from './containers/SearchPage';

const App = () => (
    <Router history={history}>
        <div className="container py-3">
            <Route path='/:values?' component={SearchPage}/>
        </div>
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

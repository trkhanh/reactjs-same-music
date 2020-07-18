import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import LibraryContainer from './Library/containers/LibraryContainer'

const Application = () => (
  <Router>
    <div>
      <Route exact path="/" component={LibraryContainer} />
      <Route path="/songs" component={LibraryContainer} />
      <Route path="/artists" component={LibraryContainer} />
      <Route path="/playlists" component={LibraryContainer} />
    </div>
  </Router>
)

ReactDOM.render(
  Application(),
  document.getElementById('app')
);

module.hot.accept();
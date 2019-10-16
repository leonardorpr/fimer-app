import React from 'react';

import { useSelector } from 'react-redux';

import createRouter from 'routes';

const App = () => {
  const authenticated = useSelector(state => state.auth.token);

  const Routes = createRouter(!!authenticated);

  return <Routes />;
};

export default App;

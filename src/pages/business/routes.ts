import React from 'react';
const BusinessCoopera = React.lazy(() => import('./views/BusinessCoopera'));
const BusinessInfo = React.lazy(() => import('./views/BusinessInfo'));
const BusinessManager = React.lazy(() => import('./views/BusinessManager'));
const BusinessSupport = React.lazy(() => import('./views/BusinessSupport'));

const routes = [
  { path: '/', index: true, name: 'BusinessCoopera', component: BusinessCoopera },
  { path: '/business-coopera', index: true, name: 'BusinessCoopera', component: BusinessCoopera },
  { path: '/business-info', index: true, name: 'BusinessInfo', component: BusinessInfo },
  { path: '/business-manager', index: true, name: 'BusinessManager', component: BusinessManager },
  { path: '/business-support', index: true, name: 'BusinessSupport', component: BusinessSupport },
];

export default routes;

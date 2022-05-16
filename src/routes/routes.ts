// import { KEY } from 'store/common/constants';
import React from 'react';
// import PermissionData from './middleware/PermissionData'
const Dashboard = React.lazy(() => import('pages/dashboard/views/Dashboard'));
const Business = React.lazy(() => import('pages/business/business'));

const routes = [
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/business/*', exact: true, name: 'Business', component: Business },
];

export default routes;

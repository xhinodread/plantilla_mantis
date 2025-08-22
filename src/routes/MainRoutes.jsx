import { lazy } from 'react';

// project imports
import ProtectedRoute from 'components/ProtectedRoute';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
//import Home1 from 'layout/Home1';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// const Home1 = Loadable(lazy(() => import('pages/component-overview/color')));
const Home1 = Loadable(lazy(() => import('pages/page1/home1')));
const DocumentosEmitidos = Loadable(lazy(() => import('pages/page1/DocumentosEmitidos')));


// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const Page2 = Loadable(lazy(() => import('pages/extra-pages/page2')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  //  element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      // element: <ProtectedRoute><DashboardDefault /></ProtectedRoute>
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <ProtectedRoute><DashboardDefault /></ProtectedRoute>
        },
        {
          path: 'page1',
          element: <ProtectedRoute> <Home1 /></ProtectedRoute>
        },
         {
          path: 'docs_emitidos',
          // element: <ProtectedRoute> <DocumentosEmitidos /></ProtectedRoute>
          element:  <DocumentosEmitidos />
        }
      ]
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'page2',
      element: <Page2 />
    },
    
  ]
};

export default MainRoutes;

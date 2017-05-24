import Active from './containers/Active';
import Detail from './containers/Detail';
import History from './containers/History';
import Main from './containers/Main';
import Settings from './containers/Settings';
import RxRefillsApp from './containers/RxRefillsApp';
import GlossaryPage from './components/GlossaryPage';


const routes = {
  path: '/',
  component: RxRefillsApp,
  childRoutes: [
    {
      component: Main,
      indexRoute: { component: Active },
      childRoutes: [
        { path: 'history', component: History },
      ]
    },
    { path: 'glossary', component: GlossaryPage },
    { path: 'settings', component: Settings },
    { path: ':id', component: Detail }
  ]
};

export default routes;

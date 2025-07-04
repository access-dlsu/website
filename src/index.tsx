/* @refresh reload */
import { render } from 'solid-js/web';
import { lazy } from "solid-js";
import { Router, Route } from "@solidjs/router";

import './index.css';
import App from './App';

const Teaser = lazy(() => import('./pages/Teaser'))
const Home = lazy(() => import('./pages/Home'))
const MembersHub = lazy(() => import('./pages/members-hub'))
const DPBlast = lazy(() => import('./pages/members-hub/dp-blast'))
const TinyURL = lazy(() => import('./pages/members-hub/tinyurl'))

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (
  <Router root={App}>
    <Route path="/teaser" component={Teaser} />
    <Route path="/" component={Home} />
    <Route path="/members-hub" component={MembersHub} />
    <Route path="/members-hub/dp-blast" component={DPBlast} />
    <Route path="/members-hub/tinyurl" component={TinyURL} />
    <Route path="/link/:path" component={TinyURL} />
    <Route path="*" component={lazy(() => import('./pages/404'))} />
  </Router>
), root!);

import React from 'react';
import Loadable from 'react-loadable';
import {loading} from '../functions/functions'

// Pages
const DefaultLayout = Loadable({
    loader: () => import('../views/DefualtLayout/DefualtLayout'),
    loading
});

const QuestanirePage = Loadable({
    loader: () => import('../views/QuestanirePage/QuestanirePage'),
    loading
});

const Summary = Loadable({
    loader: () => import('../views/summary/Summary'),
    loading
});

const Page404 = Loadable({
    loader: () => import('../views/Page404/Page404'),
    loading
});

const Page500 = Loadable({
    loader: () => import('../views/Page500/Page500'),
    loading
});

const routes = [
    { path: '/', name: 'Home', component: DefaultLayout, exact: true },
    { path: '/questanire', name: 'QuestanirePage', component: QuestanirePage, exact: true },
    { path: '/summary', name: 'Summary', component: Summary, exact: true },
    { path: '/404', name: 'Page 404', component: Page404, },
    { path: '/500', name: 'Page 500', component: Page500, },
]

export default routes;
import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage';
import WizardryPage from '../components/WizardryPage';
import SimpleSearchPage from '../components/SimpleSearchPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';



const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Header />
                <Switch>
                    <Route path='/' component={HomePage} exact={true}/>
                    <Route path='/css-wizardry' component={WizardryPage} exact={true}/>
                    <Route path='/simple-search' component={SimpleSearchPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
        </Fragment>
    </BrowserRouter>
);

export default AppRouter;
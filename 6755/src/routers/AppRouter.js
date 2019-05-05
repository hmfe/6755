import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import WizardryPage from '../components/WizardryPage';
import SimpleSearchPage from '../components/SimpleSearchPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';



const AppRouter = () => (
    <BrowserRouter>
            <Header />
                <Switch>
                    <Route path='/' component={SimpleSearchPage} exact={true}/>
                    <Route path='/css-wizardry' component={WizardryPage} exact={true}/>
                    <Route component={NotFoundPage}/>
                </Switch>
    </BrowserRouter>
);

export default AppRouter;
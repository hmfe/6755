import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Nav from '../components/Nav';
import SimpleSearch from '../components/SimpleSearch';
import WizardryButton from '../components/WizardryButton';

const AppRouter = () => (
    <BrowserRouter>
            <Header />
            <Nav />
                <Switch>
                    <Route path='/' component={SimpleSearch} exact={true}/>
                    <Route path='/css-wizardry' component={WizardryButton} exact={true}/>
                </Switch>
    </BrowserRouter>
);

export default AppRouter;
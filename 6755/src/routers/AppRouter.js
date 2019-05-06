import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import WizardryButton from '../components/WizardryButton';
import SimpleSearchComponent from '../components/SimpleSearchComponent';
import Header from '../components/Header';



const AppRouter = () => (
    <BrowserRouter>
            <Header />
                <Switch>
                    <Route path='/' component={SimpleSearchComponent} exact={true}/>
                    <Route path='/css-wizardry' component={WizardryButton} exact={true}/>
                </Switch>
    </BrowserRouter>
);

export default AppRouter;
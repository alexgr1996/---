import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Questions } from './components/Questions';
import { Assesments } from './components/Assesments';
import { AssesmentQuestions } from './components/AssesmentQuestions';

import './App.css'
import { Categories } from './components/Categories';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/Categories' component={Categories} />
                <Route path='/Questions' component={Questions} />
                <Route path='/Assesments' component={Assesments} />
                <Route path='/AssesmentQuestions' component={AssesmentQuestions} />
            </Layout>
        );
    }
}

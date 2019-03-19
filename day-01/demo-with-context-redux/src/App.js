import React, {Component} from 'react';

import './utils/ArrayExtensions'
import MainPage from "./pages/main";
import LanguageChanger from "./shared/LanguageChanger";
import I18nContext from './context/I18nContext';

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

class App extends Component {
    state = {
        language: 'en-US'
    };

    render() {
        return (
            <I18nContext.Provider value={this.props.i18n}>
                <div className="container">
                    <LanguageChanger language={this.state.language} onChange={lang => this.handleLanguageChange(lang)}/>
                    <h1>{this.props.i18n.t('Title')}</h1>
                    <MainPage i18n={this.props.i18n}/>
                </div>
            </I18nContext.Provider>
        );
    }

    componentDidMount() {
        this.setState({
            language: this.props.i18n.language
        })
    }

    handleLanguageChange(lang) {
        this.props.i18n.changeLanguage(lang, () => {
            this.setState({
                language: lang
            });
        });
    }
}

export default App;

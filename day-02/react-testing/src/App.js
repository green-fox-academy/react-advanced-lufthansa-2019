import React, {Component} from 'react';

import './utils/ArrayExtensions'
import MainPage from "./pages/main";
import LanguageChanger from "./shared/LanguageChanger";
import I18nContext from './context/I18nContext';

import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

class App extends Component {
    state = {
        locale: {
            language: 'en-US',
            i18n: {
                t: () => {
                }
            }
        }
    };

    render() {
        return (
            <I18nContext.Provider value={this.state.locale}>
                <div className="container">
                    <LanguageChanger language={this.state.locale.language} onChange={lang => this.handleLanguageChange(lang)}/>
                    <h1>{this.props.i18n.t('Title')}</h1>
                    <MainPage/>
                </div>
            </I18nContext.Provider>
        );
    }

    componentDidMount() {
        this.setState({
            locale: {
                language: this.props.i18n.language,
                i18n: this.props.i18n
            }
        })
    }

    handleLanguageChange(lang) {
        this.props.i18n.changeLanguage(lang, () => {
            this.setState({
                locale: {
                    language: lang,
                    i18n: this.props.i18n
                }
            });
        });
    }
}

export default App;

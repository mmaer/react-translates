/* eslint-disable react/forbid-prop-types */
import { Component } from 'react';

import PropTypes from 'prop-types';

import TranslationsStore from './TranslationsStore';

class TranslationsProvider extends Component {
    static propTypes = {
        translations: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
    };

    static childContextTypes = {
        translationsStore: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        const { translations } = props;
        this.translationsStore = new TranslationsStore(translations);
    }

    getChildContext() {
        return {
            translationsStore: this.translationsStore,
        };
    }

    componentWillReceiveProps({ translations }) {
        this.translationsStore.setTranslations(translations);
    }

    render() {
        const { children } = this.props;
        return children;
    }
}

export default TranslationsProvider;
/* eslint-enable react/forbid-prop-types */

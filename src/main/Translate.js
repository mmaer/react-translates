import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    map,
    omit,
    keys,
    get,
} from 'lodash';

import { replaceVariables } from './utils';

import { TranslationsContext } from './Contexts';

class Translate extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        className: PropTypes.string,
        style: PropTypes.objectOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ])),
        count: PropTypes.number,
    };

    static defaultProps = {
        className: null,
        style: null,
        count: null,
    };

    getTranslateVariables = props => omit(props, keys(Translate.propTypes));

    getTranslationValue = (translations, key, count) => {
        if (count !== null) {
            if (get(translations, `${key}_${count}`)) {
                return get(translations, `${key}_${count}`);
            }
            if (count !== 1 && get(translations, `${key}_plural`)) {
                return get(translations, `${key}_plural`);
            }
        }
        return get(translations, key);
    };

    translateValue = (translations, value, count) => {
        const translationValue = this.getTranslationValue(translations, value, count);
        return translationValue !== undefined && translationValue !== null
            ? replaceVariables(translationValue, this.getTranslateVariables(this.props))
            : [<span style={{ color: 'red' }}>{value}</span>];
    };

    render() {
        const {
            className,
            style,
            value,
            count,
        } = this.props;

        return (
            <span className={className} style={style}>
                <TranslationsContext.Consumer>
                    {translations => (
                        <span>
                            {map(this.translateValue(translations, value, count), (elem, index) => (
                                <span key={index}>
                                    {elem}
                                </span>
                            ))}
                        </span>
                    )}
                </TranslationsContext.Consumer>
            </span>
        );
    }
}

export default Translate;

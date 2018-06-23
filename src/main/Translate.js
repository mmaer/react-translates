import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    map,
    remove,
    omit,
    keys,
    last,
} from 'lodash';

const translationObject = (isVariable = false) => ({
    isVariable,
    value: '',
});

export const replaceVariables = (translation, replaces = {}) => {
    const translationArray = [translationObject()];

    let index = 0;
    while (index < translation.length) {
        const char = translation[index];
        if (char === '\\') {
            const nextChar = translation[index + 1];
            last(translationArray).value += nextChar;
            index += 2;
        } else if (char === '{') {
            translationArray.push(translationObject(true));
            index += 1;
        } else if (char === '}') {
            translationArray.push(translationObject());
            index += 1;
        } else {
            last(translationArray).value += char;
            index += 1;
        }
    }

    remove(translationArray, elem => elem.value === '');
    return map(translationArray, ({ isVariable, value }) => {
        const hasVariable = isVariable && (replaces[value] !== null && replaces[value] !== undefined);
        return hasVariable ? replaces[value] : value;
    });
};

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

    static contextTypes = {
        translationsStore: PropTypes.shape.isRequired,
    };

    static defaultProps = {
        className: null,
        style: null,
        count: null,
    };

    componentDidMount() {
        const { translationsStore } = this.context;
        translationsStore.subscribe(this.onTranslationsChanged);
    }

    componentWillUnmount() {
        const { translationsStore } = this.context;
        translationsStore.unsubscribe(this.onTranslationsChanged);
    }

    onTranslationsChanged = () => this.forceUpdate();

    getTranslateVariables = props => omit(props, keys(Translate.propTypes));

    render() {
        const { translationsStore } = this.context;
        const {
            className,
            style,
            value,
            count,
        } = this.props;
        const translationValue = translationsStore.getTranslationValue(value, count);
        let translation;
        if (translationValue !== undefined && translationValue !== null) {
            translation = replaceVariables(translationValue, this.getTranslateVariables(this.props));
        } else {
            translation = [
                <span style={{ color: 'red' }}>
                    {value}
                </span>,
            ];
        }
        return (
            <span className={className} style={style}>
                {map(translation, (elem, index) => (
                    <span key={index}>
                        {elem}
                    </span>
                ))}
            </span>
        );
    }
}

export default Translate;

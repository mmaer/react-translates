import {
    map,
    remove,
    last,
} from 'lodash';

const translationObject = (isVariable = false) => ({
    isVariable,
    value: '',
});

// eslint-disable-next-line import/prefer-default-export
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

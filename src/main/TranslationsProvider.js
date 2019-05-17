/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import { TranslationsContext } from './Contexts';

const TranslationsProvider = ({ children, translations }) => (
    <TranslationsContext.Provider value={translations}>
        {children}
    </TranslationsContext.Provider>
);

TranslationsProvider.propTypes = {
    translations: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
};

export default TranslationsProvider;
/* eslint-enable react/forbid-prop-types */

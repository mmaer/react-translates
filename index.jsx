import React from 'react';
import ReactDOM from 'react-dom';

import Translate, { TranslationsProvider } from './src/main';

import translations from './src/sample-translations';

const Component = () => (
    <div>
        <Translate value="en-gb.hello-world" />
        <br />
        <Translate value="en-gb.hello-world" count={3} />
        <br />
        <Translate value="en-gb.hello-world" count={2} />
        <br />
        <Translate value="en-gb.hello-world" count={1} />
        <br />
        <Translate value="en-gb.hello-world" count={1} />
        <br />
        <Translate value="en-gb.variable" variable="Variable" />
        <br />
        <Translate value="en-gb.multiple-variable" variable1="Variable1" variable2="Variable2" />
    </div>
);

const App = () => (
    <TranslationsProvider translations={translations}>
        <Component />
    </TranslationsProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));

import React, { PureComponent } from 'react';
import { mount } from 'enzyme';

import { expect, it } from '../common/test-base';

import Translate from '../../main/Translate';
import TranslationsProvider from '../../main/TranslationsProvider';

// eslint-disable-next-line react/prefer-stateless-function
class NotUpdatingComponent extends PureComponent {
    render() {
        return <Translate value="hello-world" />;
    }
}

describe('Module', () => {
    // eslint-disable-next-line max-len
    it(
        `should re-render content when translations change 
        but the intermediate component has shouldComponentUpdate implemented`,
        () => {
            const initialTranslations = {
                'hello-world': 'Hello World',
            };
            const wrapper = mount((
                <TranslationsProvider translations={initialTranslations}>
                    <NotUpdatingComponent />
                </TranslationsProvider>
            ));
            expect(wrapper.text()).to.equal('Hello World');
            const newTranslations = {
                'hello-world': 'New Hello World',
            };
            wrapper.setProps({ translations: newTranslations });
            expect(wrapper.text()).to.equal('New Hello World');
        },
    );
});

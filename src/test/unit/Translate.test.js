import React from 'react';
import { mount } from 'enzyme';

import { expect, it } from '../common/test-base';

import Translate, { TranslationsProvider } from '../../main';
import { replaceVariables } from '../../main/Translate';

import translations from '../../sample-translations';

const wrapWithTranslationsProvider = component => (
    <TranslationsProvider translations={translations}>
        {component}
    </TranslationsProvider>
);

describe('<Translate />', () => {
    it('test Hello World translate', () => {
        const wrapper = mount(wrapWithTranslationsProvider(<Translate value="en-gb.hello-world" />));
        expect(wrapper.text()).to.equal('Hello World');
    });
    it('Test Translate variables', () => {
        const wrapper = mount(wrapWithTranslationsProvider(<Translate
            value="en-gb.multiple-variable"
            variable1="Variable 1"
            variable2="Variable 2"
        />));
        expect(wrapper.text()).to.equal('First variable: Variable 1, second variable: Variable 2');
    });
    it('Test Translate variable when is equal 0', () => {
        const wrapper = mount(wrapWithTranslationsProvider(<Translate value="en-gb.variable" variable={0} />));
        expect(wrapper.text()).to.equal('Variable: 0');
    });
    it('Test Translate variable when is equal null', () => {
        const wrapper = mount(wrapWithTranslationsProvider(<Translate value="en-gb.variable" variable={null} />));
        expect(wrapper.text()).to.equal('Variable: variable');
    });
    it('Test Translate variable when is equal undefined', () => {
        const wrapper = mount(wrapWithTranslationsProvider(<Translate value="en-gb.variable" variable={undefined} />));
        expect(wrapper.text()).to.equal('Variable: variable');
    });
    it('Test Translate for not existing translate', () => {
        const wrapper = mount(wrapWithTranslationsProvider(<Translate value="test.test" />));
        expect(wrapper.text()).to.equal('test.test');
    });
    it('Test Translate count prop when translation exist', () => {
        const wrapper = mount(wrapWithTranslationsProvider(<Translate value="en-gb.hello-world" count={2} />));
        expect(wrapper.text()).to.equal('Hello two Worlds');
    });
    it('Test Translate count prop when translation not exist and count is greater than 1', () => {
        const wrapper = mount(wrapWithTranslationsProvider(<Translate value="en-gb.hello-world" count={3} />));
        expect(wrapper.text()).to.equal('Hello Worlds');
    });
    it('Test Translate plural when count is equal 1', () => {
        const wrapper = mount(wrapWithTranslationsProvider(<Translate value="en-gb.hello-world" count={1} />));
        expect(wrapper.text()).to.equal('Hello World');
    });
});

describe('replaceVariables', () => {
    it('should return array with string', () => {
        expect(replaceVariables('test')).to.eql(['test']);
    });
    it('should return array with test and variable name', () => {
        expect(replaceVariables('test {variable}')).to.eql(['test ', 'variable']);
    });
    it('should return array with test and replaced variable', () => {
        expect(replaceVariables('test {variable}', { variable: 'function' })).to.eql(['test ', 'function']);
    });
    it('should return array with replaced variable', () => {
        expect(replaceVariables('{variable}', { variable: 'function' })).to.eql(['function']);
    });
    it('should return array with replaced variable and string with the same variable name', () => {
        expect(replaceVariables('variable:{variable}', { variable: 'function' })).to.eql(['variable:', 'function']);
    });
    it('should return array with string and {} ', () => {
        expect(replaceVariables('\\{variable\\}', { variable: 'function' })).to.eql(['{variable}']);
    });
    it('should handle edge cases', () => {
        expect(replaceVariables('text\\text')).to.eql(['texttext']);
        expect(replaceVariables('text\\\\text')).to.eql(['text\\text']);
        expect(replaceVariables('text\\\\{variable}', { variable: 'function' })).to.eql(['text\\', 'function']);
    });
});

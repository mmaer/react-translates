/**
 * Base tests module used to unify libs included in tests
 * @example Example use of test-base.js module
 * import {
 *   should,
 *   it, before, after, beforeEach, afterEach } from './common/test-base'
 *
 */
const chai = require('chai');
const sinonChai = require('sinon-chai');
require('mocha-sinon');

chai.use(sinonChai);

const { expect } = chai;

/* requires */

/**
 * Export
 */
export {
    it, before, after, beforeEach, afterEach,
} from 'arrow-mocha/es5';
export { expect };

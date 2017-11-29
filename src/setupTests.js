/* eslint-disable import/no-extraneous-dependencies */
import 'raf/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
/* eslint-enable import/no-extraneous-dependencies */

configure({ adapter: new Adapter() });

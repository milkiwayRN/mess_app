import Adapter from 'enzyme-adapter-react-15';
import { configure } from 'enzyme';
import JestFetchMock from 'jest-fetch-mock';

global.fetch = JestFetchMock;

configure({ adapter: new Adapter() });

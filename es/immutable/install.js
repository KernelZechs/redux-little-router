import reducer from './reducer';
import middleware from './middleware';
import enhancer from './enhancer';

import createInstaller from '../util/create-installer';

export default createInstaller({ reducer: reducer, middleware: middleware, enhancer: enhancer });
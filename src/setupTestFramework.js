// eslint-disable-next-line import/no-extraneous-dependencies
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

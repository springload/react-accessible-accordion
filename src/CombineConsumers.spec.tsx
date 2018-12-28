import * as React from 'react';
import { mount } from 'enzyme';
import CombineConsumers from './CombineConsumers';

describe('CombineConsumers', () => {
	const FooConsumer = ({
		children,
	}: {
		children(arg: 'foo'): React.ReactNode;
	}) => children('foo');
	const BarConsumer = ({
		children,
	}: {
		children(arg: 'bar'): React.ReactNode;
	}) => children('bar');

	it('Passes props from both consumers', () => {
		const wrapper = mount(
			<CombineConsumers consumers={[FooConsumer, BarConsumer]}>
				{(foo, bar) => <div>{`${foo}${bar}`}</div>}
			</CombineConsumers>,
		);

		console.log(wrapper.debug());

		expect(wrapper.find('div').text()).toEqual('foobar');
	});
});

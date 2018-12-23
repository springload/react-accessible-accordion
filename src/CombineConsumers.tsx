// import {polyfill} from 'react-lifecycles-compat';
import * as React from 'react';

export default function CombineConsumers({ children, consumers }) {
	const Component = consumers.reduce((carry, Consumer) => {
		return inheritedArgs => (
			<Consumer>{args => carry(args, inheritedArgs)}</Consumer>
		);
	}, children);

	return <Component>{children}</Component>;
}

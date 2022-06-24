import React from 'react';
import {Routes} from 'react-router-dom';

const Customer: React.FC = (): JSX.Element => {
	return (
		<div>
			<React.Suspense fallback='Loading...'>
				<Routes></Routes>
			</React.Suspense>
		</div>
	);
};

const Admin: React.FC = (): JSX.Element => {
	return (
		<div>
			<React.Suspense fallback='Loading...'>
				<Routes></Routes>
			</React.Suspense>
		</div>
	);
};

export default {
	Customer: React.memo(Customer),
	Admin: React.memo(Admin),
};

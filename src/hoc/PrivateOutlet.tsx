import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from '../redux';

const PrivateOutlet: React.FC<{children?: JSX.Element}> = ({children}) => {
	const {signedIn} = useSelector((state) => state.auth);
	if (!signedIn) return <Navigate to='/signin' replace />;
	return children ? children : <Outlet />;
};

export default React.memo(PrivateOutlet);

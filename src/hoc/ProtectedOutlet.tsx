import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from '../redux';

const ProtectedOutlet: React.FC<{children?: JSX.Element}> = ({children}) => {
	const {user} = useSelector((state) => state.auth);
	if (user?.role !== 'admin') return <Navigate to='/signin' replace />;
	return children ? children : <Outlet />;
};

export default React.memo(ProtectedOutlet);

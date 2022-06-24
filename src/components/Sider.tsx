import React from 'react';
import { NavLink } from 'react-router-dom';

const Sider: React.FC = (): JSX.Element => {
	return (
		<>
			<aside className='w-full bg-secondary text-white p-2 h-100'>
				<ul className='navbar flex-column align-items-start'>
					<li className='nav-item'>
						<NavLink to='/dashboard' className={active => active ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='#' className='nav-link'>Products</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='#' className='nav-link'>Categories</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='#' className='nav-link'>Orders</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink to='#' className='nav-link'>Deliveries</NavLink>
					</li>
				</ul>
			</aside>
		</>
	);
};

export default React.memo(Sider);

import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector} from '../redux';

const Nav: React.FC = (): JSX.Element => {
	const {user} = useSelector((state) => state.auth);
	return (
		<>
			<nav className='navbar navbar-dark bg-primary navbar-expand-lg sticky-top'>
				<div className='container-fluid justify-content-between'>
					<NavLink className='navbar-brand' to='/'>
						ThinkzyKart
					</NavLink>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarNav'
						aria-controls='navbarNav'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul className='navbar-nav'>
							<li className='nav-item'>
								<NavLink
									className={(active) => `nav-link${active ? ' active' : ''}`}
									aria-current='page'
									to='/'
								>
									Home
								</NavLink>
							</li>
							{user && (
								<>
									{user?.role === 'admin' && (
										<li className='nav-item'>
											<NavLink
												className={(active) =>
													`nav-link${active ? ' active' : ''}`
												}
												to='/dashboard'
											>
												Dashboard
											</NavLink>
										</li>
									)}
									<li className='nav-item'>
										<NavLink
											className={(active) =>
												`nav-link${active ? ' active' : ''}`
											}
											to='/account'
										>
											Account
										</NavLink>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default React.memo(Nav);

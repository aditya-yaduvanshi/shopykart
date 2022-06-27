import React from 'react';
import {Navbar, Nav as RbNav, Container} from 'react-bootstrap';
import {FaShoppingCart, FaUserCircle} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import {useSelector} from '../redux';

const Nav: React.FC = (): JSX.Element => {
	const {user} = useSelector((state) => state.auth);
	return (
		<>
			<Navbar bg='primary' variant='dark' className='px-5' sticky='top'>
				<Navbar.Brand as={NavLink} to='/' className='cursor-pointer mr-auto'>
					<FaShoppingCart size='24' color='white' /> ShopyKart
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='navbar-links' color='white' />
				<Navbar.Collapse id='navbar-links' className='d-flex justify-content-end'>
					<RbNav>
						{user && (
							<>
								{user?.role === 'admin' && (
									<RbNav.Item>
										<RbNav.Link as={NavLink} to='/dashboard'>
											Dashboard
										</RbNav.Link>
									</RbNav.Item>
								)}
								<RbNav.Item>
									<RbNav.Link as={NavLink} to='/account'>
										<FaUserCircle color='white' size='18' /> Account
									</RbNav.Link>
								</RbNav.Item>
							</>
						)}
					</RbNav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default React.memo(Nav);

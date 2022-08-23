import React from 'react';
import {Navbar, Nav as RbNav, Form} from 'react-bootstrap';
import {
	FaShoppingCart,
	FaUserCircle,
	FaShoppingBasket,
	FaTachometerAlt,
	FaSignOutAlt,
} from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import {useSelector} from '../redux';

const Nav: React.FC = (): JSX.Element => {
	const {user} = useSelector((state) => state.auth);
	return (
		<>
			<Navbar bg='dark' variant='dark' className='px-5 gap-3' sticky='top'>
				<Navbar.Toggle aria-controls='#navbar-links' color='white' />
				<Navbar.Brand as={NavLink} to='/' className='cursor-pointer'>
					<FaShoppingCart size='24' color='white' /> ShopyKart
				</Navbar.Brand>
				<Form.Control
					type='text'
					className='w-25'
					id='search'
					placeholder='Search products by category, brands etc.'
				></Form.Control>
				<Navbar.Collapse id='navbar-links' className='justify-content-end'>
					<RbNav>
						{user ? (
							<>
								{user?.role === 'admin' && (
									<RbNav.Item>
										<RbNav.Link
											as={NavLink}
											to='/dashboard'
											className='fw-bold'
										>
											<FaTachometerAlt color='white' size='24' /> Dashboard
										</RbNav.Link>
									</RbNav.Item>
								)}
								<RbNav.Item className='mx-2'>
									<RbNav.Link as={NavLink} to='/cart' className='fw-bold'>
										<FaShoppingBasket color='white' size='24' /> Cart
									</RbNav.Link>
								</RbNav.Item>
								<RbNav.Item className='mx-2'>
									<RbNav.Link as={NavLink} to='/account' className='fw-bold'>
										<FaUserCircle color='white' size='24' /> Account
									</RbNav.Link>
								</RbNav.Item>
								<RbNav.Item className='ml-2'>
									<RbNav.Link
										className='btn btn-danger px-4 fw-bold'
										as={NavLink}
										to='#!'
									>
										<FaSignOutAlt color='white' size='24' /> Sign Out
									</RbNav.Link>
								</RbNav.Item>
							</>
						) : (
							<>
								<RbNav.Item className='mx-2'>
									<RbNav.Link
										className='btn btn-primary btn-sm px-4 fw-bold'
										as={NavLink}
										to='/account/signin'
									>
										Sign In
									</RbNav.Link>
								</RbNav.Item>
								<RbNav.Item>
									<RbNav.Link
										className='btn btn-warning btn-sm px-4 fw-bold'
										as={NavLink}
										to='/account/register'
									>
										Register
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

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { Grid, ListUl, Boxes, Diagram3, Truck } from 'react-bootstrap-icons';

const Sider: React.FC = (): JSX.Element => {
	return (
		<>
			<Navbar className='p-2 h-100' bg="dark" variant="dark">
				<Nav className='align-items-start flex-column h-100 w-100' defaultActiveKey='/dashboard' as='ul'>
					<Nav.Item className='w-100'>
						<Nav.Link as={NavLink} to='/dashboard'> <Grid size='20' /> Dashboard</Nav.Link>
					</Nav.Item>
					<Nav.Item className='w-100'>
						<Nav.Link as={NavLink} to='/proudcts'> <ListUl size='20' /> Products</Nav.Link>
					</Nav.Item>
					<Nav.Item className='w-100'>
						<Nav.Link as={NavLink} to='/categories'> <Diagram3 size='20' /> Categories</Nav.Link>
					</Nav.Item>
					<Nav.Item className='w-100'>
						<Nav.Link as={NavLink} to='/orders'> <Boxes size='20' /> Orders</Nav.Link>
					</Nav.Item>
					<Nav.Item className='w-100'>
						<Nav.Link as={NavLink} to='/deliveries'> <Truck size='20' /> Deliveries</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar>
		</>
	);
};

export default React.memo(Sider);

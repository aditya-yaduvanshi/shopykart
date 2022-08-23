import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Nav from './components/Nav';
import Sider from './components/Sider';
import PrivateOutlet from './hoc/PrivateOutlet';
import ProtectedOutlet from './hoc/ProtectedOutlet';
import {useSelector} from './redux';
import {Container, Row, Col} from 'react-bootstrap';

const Home = React.lazy(async () => await import('./pages/home'));
const Profile = React.lazy(async () => await import('./pages/account/profile'));
const Signin = React.lazy(async () => await import('./pages/account/signin'));
const Register = React.lazy(
	async () => await import('./pages/account/register')
);
const Product = React.lazy(async () => await import('./pages/product'));
const Dashboard = React.lazy(
	async () => await import('./pages/admin/dashboard')
);
const EditProduct = React.lazy(
	async () => await import('./pages/admin/edit-product')
);
const AddProduct = React.lazy(
	async () => await import('./pages/admin/add-product')
);

const App: React.FC = (): JSX.Element => {
	const {user} = useSelector((state) => state.auth);
	const {pathname} = useLocation();
	return (
		<>
			<Container fluid className='p-0'>
				<Nav />
				<Container fluid className='px-0'>
					<Row>
						{user?.role === 'admin' && (
							<Col md={1} lg={2}>
								<Sider />
							</Col>
						)}
						<Col>
							<React.Suspense fallback='Loading...'>
								<Routes>
									<Route index element={<Home />} />
									<Route path='/account/signin' element={<Signin />} />
									<Route path='/account/register' element={<Register />} />
									<Route element={<PrivateOutlet />}>
										<Route path='/account' element={<Profile />} />
									</Route>
									<Route path='/products' element>
										<Route path=':id' element={<Product />}>
											<Route element={<ProtectedOutlet />}>
												<Route path='edit' element={<EditProduct />} />
											</Route>
										</Route>
										<Route element={<ProtectedOutlet />}>
											<Route path='add' element={<AddProduct />} />
										</Route>
									</Route>
									<Route element={<ProtectedOutlet />}>
										<Route path='/dashboard' element={<Dashboard />} />
									</Route>
								</Routes>
							</React.Suspense>
						</Col>
					</Row>
				</Container>
			</Container>
		</>
	);
};

export default React.memo(App);

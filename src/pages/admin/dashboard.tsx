import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';

interface IProduct {
	id: string;
	title: string;
	image: string;
	description: string;
	price: number;
	category: string;
}

const Dashboard: React.FC = (): JSX.Element => {
	const [products, setProducts] = useState<IProduct[] | null>(null);

	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then((res) => res.json())
			.then((result: IProduct[]) => {
				console.log(result);
				setProducts(result);
			});
	}, []);

	return (
		<>
			<Container fluid>
				<h1>Admin Dashboard</h1>
				<Row sm={2} md={3} lg={4} style={{rowGap: 5}}>
					{products?.map((item) => (
						<Col key={item.id}>
							<Card key={item.id} style={{width: '15em'}}>
								<Card.Img src={item.image} alt={item.title} variant='top' />
								<Card.Body className="p-2">
									<Card.Title>{item.title}</Card.Title>
									<Card.Text>Rs. {item.price}</Card.Text>
									<Card.Text>{item.category}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</>
	);
};

export default React.memo(Dashboard);

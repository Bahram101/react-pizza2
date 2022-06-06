import React, {useState, useEffect} from 'react';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Categories from '../components/Categories';

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('https://629dc2ffc6ef9335c0a5514c.mockapi.io/items')
			.then((res) => res.json())
			.then((json) => {
				setItems(json);
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => (
							<Skeleton key={index} />
					  ))
					: items.map((obj, i) => <PizzaBlock {...obj} key={i} />)}
			</div>
		</>
	);
};
export default Home;
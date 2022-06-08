import React, { useState, useEffect } from 'react';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Categories from '../components/Categories';

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState(0);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://629dc2ffc6ef9335c0a5514c.mockapi.io/items?category=${categoryId}`
		)
			.then((res) => res.json())
			.then((json) => {
				setItems(json);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId]);

	console.log('categoryId', categoryId);
	console.log('sortType', sortType);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={(id) => setCategoryId(id)}
				/>
				<Sort 
					value={sortType}
					onChangeSort={(id) => setSortType(id)} 
				/>
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => (
							<Skeleton key={index} />
					  ))
					: items.map((obj, i) => <PizzaBlock {...obj} key={i} />)}
			</div>
		</div>
	);
};
export default Home;

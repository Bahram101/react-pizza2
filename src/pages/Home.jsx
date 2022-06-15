import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../App';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';

const Home = () => {
	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: 'популярность',
		sort: 'rating',
	});

	useEffect(() => {
		setIsLoading(true);

		const sortBy = sortType.sort.replace('-', '');
		const order = sortType.sort.includes('-') ? 'desc' : 'asc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		fetch(
			`https://629dc2ffc6ef9335c0a5514c.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}&page=${currentPage}&limit=4`
		)
			.then((res) => res.json())
			.then((json) => {
				setItems(json);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	const pizzas = items
		// .filter((value) =>
		// 	value.title.toLowerCase().includes(searchValue.toLowerCase()) // Поиск для статические данные
		// )
		.map((obj, i) => <PizzaBlock {...obj} key={i} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={(id) => setCategoryId(id)}
				/>
				<Sort
					value={sortType}
					onChangeSort={(obj) => setSortType(obj)}
				/>
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading ? skeletons : pizzas}
			</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	);
};
export default Home;

import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import qs from 'qs';
import {Navigate, useNavigate} from 'react-router-dom';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import axios from 'axios';

const Home = () => {

	const navigate = useNavigate()

	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);
	// const sort = useSelector((state) => state.filter.sortType.sort);

	const dispatch = useDispatch(); 

	useEffect(() => {
		setIsLoading(true);

		const sortBy = sortType.sort.replace('-', '');
		const order = sortType.sort.includes('-') ? 'desc' : 'asc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		axios.get(
				`https://629dc2ffc6ef9335c0a5514c.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}&page=${currentPage}&limit=4`
			)
			.then((res) => {
				setItems(res.data);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType.sort, searchValue, currentPage]);


	useEffect(()=>{
		const queryString = qs.stringify({
			sortProperty: sortType.sort,
			categoryId,
			currentPage
		}) 
		navigate(`?${queryString}`)
	}, [categoryId, sortType.sort, currentPage])


	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	const pizzas = items
		// .filter((value) =>
		// 	value.title.toLowerCase().includes(searchValue.toLowerCase()) // Поиск для статические данные
		// )
		.map((obj, i) => <PizzaBlock {...obj} key={i} />);

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={(id) => dispatch(setCategoryId(id))}
				/>
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading ? skeletons : pizzas}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};
export default Home;

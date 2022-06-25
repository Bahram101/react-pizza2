import React, { useContext, useEffect, useRef } from 'react';
import styles from './Search.module.scss';
import { SearchContext } from '../../App';

function Search() {
	const { searchValue, setSearchValue } = useContext(SearchContext);
	const inputRef = useRef();

	const onClickClear = () => {
		setSearchValue('');
		inputRef.current.focus();  
	};

	return (
		<div className={styles.root}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth='2'
				className={styles.searchIcon}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
				/>
			</svg>
			<input
				ref={inputRef}
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				className={styles.input}
				placeholder='Поиск пицы...'
			/>
			{searchValue && (
				<svg
					onClick={onClickClear}
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth='2'
					className={styles.closeIcon}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			)}
		</div>
	);
}

export default Search;

import React, { useContext, useEffect, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';

function Search() {
	const { searchValue, setSearchValue } = useContext(SearchContext);
	const inputRef = useRef();

	const onClickClear = () => {
		setSearchValue('');
		inputRef.current.focus();
	};

	const testDebounce = useCallback(
		debounce(() => {
			console.log('HELLO');
		}, 1000),
		[]
	);

	const onChangeInput = (event) => {
		setSearchValue(event.target.value);
		testDebounce();
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
				onChange={onChangeInput}
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

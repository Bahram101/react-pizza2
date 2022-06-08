import React, { useState } from 'react';

export default function Categories({value, onChangeCategory}) { 
	const cats = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]; 

 
	return (
		<div className='categories'>
			<ul>
				{cats.map((categoryName, i) => (
					<li
						key={i}
						onClick={() => onChangeCategory(i)}
						className={value === i ? 'active' : ''}
					>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
}

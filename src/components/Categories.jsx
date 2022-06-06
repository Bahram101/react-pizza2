import React, { useState } from 'react';

export default function Categories() {
	const [activeIndex, setActiveIndex] = useState(0); 
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
				{cats.map((cat, i) => (
					<li
						key={i}
						onClick={() => setActiveIndex(i)}
						className={activeIndex === i ? 'active' : ''}
					>
						{cat}
					</li>
				))}
			</ul>
		</div>
	);
}

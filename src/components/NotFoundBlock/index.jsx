import React from 'react';
import styles from './NotFoundBlock.module.scss';

console.log('styles', styles);

function NotFoundBlock() {
	return (
		<div className={styles.root}>
			<h1>
				<span> 😕</span>
				<br />
				Ничего не найдено
			</h1>
			<p className={styles.desc}>
				К сожелению данная страница отсутствует в нашем
				интернет-магазине
			</p>
		</div>
	);
}

export default NotFoundBlock;

/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const movieDB = {
		movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против..."
		]
	};

	//* */
	const promoAdv = document.querySelectorAll('.promo__adv img'),
		promoBg = document.querySelector('.promo__bg'),
		promoGenre = promoBg.querySelector('.promo__genre'),
		movieList = document.querySelector('.promo__interactive-list'),
		addForm = document.querySelector('.add'),
		addInput = addForm.querySelector('.adding__input'),
		checkbox = addForm.querySelector('[type="checkbox"]');

	addForm.addEventListener('submit', (event) => {
		event.preventDefault();

		let newFilm = addInput.value;
		const favorite = checkbox.checked;

		if (newFilm) {
			if (newFilm.length > 21) {
				newFilm = `${newFilm.substr(0, 21)}...`;
			}
			if (favorite) {
				console.log('Добавляем любимый фильм');
			}
			movieDB.movies.push(newFilm);
			sortArr(movieDB.movies);

			updateArrMovies(movieDB.movies, movieList);
		}

		event.target.reset();
	});

	const deleteAdv = (arg) => {
		arg.forEach(item => {
			item.remove();
		});
	};

	const makeChanges = () => {
		promoGenre.textContent = 'драма';

		promoBg.style.background = 'url("../img/bg.jpg")';
	};

	const sortArr = (arr) => {
		arr.sort();
	};

	function updateArrMovies(films, parent) {
		parent.innerHTML = "";
		sortArr(films);

		films.forEach((item, i) => {
			parent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${item}
				<div class="delete"></div>
				</li>
			`;
		});

		document.querySelectorAll('.delete').forEach((btn, i) => {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				films.splice(i, 1);

				updateArrMovies(films, parent);
			});
		});
	}

	updateArrMovies(movieDB.movies, movieList);
	deleteAdv(promoAdv);
	makeChanges();
	// sortArr(movieDB.movies);
});
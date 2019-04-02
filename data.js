function updateInfo(count, lastUpdate) {
	return `
        <div id="listHeader">
            <div id="totalCount">
                <span class="title">COMING SOON</span> TO THEATERS
                <span class="count">${count}</span>
            </div>
            <div id="lastUpdate">
                Last Updated on
                <br />${lastUpdate}
            </div>
        </div>
    `;
}

_setMovieData = (movies) => {
	let dateArray = [];
	let myData = [];
	const movieData = movies.data.arrayValue.values;
	movieData.forEach((movie) => {
		movie = movie.mapValue.fields;
		if (movie.release.stringValue.length > 10) {
			movie.release.stringValue = movie.release.stringValue.substring(0, 10) + ' (재개봉)';
		}
		if (!dateArray.includes(movie.release.stringValue)) {
			dateArray.push(movie.release.stringValue);
			myData[movie.release.stringValue] = [];
		}

		myData[movie.release.stringValue].push({
			poster: movie.poster.stringValue,
			release: movie.release.stringValue,
			subject: movie.subject.stringValue,
			code: movie.code.integerValue,
			age: movie.age.stringValue,
			director: movie.director.stringValue,
			country: movie.country.stringValue,
			name: movie.name.stringValue,
			reserve: movie.reserve.stringValue,
			time: movie.time.stringValue,
			genre: movie.genre.stringValue
		});
	});
	movies.data = myData;
	movies.count = movies.count.integerValue;
	movies.updated = movies.updated.stringValue;
	return movies;
};

function renderAge(age) {
	let ageClass = '';
	let ageNum = '';
	if (age !== '') {
		switch (age.trim()) {
			case '전체 관람가':
				ageClass = 'ageAll';
				ageNum = 'All';
				break;
			case '15세 관람가':
				ageClass = 'age15';
				ageNum = 15;
				break;
			case '청소년 관람불가':
				ageClass = 'age19';
				ageNum = 19;
				break;
			case '12세 관람가':
				ageClass = 'age12';
				ageNum = 12;
				break;
			case '':
				ageClass = 'none';
				break;
			case 'NR':
			case 'R':
			default:
				ageClass = `age${age}`;
				ageNum = age;
				break;
		}
	}
	return `<div class="ageCircle ${ageClass}">${ageNum}</div>`;
}

function renderCards(movie) {
	return `<div class="cardBox">
            <div class="posterWrap">
                <img src="${movie.poster}" />
            </div>
            <div class="infoWrap">
                <a class="titleWrap" href="https://movie.naver.com/movie/bi/mi/basic.nhn?code=${movie.code}" target="_blank">
                    ${renderAge(movie.age)}
                    <span>${movie.name}</span>
                </a>
            </div>
            <div class="boxWrap">
                <div class="director">
                    감독 <span>${movie.director}</span>
                </div>
                <div class="genre">
                    장르 <span>${movie.genre}</span>
                </div>
            </div>
        </div>`;
}

function _setDateMovieBox(date, array) {
	return `<div id="dateMovieBox">
            <div id="dateHeader">
                <i class="fas fa-film"></i>
                <span>${date}</span>
            </div>
            <div id="list">
                ${array.map(renderCards).join('')}
            </div>
        </div>`;
}

function list_print(data) {
	const myData = data.data;
	const movies = Object.entries(myData)
		.map((movie) => {
			return _setDateMovieBox(movie[0], movie[1]);
		})
		.join('');
	console.log(movies);

	return movies;
}

function listWrap_print(data) {
	return `
        <div id="listWrap">
            ${updateInfo(data.count, data.updated)}
            ${list_print(data)}
        </div>
    `;
}

fetch('https://firestore.googleapis.com/v1beta1/projects/corini-co/databases/(default)/documents/coci/movie')
	.then((res) => res.json())
	.then((res) => _setMovieData(res.fields))
	.then((data) => {
		const html = listWrap_print(data);
		const wrapper = document.querySelector('#wrapper');
		wrapper.innerHTML = html;
	});

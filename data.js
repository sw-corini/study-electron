fetch('https://firestore.googleapis.com/v1beta1/projects/corini-co/databases/(default)/documents/coci/movie')
	.then((data) => data.json())
	.then((data) => {
		const header = document.querySelector('#h1');
		header.textContent = data.name;
	});

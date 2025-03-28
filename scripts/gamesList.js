import { showElement, hideElement } from './scripts.js';
import { availableGames, unavailableGames } from './boardgames.js';

const unavailableGamesSection = document.getElementById(
	'unavailableGamesSection'
);

const availableGamesCount = document.getElementById('availableGamesCount');
const unavailableGamesCount = document.getElementById('unavailableGamesCount');

const availableGamesList = document.getElementById('availableGamesList');
const unavailableGamesList = document.getElementById('unavailableGamesList');

function renderGameCard(game, list) {
	const container = document.createElement('li');
	container.classList.add('cardContainer');

	const header = document.createElement('div');
	header.classList.add('cardHeader');

	const title = document.createElement('h3');
	title.classList.add('cardTitle');
	title.textContent = game.name;

	const setAvailabilityButton = document.createElement('button');
	setAvailabilityButton.classList.add('cardButton');
	setAvailabilityButton.classList.add('cardButtonIconAvailable');
	setAvailabilityButton.textContent = 'Tornar indisponível';

	const image = document.createElement('img');
	image.classList.add('cardImage');
	image.src = game.image;
	image.alt = game.name;

	const description = document.createElement('p');
	description.classList.add('cardDescription');
	description.textContent = `Jogadores: ${game.minPlayers} a ${game.maxPlayers}`;

	header.appendChild(title);
	header.appendChild(setAvailabilityButton);

	container.appendChild(header);
	container.appendChild(image);
	container.appendChild(description);

	list.appendChild(container);
}

export function renderGamesList() {
	if (unavailableGames.length > 0) {
		showElement(unavailableGamesSection);
	} else {
		hideElement(unavailableGamesSection);
	}

	availableGamesCount.textContent = availableGames.length ?? 0;
	unavailableGamesCount.textContent = unavailableGames.length ?? 0;

	availableGamesList.innerHTML = '';
	unavailableGamesList.innerHTML = '';

	availableGames.forEach((game) => {
		renderGameCard(game, availableGamesList);
	});

	unavailableGames.forEach((game) => {
		renderGameCard(game, unavailableGamesList);
	});
}

renderGamesList();

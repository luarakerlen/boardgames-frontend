import { availableGames, unavailableGames } from './boardgames.js';

const availableGamesList = document.getElementById('availableGamesList');
const unavailableGamesList = document.getElementById('unavailableGamesList');

const availableGamesCount = document.getElementById('availableGamesCount');
const unavailableGamesCount = document.getElementById('unavailableGamesCount');

function renderGameCard(game, list) {
	const li = document.createElement('li');

	const container = document.createElement('div');
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

	li.appendChild(container);
	list.appendChild(li);
}

export function renderGamesList() {
	availableGamesList.innerHTML = '';
	unavailableGamesList.innerHTML = '';

	availableGames.forEach((game) => {
		renderGameCard(game, availableGamesList);
	});

	unavailableGames.forEach((game) => {
		renderGameCard(game, unavailableGamesList);
	});

	availableGamesCount.textContent = availableGames.length ?? 0;
	unavailableGamesCount.textContent = unavailableGames.length ?? 0;
}

renderGamesList();

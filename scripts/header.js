import { hideElement, showElement } from './scripts.js';
import { updateChooseGameButtonState, setRandomGame } from './chooseGame.js';
import {
	removeAllActiveClass,
	setChosenPlayersNumber,
	chosenPlayersNumber,
} from './playersNumber.js';
import {
	allGames,
	unavailableGames,
	setAvailableGames,
	setUnavailableGames,
} from './boardgames.js';

function scrollToUnavailableGames() {
	const unavailableGamesRef = document.getElementById('unavailableGames');
	if (unavailableGamesRef) {
		unavailableGamesRef.scrollIntoView({
			behavior: 'smooth',
		});
	}
}

function handleReset() {
	setChosenPlayersNumber(null);
	setAvailableGames(allGames);
	setUnavailableGames([]);
	setRandomGame(null);
	updateHeaderButtonsVisibility();
	updateChooseGameButtonState();
	removeAllActiveClass();
}

export function updateHeaderButtonsVisibility() {
	const headerButtons = document.getElementById('headerButtons');
	const hasUnavailableGames = unavailableGames.length > 0;
	const shouldShowHeaderButtons = hasUnavailableGames || chosenPlayersNumber;

	if (shouldShowHeaderButtons) {
		showElement(headerButtons);
	} else {
		hideElement(headerButtons);
	}
}

window.handleReset = handleReset;
window.scrollToUnavailableGames = scrollToUnavailableGames;

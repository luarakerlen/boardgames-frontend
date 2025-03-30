import { hideElement, showElement } from './scripts.js';
import { updateChooseGameButtonState, setRandomGame } from './chooseGame.js';
import { renderGamesList } from './cardList.js';
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
	const unavailableGamesRef = document.getElementById(
		'unavailableGamesSection'
	);
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
	renderGamesList();
}

export function updateHeaderButtonsVisibility() {
	const headerButtons = document.getElementById('headerButtons');
	const resetButton = document.getElementById('resetButton');
	const seeUnavailableGamesButton = document.getElementById(
		'seeUnavailableGamesButton'
	);

	const hasUnavailableGames = unavailableGames.length > 0;
	const shouldShowHeaderButtons = hasUnavailableGames || !!chosenPlayersNumber;
	const shouldShowSeeUnavailableGamesButton = hasUnavailableGames;
	const shouldShowResetButton = hasUnavailableGames || !!chosenPlayersNumber;

	if (shouldShowHeaderButtons) {
		showElement(headerButtons);
	} else {
		hideElement(headerButtons);
	}

	if (shouldShowSeeUnavailableGamesButton) {
		showElement(seeUnavailableGamesButton);
	} else {
		hideElement(seeUnavailableGamesButton);
	}

	if (shouldShowResetButton) {
		showElement(resetButton);
	} else {
		hideElement(resetButton);
	}
}

window.handleReset = handleReset;
window.scrollToUnavailableGames = scrollToUnavailableGames;

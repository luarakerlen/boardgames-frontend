import { boardgames } from './backend.js';

export let allGames = boardgames;
export function setAllGames(games) {
	allGames = games;
}

export let availableGames = allGames;
export function setAvailableGames(games) {
	availableGames = games;
}

export let unavailableGames = [];
export function setUnavailableGames(games) {
	unavailableGames = games;
}

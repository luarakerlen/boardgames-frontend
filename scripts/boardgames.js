import { boardgames } from '../data/boardgames.js';

export const allGames = boardgames;

export let availableGames = allGames;
export function setAvailableGames(games) {
	availableGames = games;
}

export let unavailableGames = [];
export function setUnavailableGames(games) {
	unavailableGames = games;
}

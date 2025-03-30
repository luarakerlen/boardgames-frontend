import { renderGamesList } from './cardList.js';
export const boardgames = [];

const BASE_URL = 'http://127.0.0.1:5001';

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de jogos de tabuleiro existentes do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
async function getList() {
	const url = `${BASE_URL}/boardgames`;

	try {
		const response = await fetch(url, { method: 'get' });
		const data = await response.json();

		if (response.ok) {
			boardgames.push(
				...data.boardgames.map((game) => convertAPIResponseToGameObject(game))
			);

			renderGamesList(boardgames);
		}
	} catch (error) {
		console.error('Error:', error);
	}
}

getList();

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo jogo de tabuleiro ao servidor via requisição POST
  --------------------------------------------------------------------------------------
*/

export async function addGame(game) {
	const url = `${BASE_URL}/boardgame`;

	try {
		const response = await fetch(url, {
			method: 'post',
			body: game,
		});

		if (!response.ok) {
			const errorMessage = await response.text();

			throw new Error(
				JSON.parse(errorMessage).message ||
					'Erro desconhecido ao adicionar o jogo'
			);
		}

		const data = await response.json();
		boardgames.push(convertAPIResponseToGameObject(data));
		renderGamesList(boardgames);

		return data;
	} catch (error) {
		console.error('Erro ao adicionar jogo no backend:', error.message || error);
		throw error;
	}
}

/*
	--------------------------------------------------------------------------------------
	Função para deletar um jogo de tabuleiro do servidor via requisição DELETE
	--------------------------------------------------------------------------------------
*/

export async function deleteGame(id) {
	const url = `${BASE_URL}/boardgame/${id}`;

	try {
		const response = await fetch(url, {
			method: 'delete',
		});

		if (!response.ok) {
			const errorMessage = await response.text();

			throw new Error(
				JSON.parse(errorMessage).message ||
					'Erro desconhecido ao deletar o jogo'
			);
		}

		const data = await response.json();
		boardgames.splice(
			boardgames.findIndex((game) => game.id === id),
			1
		);
		renderGamesList(boardgames);

		return data;
	} catch (error) {
		console.error('Erro ao deletar jogo no backend:', error.message || error);
		throw error;
	}
}

function convertAPIResponseToGameObject(game) {
	return {
		id: game.id,
		name: game.name,
		minPlayers: game.min_players,
		maxPlayers: game.max_players,
		image: game.image_url ?? null,
		description: game.description ?? null,
		ludopediaURL: game.ludopedia_url ?? null,
	};
}

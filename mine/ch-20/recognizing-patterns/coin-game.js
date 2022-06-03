const playCoinGame = coins => coins % 3 === 1 ? "them" : "you";

// one -> currentPlayer lose
// two -> nextPlayer lose
// three -> nextPlayer lose if currentPlayer takes 2 coins
// four -> currentPlayer always lose
// five -> nextPLayer lose
// six -> nextPLayer lose if currentPLayer takes 2 coins

for (let i = 1; i <= 100; i++) {
	console.log(playCoinGame(i));
}
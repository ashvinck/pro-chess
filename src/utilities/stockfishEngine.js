class Engine {
  constructor() {
    this.stockfish = new Worker(`${process.env.PUBLIC_URL}/stockfish.js`);
    this.onMessage = (callback) => {
      this.stockfish.addEventListener('message', (e) => {
        const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];

        callback({ bestMove });
      });
    };
    // Init engine
    this.sendMessage('uci');
    this.sendMessage('isready');
  }

  evaluatePosition(fen, depth) {
    this.stockfish.postMessage(`position fen ${fen}`);
    this.stockfish.postMessage(`go depth ${depth}`);
  }
  sendMessage(command) {
    this.stockfish.postMessage(command);
  }
  stop() {
    this.sendMessage('stop');
  }
  quit() {
    this.sendMessage('quit');
  }
}

export default Engine;

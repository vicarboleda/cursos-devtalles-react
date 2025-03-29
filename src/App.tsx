import { useEffect, useState } from "react";
import "./App.css";
import { HangImage } from "./components/HangImage";
import { letters } from "./helpers/letters";
import { getRandomWord } from "./helpers/getRandomWord";

function App() {
  const [word, setWord] = useState(getRandomWord());
  const [hiddenWord, setHiddenWord] = useState("_ ".repeat(word.length));
  const [attempts, seAtttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  //hooks - Si perdió
  useEffect(() => {
    if (attempts >= 9) {
      setLose(true);
    }
  }, [attempts]);

  //hooks - si ganó

  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(" ").join("");
    if (currentHiddenWord === word) {
      setWon(true);
    }
  }, [hiddenWord, word]);

  const checkLetter = (letter: string) => {
    if (lose) return;
    if (won) return;
    if (!word.includes(letter)) {
      seAtttempts(Math.min(attempts + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(" ");

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(" "));
  };

  const newGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    setHiddenWord("_ ".repeat(newWord.length));
    seAtttempts(0);
    setLose(false);
    setWon(false);
  };
  return (
    <div className="App">
      {/*Imagenes */}
      <HangImage imageNumber={attempts}></HangImage>

      {/*Palabra oculta */}
      <h3>{hiddenWord}</h3>

      {/*Contador de intentos */}
      <h3>Intentos: {attempts}</h3>

      {/*Mensaje perdió*/}
      {lose ? <h2>Perdió, la palabra era: {word}</h2> : ""}

      {/*Mensaje ganó*/}
      {won ? <h2>Felicidades, haz ganado</h2> : ""}

      {/*Botones de letras */}
      {letters.map((letter) => (
        <button onClick={() => checkLetter(letter)} key={letter}>
          {letter}
        </button>
      ))}

      {/*Botón reiniciar */}

      <br />
      <br />
      <button className="new-game-button" onClick={newGame}>
        Nuevo juego
      </button>
    </div>
  );
}

export default App;

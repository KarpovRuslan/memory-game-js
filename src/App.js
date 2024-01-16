/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import ButtonBlock from "./components/ButtonBlock/ButtonBlock";

const cardImages = [
  { src: "/image/monkey.png", matched: false },
  { src: "/image/rabbit.png", matched: false },
  { src: "/image/owl.png", matched: false },
  { src: "/image/lion.png", matched: false },
  { src: "/image/fox.png", matched: false },
  { src: "/image/wolf.png", matched: false },
  { src: "/image/bird.png", matched: false },
  { src: "/image/mouse.png", matched: false },
  { src: "/image/cat.png", matched: false },
  { src: "/image/capibara.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceFirst, setChoiceFirst] = useState(null);
  const [choiceSecond, setChoiceSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [activeBtn, setActiveBtn] = useState("medium");
  const [allMatched, setAllMatched] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    handleGameStart(activeBtn);
  }, []);

  useEffect(() => {
    if (choiceFirst && choiceSecond) {
      setDisabled(true);
      if (choiceFirst.src === choiceSecond.src) {
        setCards((prev) => {
          const updatedCards = prev.map((card) =>
          card.src === choiceFirst.src ? { ...card, matched: true } : card
          );

          const isAllMatched = updatedCards.every((card) => card.matched);
          setAllMatched(isAllMatched);

          return updatedCards;
        });
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 800);
      }
    }
  }, [choiceFirst, choiceSecond]);

  useEffect(() => {
    if (allMatched){
      const timeoutId = setTimeout(() => {
        setCountdown(3);
        setAllMatched(false);
        handleGameStart(activeBtn);
      }, 3000);

      const countdownIntervalId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
        clearInterval(countdownIntervalId);
      };
    }
  }, [allMatched, activeBtn]);

  const handleChoice = (card) => {
    if (card.id === choiceFirst?.id) return;
    choiceFirst ? setChoiceSecond(card) : setChoiceFirst(card);
  };

  const resetTurns = () => {
    setChoiceFirst(null);
    setChoiceSecond(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  const handleGameStart = (difficulty) => {
    let numberOfCards;
  
    switch (difficulty) {
      case 'easy':
        numberOfCards = 3;
        break;
      case 'medium':
        numberOfCards = 6;
        break;
      case 'hard':
        numberOfCards = 9;
        break;
      default:
        numberOfCards = 6; 
    }
  
    setActiveBtn(difficulty);
    const selectedCards = cardImages.slice(0, numberOfCards);
  
    setChoiceFirst(null);
    setChoiceSecond(null);
    setCards(selectedCards.concat(selectedCards).sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() })));
    setTurns(0);
  };

  const calculateGridClass = () => {
    const numCards = cards.length;

    if (numCards === 6) {
      return "card-grid-3";
    } else if (numCards === 12) {
      return "card-grid-4";
    } else {
      return "card-grid-6";
    }
  };

  return (
    <section className="App">
      <div className="difficulty">
        <p>Select your Difficulty</p>
        <ButtonBlock
          shuffleCards={() => handleGameStart(activeBtn)}
          handleDifficultyClick={handleGameStart}
          activeBtn={activeBtn}
        />
      </div>

      <div className="Board">
        <h1>Memory Card Game</h1>

        <div className={`${calculateGridClass()}`} >
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={
                card === choiceFirst || card === choiceSecond || card.matched
              }
              disabled={disabled}
              activeBtn={activeBtn}
            />
          ))}
        </div>
        {allMatched && (
          <div className="popup">
            <p className="popup-text">Finished with {turns} turns</p>
            <p className="timer">New Game will begin in {countdown} seconds </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;

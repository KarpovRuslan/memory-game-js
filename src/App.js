import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import ButtonBlock from "./components/ButtonBlock/ButtonBlock";

const cardImages = [
  { src: "/image/bird.png", matched: false },
  { src: "/image/cat.png", matched: false },
  { src: "/image/lion.png", matched: false },
  { src: "/image/monkey.png", matched: false },
  { src: "/image/bird.png", matched: false },
  { src: "/image/bird.png", matched: false },
  { src: "/image/bird.png", matched: false },
  { src: "/image/bird.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceFirst, setChoiceFirst] = useState(null);
  const [choiceSecond, setChoiceSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [activeBtn, setActiveBtn] = useState("medium");

  useEffect(() => {
    if (choiceFirst && choiceSecond) {
      setDisabled(true);
      if (choiceFirst.src === choiceSecond.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === choiceFirst.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 800);
      }
    }
  }, [choiceFirst, choiceSecond]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceFirst(null);
    setChoiceSecond(null);
    setCards(shuffledCards);
    setTurns(0);
  };

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

  const handleDifficultyClick = (difficulty) => {
    let numberOfCards;
  
    switch (difficulty) {
      case 'easy':
        numberOfCards = 2;
        break;
      case 'medium':
        numberOfCards = 4;
        break;
      case 'hard':
        numberOfCards = 6;
        break;
      default:
        numberOfCards = 2; 
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
    console.log(numCards);
    if (numCards === 4) {
      return "card-grid-2";
    } else if (numCards === 8) {
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
          shuffleCards={shuffleCards}
          handleDifficultyClick={handleDifficultyClick}
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
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
      </div>
    </section>
  );
}

export default App;

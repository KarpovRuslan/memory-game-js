import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowRight,
} from "react-icons/ai";

const ButtonBlock = ({ shuffleCards, handleDifficultyClick, activeBtn }) => {
  return (
    <>
      <div className="buttonBlock">
        <button
          className={`btn-easy ${activeBtn === 'easy' ? 'active' : ''}`}
          onClick={() => handleDifficultyClick("easy")}
        >
          <AiOutlineLeft />
          Easy
          <AiOutlineRight />
        </button>
        <button
          className={`btn-medium ${activeBtn === 'medium' ? 'active' : ''}`}
          onClick={() => handleDifficultyClick("medium")}
        >
          <AiOutlineLeft />
          Medium
          <AiOutlineRight />
        </button>
        <button
          className={`btn-hard ${activeBtn === 'hard' ? 'active' : ''}`}
          onClick={() => handleDifficultyClick("hard")}
        >
          <AiOutlineLeft />
          Hard
          <AiOutlineRight />
        </button>
      </div>
      <button onClick={shuffleCards}>
        Start Game
        <AiOutlineArrowRight />
      </button>
    </>
  );
};

export default ButtonBlock;

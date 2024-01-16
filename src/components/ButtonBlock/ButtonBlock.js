import {
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ButtonBlock = ({ shuffleCards, handleDifficultyClick, activeBtn }) => {
  const showToast = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 1000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <>
      <div className="buttonBlock">
        <button
          className={`btn-easy ${activeBtn === 'easy' ? 'active' : ''}`}
          onClick={() => {handleDifficultyClick("easy"); ; showToast("Easy level chosen")}}
        >
          <AiOutlineLeft />
          Easy
          <AiOutlineRight />
        </button>
        <button
          className={`btn-medium ${activeBtn === 'medium' ? 'active' : ''}`}
          onClick={() => {handleDifficultyClick("medium"); showToast("Medium level chosen")}}
        >
          <AiOutlineLeft />
          Medium
          <AiOutlineRight />
        </button>
        <button
          className={`btn-hard ${activeBtn === 'hard' ? 'active' : ''}`}
          onClick={() =>{ handleDifficultyClick("hard"); ; showToast("Hard level chosen")}}
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
      <ToastContainer />
    </>
  );
};

export default ButtonBlock;

import "./SingleCard.css";

function SingleCard({ card, handleChoice, flipped, disabled, activeBtn }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className={`card ${activeBtn==='medium' ? "card" : activeBtn==='easy' ? 'card-easy' : 'card-hard' }`}>
      <div className={flipped ? "flipped" : ""}>
        <img className="frontImage" src={card.src} alt="card front" />
        <img
          className="backImage"
          src="/image/back.jpg"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;

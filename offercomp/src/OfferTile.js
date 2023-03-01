import React from 'react';

function OfferTile(props) {
  const {
    name,
    visitedCount,
    price,
    imageUrl,
    description = '',
    clickHandler,
  } = props;

  return (
    <div>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Price: {price}</p>
      <p>Visited Count: {visitedCount}</p>
      <button onClick={clickHandler}>Mark Visited</button>
    </div>
  );
}

export default OfferTile;
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
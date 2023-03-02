import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import OfferTile from './OfferTile';

const GET_OFFERS = gql`
  query GetOffers {
    offers(limit: 10, sort: { by: DATE_ADDED, order: DESC }) {
      id
      name
      visitedCount
      price: value(currency: USD)
      imageUrl
      description
      dateAdded
    }
  }
`;

const MARK_VISITED = gql`
  mutation MarkVisited($offerId: String!) {
    markVisited(offerId: $offerId) {
      visitedCount
    }
  }
`;

function HolidayOffers() {
    const { loading, error, data } = useQuery(GET_OFFERS);
  
    const [markVisited] = useMutation(MARK_VISITED, {
      update(cache, { data: { markVisited } }) {
        cache.modify({
          fields: {
            offers(existingOffers = [], { readField }) {
              return existingOffers.map((offer) => {
                if (readField('id', offer) === markVisited.id) {
                  return { ...offer, visitedCount: markVisited.visitedCount };
                }
                return offer;
              });
            },
          },
        });
      },
    });

    const handleMarkVisited = (offerId) => {
        markVisited({ variables: { offerId } });
      };
    
      if (loading) {
        return <div>Loading offers...</div>;
      }
    
      if (error) {
        return <div>Failed to load offers</div>;
      }
    
      const { offers } = data;

      return (
        <div>
          {offers.map((offer) => (
            <OfferTile
              key={offer.id}
              name={offer.name}
              visitedCount={offer.visitedCount}
              price={`${offer.price} ${offer.currency}`}
              imageUrl={offer.imageUrl}
              description={offer.description || ''}
              clickHandler={() => handleMarkVisited(offer.id)}
            />
          ))}
        </div>
      );
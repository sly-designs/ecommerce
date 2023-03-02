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
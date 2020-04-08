import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, ListGroup, ListGroupItem } from 'reactstrap';
import { useSuggestions } from '../../services/Suggestions';
import './index.css';

const Suggestions: React.FC = () => {
  const { state } = useSuggestions();
  const { suggestions } = state;
  return (
    <Jumbotron className="bg-white py-0">
      <h3 className={'text-nowrap'}>
        <strong>Suggestions</strong>
      </h3>
      <ListGroup flush>
        {suggestions.map((suggestion, idx) => (
          <ListGroupItem key={suggestion}>
            <h5 className="d-flex font-weight-bold">
              <span>
                <Link to={`/${encodeURIComponent(suggestion)}`}>
                  <span>{suggestion}</span>
                </Link>
              </span>
            </h5>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Jumbotron>
  );
};
export default Suggestions;

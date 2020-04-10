import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { useSuggestions } from '../../services/Suggestions';
import './index.css';

const Suggestions: React.FC<{ [key: string]: any }> = (props) => {
  const { state } = useSuggestions();
  const { suggestions } = state;
  return (
    <div className="suggestions">
      <h3>
        <strong>Suggestions</strong>
      </h3>
      <ListGroup flush {...props}>
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
    </div>
  );
};
export default Suggestions;

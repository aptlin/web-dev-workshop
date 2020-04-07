import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useCallback, useState, Suspense } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Button, Col, Container, Row, Spinner } from 'reactstrap';
import { addFavorite, removeFavorite } from '../../actions/favorites';
import { loadNextBatch } from '../../actions/search';
import ErrorBoundary from '../../components/ErrorBoundary';
import Header from '../../components/Header';
import InfiniteScroll from '../../components/InfiniteScroll';
import config from '../../config';
import { useFavorites } from '../../services/Favorites';
import { GalleryContextConsumer } from '../../services/Gallery';
import Favorites from '../Favorites';
import Gallery from '../Gallery';
import './index.css';

interface MoodieProps extends RouteComponentProps {
  experienceName: string;
}

const About = React.lazy(() => import('../../pages/About'));
const Moodie: React.FC<MoodieProps> = () => {
  const { searchQuery } = useParams();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();
  const [batchSize] = useState<number>(config.constants.SEARCH_BATCH_SIZE);
  const fetchMore = useCallback(loadNextBatch(batchSize), [batchSize]);
  return (
    <Container fluid={true} className="p-4">
      <Header />
      <ErrorBoundary>
        <Row>
          <Col md={{ size: 3 }}>
            <Favorites />
          </Col>
          <Col>
            <GalleryContextConsumer>
              {({ state, dispatch }) => {
                const { giphySearchResults: log } = state;
                if (!searchQuery) {
                  return (
                    <Suspense
                      fallback={
                        <Spinner type="border" role="status" color="dark" />
                      }
                    >
                      <About />
                    </Suspense>
                  );
                } else if (log.searchQuery === searchQuery) {
                  return (
                    <>
                      <h4 className="row d-flex align-items-center">
                        <Col xs="auto">Current experience:</Col>
                        <Col xs="auto">
                          <span>{log.searchQuery}</span>
                        </Col>
                        <Col xs="auto" className="mr-auto pb-2 pt-2">
                          {favoritesState.liked.indexOf(searchQuery) > -1 ? (
                            <Button
                              color="danger"
                              onClick={() =>
                                favoritesDispatch(removeFavorite(searchQuery))
                              }
                            >
                              Remove from favorites
                            </Button>
                          ) : (
                            <Button
                              color="warning"
                              onClick={() =>
                                favoritesDispatch(addFavorite(searchQuery))
                              }
                            >
                              Add to favorites
                            </Button>
                          )}
                        </Col>
                      </h4>
                      <InfiniteScroll
                        onFetchMore={() => {
                          fetchMore(state, dispatch);
                        }}
                      >
                        <Gallery log={log} />
                      </InfiniteScroll>
                    </>
                  );
                }
              }}
            </GalleryContextConsumer>
          </Col>
        </Row>
      </ErrorBoundary>
    </Container>
  );
};

export default Moodie;

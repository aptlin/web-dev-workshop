import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense, useCallback, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Badge, Col, Container, Row, Spinner } from 'reactstrap';
import { addFavorite, removeFavorite } from '../../actions/favorites';
import { loadNextBatch } from '../../actions/search';
import ErrorBoundary from '../../components/ErrorBoundary';
import Header from '../../components/Header';
import InfiniteScroll from '../../components/InfiniteScroll';
import ToggleFavoriteButton from '../../components/ToggleFavoriteButton';
import config from '../../config';
import { useAuth0 } from '../../services/Auth';
import { useFavorites } from '../../services/Favorites';
import { GalleryContextConsumer } from '../../services/Gallery';
import Favorites from '../Favorites';
import Gallery from '../Gallery';
import Suggestions from '../Suggestions';
import './index.css';

interface MoodieProps extends RouteComponentProps {
  experienceName: string;
}

const About = React.lazy(() => import('../../pages/About'));

const Moodie: React.FC<MoodieProps> = () => {
  const { user, loginWithPopup } = useAuth0();
  const { searchQuery } = useParams();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();
  const [batchSize] = useState<number>(config.constants.SEARCH_BATCH_SIZE);
  const fetchMore = useCallback(loadNextBatch(batchSize), [batchSize]);
  const isFavorite = React.useCallback(() => {
    return Boolean(
      searchQuery && favoritesState.liked.indexOf(searchQuery) > -1,
    );
  }, [searchQuery, favoritesState]);
  const toggleFavorite = React.useCallback(() => {
    if (user) {
      const { email } = user;
      if (searchQuery) {
        isFavorite()
          ? favoritesDispatch(removeFavorite(searchQuery, email))
          : favoritesDispatch(addFavorite(searchQuery, email));
      }
    } else {
      loginWithPopup();
    }
  }, [user, searchQuery, loginWithPopup, favoritesDispatch, isFavorite]);
  return (
    <Container fluid={true} className="p-4">
      <Header />
      <ErrorBoundary>
        <Row>
          <Col md={{ size: 3 }}>
            {user ? <Favorites /> : null}
            <Suggestions />
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
                    <Container>
                      <Row className="align-items-center">
                        <Col xs="auto">
                          <h1 className="font-weight-bold mx-0 my-2">
                            {log.searchQuery}
                          </h1>
                        </Col>
                        <Col xs="auto">
                          <Badge className="mt-2 mx-0">
                            {log.pagination!.total_count} GIFs
                          </Badge>
                        </Col>
                        <Col xs="auto">
                          <ToggleFavoriteButton
                            isFavorite={isFavorite}
                            toggleFavorite={toggleFavorite}
                          />
                        </Col>
                      </Row>
                      <InfiniteScroll
                        onFetchMore={() => {
                          fetchMore(state, dispatch);
                        }}
                      >
                        <Gallery log={log} />
                      </InfiniteScroll>
                    </Container>
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

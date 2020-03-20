import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useCallback } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import ErrorBoundary from "../../components/ErrorBoundary";
import About from "../../pages/About";
import { GalleryContextConsumer } from "../../services/Gallery";
import Favorites from "../Favorites";
import Header from "../Header";
import "./index.css";
import { useFavorites } from "../../services/Favorites";
import { removeFavorite, addFavorite } from "../../actions/favorites";
import Gallery from "../Gallery";
import InfiniteScroll from "../../components/InfiniteScroll";
import config from "../../config";
import { loadNextBatch } from "../../actions/search";
interface MoodieProps extends RouteComponentProps {
  experienceName: string;
}

const Moodie: React.FC<MoodieProps> = () => {
  const { searchQuery } = useParams();
  const { state: favoritesState, dispatch: favoritesDispatch } = useFavorites();
  const [batchSize, updateBatchSize] = useState<number>(
    config.constants.SEARCH_BATCH_SIZE
  );
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
                  return <About />;
                } else if (log.searchQuery === searchQuery) {
                  return (
                    <>
                      <h4 className="row d-flex align-items-center">
                        <Col xs="auto">Current experience:</Col>
                        <Col xs="auto">
                          <span>{log.searchQuery}</span>
                        </Col>
                        <Col xs="auto" className="mr-auto pb-2 pt-2">
                          {favoritesState.liked.has(searchQuery) ? (
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

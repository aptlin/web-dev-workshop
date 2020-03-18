import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import config from "../../config";
import About from "../../pages/About";
import { GalleryContextConsumer } from "../../services/Gallery";
import Favorites, { toggleFavorite } from "../Favorites";
import Gallery from "../Gallery";
import Header from "../Header";
import "./index.css";

const MoodieFetcher: React.FC<MoodieFetcherProps> = ({
  dispatch,
  searchRequest
}) => {
  useEffect(() => {
    if (searchRequest && searchRequest.searchQuery) {
      dispatch({
        type: "fetch",
        data: searchRequest
      });
    }
  }, [dispatch, searchRequest]);
  return <></>;
};

const Moodie: React.FC<MoodieProps> = () => {
  let { searchQuery } = useParams();
  searchQuery = (searchQuery || "") as string;
  return (
    <Container fluid={true} className="p-4">
      <Header />
      <Row>
        <Col md={{ size: 3 }}>
          <Favorites />
        </Col>
        <Col>
          <GalleryContextConsumer>
            {({ state, dispatch }: GalleryState) => {
              if (!searchQuery) {
                return <About />;
              } else if (searchQuery in state) {
                const log = state[searchQuery];
                return (
                  <>
                    <h4 className="row d-flex align-items-center">
                      <Col xs="auto">Current experience:</Col>
                      <Col xs="auto">
                        <span>{log.title}</span>
                      </Col>
                      <Col xs="auto" className="mr-auto pb-2 pt-2">
                        {log.isFavorite ? (
                          <Button
                            color="danger"
                            onClick={() => toggleFavorite(log, state, dispatch)}
                          >
                            Remove from favorites
                          </Button>
                        ) : (
                          <Button
                            color="warning"
                            onClick={() => toggleFavorite(log, state, dispatch)}
                          >
                            Add to favorites
                          </Button>
                        )}
                      </Col>
                    </h4>
                    <Gallery log={log} />
                  </>
                );
              } else {
                return (
                  <MoodieFetcher
                    dispatch={dispatch}
                    searchRequest={{
                      ...config.defaultQuery,
                      searchQuery: searchQuery || ""
                    }}
                  />
                );
              }
            }}
          </GalleryContextConsumer>
        </Col>
      </Row>
    </Container>
  );
};

export default Moodie;

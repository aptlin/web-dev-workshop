import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormikHelpers } from "formik";
import kebabcase from "lodash.kebabcase";
import startCase from "lodash.startcase";
import React, { useState } from "react";
import {
  Link,
  RouteComponentProps,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import About from "../../components/About";
import Favorites, { toggleFavorite } from "../Favorites";
import Gallery from "../Gallery";
import Header from "../Header";
import "./index.css";

const Moodie: React.FC<RouteComponentProps> = ({ match }) => {
  const [archive, updateArchive] = useState<IArchive>({});
  const giphyApiKey = process.env.REACT_APP_GIPHY_KEY;
  const history = useHistory();
  const fetchTrendingGifs = (
    request: ISearchRequest,
    helpers?: FormikHelpers<ISearchRequest>
  ) => {
    const searchQuery = request.searchQuery;
    const kebabSearchQuery = kebabcase(searchQuery);
    history.push(`/${kebabSearchQuery}`);
    if (!archive[kebabSearchQuery]) {
      const searchURL =
        `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=` +
        encodeURIComponent(searchQuery);
      axios.get(searchURL).then(results => {
        const entry: IArchive = {};
        entry[kebabSearchQuery] = {
          title: searchQuery,
          experiences: [],
          isFavorite: false
        };
        for (const result of results.data.data) {
          entry[kebabSearchQuery].experiences.push({
            url: result.images.fixed_width.url,
            height: result.images.fixed_width.height,
            width: result.images.fixed_width.width,
            title: result.title
          });
        }
        updateArchive(prevArchive => ({
          ...entry,
          ...prevArchive
        }));
      });
    }
    if (helpers) {
      const { resetForm } = helpers;
      resetForm();
    }
  };

  const { searchQuery } = useParams();
  React.useEffect(() => {
    if (searchQuery) {
      fetchTrendingGifs({ searchQuery });
    }
  }, [searchQuery]);

  const location = useLocation();
  const experienceName = location.pathname.slice(1);
  const log = archive[experienceName];
  return (
    <Container fluid={true}>
      <Header onSubmit={fetchTrendingGifs} />
      <Row>
        <Col md={{ size: 3 }}>
          <Favorites archive={archive} updateArchive={updateArchive} />
        </Col>
        <Col>
          {log ? (
            <h4 className="row d-flex align-items-center">
              <Col xs="auto">Current experience:</Col>
              <Col xs="auto">
                <Link to={`/${experienceName}`}>{startCase(log.title)}</Link>
              </Col>
              <Col xs="auto" className="mr-auto pb-2 pt-2">
                {log.isFavorite ? (
                  <Button
                    color="danger"
                    onClick={() =>
                      toggleFavorite(experienceName, log, updateArchive)
                    }
                  >
                    Remove from favorites
                  </Button>
                ) : (
                  <Button
                    color="warning"
                    onClick={() =>
                      toggleFavorite(experienceName, log, updateArchive)
                    }
                  >
                    Add to favorites
                  </Button>
                )}
              </Col>
            </h4>
          ) : (
            <About />
          )}
          <Gallery archive={archive} />
        </Col>
      </Row>
    </Container>
  );
};

export default Moodie;

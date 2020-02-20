import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FormikHelpers } from "formik";
import kebabcase from "lodash.kebabcase";
import startCase from "lodash.startcase";
import React from "react";
import {
  RouteComponentProps,
  useHistory,
  useLocation,
  useParams,
  Link
} from "react-router-dom";
import { Col, Container, Row, Button } from "reactstrap";
import Favorites, { toggleFavorite } from "../Favorites";
import Gallery from "../Gallery";
import Header from "../Header";
import "./index.css";

const Moodie: React.FC<RouteComponentProps> = ({ match }) => {
  const [archive, updateArchive] = React.useState<IArchive>({});
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
        <Col md={{ size: 2 }}>
          <Favorites archive={archive} updateArchive={updateArchive} />
        </Col>
        <Col>
          {log ? (
            <h4 className="d-flex align-items-center">
              Current experience:{" "}
              <span className="pl-3 mr-auto">
                <Link to={`/${experienceName}`}>{startCase(log.title)}</Link>
              </span>
              {log.isFavorite ? (
                <Button
                  color="danger"
                  onClick={() =>
                    toggleFavorite(experienceName, log, updateArchive)
                  }
                >
                  Remove from favorites{" "}
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
            </h4>
          ) : null}
          <Gallery archive={archive} />
        </Col>
      </Row>
    </Container>
  );
};

export default Moodie;

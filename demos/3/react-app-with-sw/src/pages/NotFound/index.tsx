import * as Sentry from '@sentry/browser';
import React, { useEffect, useState } from 'react';
import { Container, Jumbotron, Row, Col } from 'reactstrap';
import Head from '../../components/Head';
import Header from '../../components/Header';
import Suggestions from '../../containers/Suggestions';
import { GiphyService } from '../../services/Giphy';
import config from '../../config';
import { GIFObject } from '../../types/giphy';
import GalleryItem from '../../components/GalleryItem';

const NotFound: React.FC = () => {
  const [image, setImage] = useState<GIFObject | null>(null);
  useEffect(() => {
    GiphyService.search({
      ...config.defaults.defaultSearchParams,
      searchQuery: '404 page not found',
    }).then((searchResults) => {
      try {
        const images = searchResults.data.data;
        const experience = images[Math.floor(Math.random() * images.length)];
        setImage(experience);
      } catch (err) {
        Sentry.captureException(err);
      }
    });
  }, []);
  return (
    <Container>
      <Head pageTitle={'Page not found'} />
      <Header />
      <h1 className="text-danger px-4 pb-4">
        Alas, the page you are looking for does not exist.
      </h1>
      <Row>
        <Col>
          <Suggestions />
        </Col>
        <Col>
          <Jumbotron>
            {image ? (
              <GalleryItem experience={image} isCompressed={false} />
            ) : null}
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};
export default NotFound;

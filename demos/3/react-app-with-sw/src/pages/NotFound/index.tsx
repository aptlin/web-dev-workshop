import * as Sentry from '@sentry/browser';
import React, { useEffect, useState } from 'react';
import { Container, Jumbotron } from 'reactstrap';
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
      <Jumbotron className="bg-white my-0 py-0">
        <h1>Alas, the page you are looking for does not exist.</h1>
        <Suggestions className="flex-row flex-wrap" horizontal flush={false} />
        {image ? <GalleryItem experience={image} isCompressed={false} /> : null}
      </Jumbotron>
    </Container>
  );
};
export default NotFound;

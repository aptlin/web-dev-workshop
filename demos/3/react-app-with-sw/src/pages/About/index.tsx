import React from 'react';
import {
  Card,
  CardBody,
  CardDeck,
  CardImg,
  CardText,
  Container,
} from 'reactstrap';
import { ImageLoader } from '../../components/ImageLoader';

interface ThematicCardProps {
  theme: string;
  text: string;
}

const ThematicCard: React.FC<ThematicCardProps> = ({ text, theme }) => {
  const [isLoaded, updateStatus] = React.useState(false);
  const loader = <ImageLoader minHeight={`200px`} minWidth={`200px`} />;
  return (
    <Card body className="mx-auto rounded-lg">
      <CardBody className="text-left">
        <CardText>{text}</CardText>
      </CardBody>
      {isLoaded ? null : loader}
      <CardImg
        className="rounded"
        style={{
          maxHeight: '200px',
          objectFit: 'contain',
          display: isLoaded ? 'block' : 'none',
        }}
        srcSet={
          `https://source.unsplash.com/random/25×25/?${theme} 50w, ` +
          `https://source.unsplash.com/random/50×50/?${theme} 100w, ` +
          `https://source.unsplash.com/random/100×100/?${theme} 200w`
        }
        sizes="(max-width 75px) 50px, 100px, 200px"
        onLoad={() => updateStatus(true)}
      ></CardImg>
    </Card>
  );
};
const About = () => {
  return (
    <Container>
      <CardDeck>
        <ThematicCard
          theme={'optimism'}
          text={
            'Moodie helps you feel better by finding gifs that match your emotions.'
          }
        />
        <ThematicCard theme={'joy'} text={'Save favorites and enjoy!'} />
        <ThematicCard
          theme={'adventure'}
          text={'Start exploring experiences in the search bar above.'}
        />
      </CardDeck>
    </Container>
  );
};
export default About;

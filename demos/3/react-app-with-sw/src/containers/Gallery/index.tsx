import React, { useLayoutEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import GalleryItem from '../../components/GalleryItem';
import {
  DEFAULT_COLUMNS_NUM,
  screenSizeToColumns,
  SCREEN_SIZES,
  TOTAL_NUMBER_OF_LAYOUT_COLUMNS,
  useWindowSize,
} from '../../services/Layout';
import { GIFObject, GiphySearchResult } from '../../types/giphy';
import './index.css';

interface GalleryProps {
  log: GiphySearchResult;
}
const Gallery: React.FC<GalleryProps> = ({ log }) => {
  const totalImagesNum = log && log.data ? log.data.length : 0;
  const [colNum, setColNum] = useState<number>(DEFAULT_COLUMNS_NUM);
  const [height, width] = useWindowSize();

  useLayoutEffect(() => {
    const mediaQueries: { [id: string]: MediaQueryList } = {};
    Object.values(SCREEN_SIZES).forEach((screenSize) => {
      mediaQueries[screenSize.id] = window.matchMedia(screenSize.mediaQuery);
      if (mediaQueries[screenSize.id].matches) {
        setColNum(screenSizeToColumns(screenSize.id));
      }
    });
  }, [height, width]);
  if (totalImagesNum) {
    const colSizes = new Array<number>(colNum).fill(0);
    const cols = new Array<Array<GIFObject>>(colNum)
      .fill([])
      .map(() => new Array<GIFObject>());
    log.data.forEach((experience) => {
      const experienceColIdx = colSizes.indexOf(Math.min(...colSizes));
      colSizes[experienceColIdx] += Number.parseInt(
        experience.images.fixed_width.height,
      );
      cols[experienceColIdx].push(experience);
    });
    const cards = cols.map((col, idx) => (
      <Col
        key={`col-${idx}`}
        className={`col-${
          TOTAL_NUMBER_OF_LAYOUT_COLUMNS / colNum
        } gallery-column`}
      >
        {col.map((experience, jdx) => (
          <GalleryItem key={`col-${idx}-row-${jdx}`} experience={experience} />
        ))}
      </Col>
    ));
    return <Row>{cards}</Row>;
  }
  return null;
};

export default Gallery;

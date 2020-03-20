import React from "react";
import { useLocation } from "react-router-dom";
import { CardColumns } from "reactstrap";
import GalleryItem from "../../components/GalleryItem";
import "./index.css";
import { GiphySearchResult } from "../../types/giphy";

interface GalleryProps {
  log: GiphySearchResult;
}
const Gallery: React.FC<GalleryProps> = ({ log }) => {
  const location = useLocation();
  const experienceName = location.pathname.slice(1);
  const totalImagesNum = log && log.data ? log.data.length : 0;
  const cards = totalImagesNum
    ? log.data.map((experience, idx) => (
        <GalleryItem key={`${idx}-${experienceName}`} experience={experience} />
      ))
    : null;
  return <CardColumns>{cards}</CardColumns>;
};

export default Gallery;

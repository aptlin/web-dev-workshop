import React from "react";
import { useLocation } from "react-router-dom";
import { CardColumns } from "reactstrap";
import Item from "../../components/Item";
import "./index.css";

const Gallery: React.FC<GalleryProps> = ({ log }) => {
  const location = useLocation();
  const experienceName = location.pathname.slice(1);
  const totalImagesNum = log ? log.experiences.length : 0;
  const cards = totalImagesNum
    ? log.experiences.map((experience, idx) => (
        <Item key={`${idx}-${experienceName}`} experience={experience} />
      ))
    : null;
  return <CardColumns>{cards}</CardColumns>;
};

export default Gallery;

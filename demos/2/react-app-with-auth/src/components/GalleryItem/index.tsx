import React from "react";
import { Card, CardImg, Spinner } from "reactstrap";
import { GIFObject } from "../../types/giphy";

interface GalleryItemProps {
  experience: GIFObject;
}
const GalleryItem: React.FC<GalleryItemProps> = ({ experience }) => {
  const [isLoaded, updateStatus] = React.useState(false);
  return (
    <Card
      style={{
        background: "#fff",
        border: "none",
        margin: "5px"
      }}
    >
      <div
        className="item-placeholder"
        style={
          isLoaded
            ? { display: "none" }
            : {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: `${experience.images.fixed_width.height}px`,
                minWidth: `${experience.images.fixed_width.width}px`
              }
        }
      >
        <Spinner type="border" role="status" color="light" />
      </div>
      <CardImg
        src={experience.images.fixed_width.url}
        onLoad={() => updateStatus(true)}
        style={isLoaded ? {} : { display: "none" }}
      />
    </Card>
  );
};
export default GalleryItem;

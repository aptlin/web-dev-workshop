import React from "react";
import { Card, CardImg, Spinner } from "reactstrap";
import "./index.css";

const Item: React.FC<IItem> = ({ experience }) => {
  const [isLoaded, updateStatus] = React.useState(false);
  return (
    <Card
      style={{
        background: "#e5e5e5"
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
                height: `${experience.height}px`,
                width: `${experience.width}px`
              }
        }
      >
        <Spinner animation="border" role="status" />
      </div>
      <CardImg
        src={experience.url}
        onLoad={() => updateStatus(true)}
        style={isLoaded ? {} : { display: "none" }}
      />
    </Card>
  );
};
export default Item;

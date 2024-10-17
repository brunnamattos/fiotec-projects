import React from "react";
import { useNavigate } from "react-router-dom";
import { useProjetos } from "../../context/ProjetosContext";
import "bootstrap/dist/css/bootstrap.min.css";
import view_icon from "../../assets/images/view_icon.png";
import heart_icon from "../../assets/images/heart_icon.png";
import { Button, Card, Row, Col } from "react-bootstrap";
import "./index.css";

export const CardItem = ({ projeto }) => {
  const { toggleFavorite } = useProjetos();
  const navigate = useNavigate();

  const handleFavoriteToggle = () => {
    toggleFavorite(projeto.id);
  };

  const handleView = () => {
    navigate(`/projetos/${projeto.id}`);
  };

  return (
    <Card className="h-100">
      <Card.Img
        className="img-card"
        variant="top"
        src={projeto.image}
        alt={projeto.title}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-2 h6">{projeto.title}</Card.Title>
        <Card.Text className="mb-4">
          {projeto.description.length > 100
            ? projeto.description.substring(0, 94) + "..."
            : projeto.description}
        </Card.Text>
        <Row className="mt-auto">
          <Col xs={6}>
            <Button className="card-custom-btn" onClick={handleView}>
              <img
                src={view_icon}
                alt="View icon"
                style={{ width: "1.25rem", marginRight: "8px" }}
              />
              <span className="card-text-btn">Acessar</span>
            </Button>
          </Col>
          <Col xs={6}>
            <Button className="card-custom-btn" onClick={handleFavoriteToggle}>
              <img
                src={heart_icon}
                alt="Heart icon"
                style={{ width: "1.25rem", marginRight: "8px" }}
              />
              <span className="card-text-btn">
                {projeto.favorite ? "Remover" : "Favoritar"}
              </span>
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

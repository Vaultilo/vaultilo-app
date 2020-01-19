import React from "react";
import { Carousel } from "react-bootstrap";
import CryptoCard from "./Cards/CryptoCard";
import NotesCard from "./Cards/NotesCard";
import PasswordsCard from "./Cards/PasswordsCard";

export default function CarouselRow(props) {
  const { items, cardType, onClick } = props;

  const getItemCard = (credential) => {
    if (cardType === 'crypto') {
      return (
        <CryptoCard credential={credential} onClick={onClick}/>
      )
    }
    if (cardType === 'notes') {
      return (
        <NotesCard credential={credential} onClick={onClick}/>
      )
    }
    if (cardType === 'passwords') {
      return (
        <PasswordsCard credential={credential} onClick={onClick}/>
      )
    }
  }
  
  const rows = [...Array(Math.ceil(items.length / 3))];
  const itemRows = rows.map((row, idx) => items.slice(idx * 3, idx * 3 + 3));
  
  return (
    <>
      <Carousel controls={items.length > 3} indicators={false} interval={null}>
        {itemRows.map((row, idx) => (
          <Carousel.Item key={`row-${cardType}-${idx}`}>
            <div className="row">
              {row.map(credential => (
                <div className="col-4 mb-3" key={credential.id}>
                  {getItemCard(credential)}
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}

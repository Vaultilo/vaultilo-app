import React from "react";
import { Carousel } from "react-bootstrap";
import CryptoCard from './Cards/CryptoCard';

export default function ItemsRow(props) {
  const { items, type } = props;
  const rows = [...Array( Math.ceil(items.length / 3) )];
  const productRows = rows.map( (row, idx) => items.slice(idx * 3, idx * 3 + 3) );

  const content = productRows.map((row, idx) => (
    <Carousel.Item key={`row-${type}-${idx}`} {...props}>
      <div className="row">    
        { row.map( credential => <CryptoCard credential={credential} key={credential.id}/> )}
      </div>
    </Carousel.Item>)
  );
  return (
    <>
    <Carousel controls={true} indicators={false} slide={false}>
      {content}
    </Carousel>
    </>
  );
}

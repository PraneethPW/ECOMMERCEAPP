import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api/api";

// Explicitly import all images
import backPackImg from '../images/BackPAck.jpg';
import blackTImg from '../images/BlackT.jpg';
import headphonesImg from '../images/Headphones.jpg';
import sneakersImg from '../images/Sneakers.jpg';
import watchImg from '../images/watch.jpg';

// Map your imageUrl fields from MongoDB to imported images
const imageMap = {
  "images/BackPAck.jpg": backPackImg,
  "images/BlackT.jpg": blackTImg,
  "images/Headphones.jpg": headphonesImg,
  "images/Sneakers.jpg": sneakersImg,
  "images/watch.jpg": watchImg
};

function ProductsGrid({ onAdd }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-grid">
      {products.map(p => (
        <div className="product-card" key={p._id}>
          <img 
            src={imageMap[p.imageUrl] || ""} 
            alt={p.name}
            width="120"
            onError={e => { e.target.src = ""; }}
          />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button onClick={() => { addToCart(p._id, 1); onAdd(); }}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductsGrid;

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export async function getProducts() {
  return fetch(`${API_URL}/products`).then(res => res.json());
}

export async function getCart() {
  return fetch(`${API_URL}/cart`).then(res => res.json());
}

export async function addToCart(productId, qty) {
  return fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty })
  }).then(res => res.json());
}

export async function removeFromCart(id) {
  return fetch(`${API_URL}/cart/${id}`, { method: "DELETE" }).then(res => res.json());
}

export async function checkout(cartItems) {
  return fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems })
  }).then(res => res.json());
}

import './App.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";


function App() {

  const [products,setProducts] = useState([]);
  const [currentPage,setCurrentPage] = useState(0);
  const [serachCategory,setSearchCategory] = useState("");
  const [error,setError] = useState(null);

  const productsPerPage = 10;


  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products?skip=0&limit=50");
      setProducts(response.data.products);
    } catch (error) {
      setError("Error fetching products:",error)
    }
  }

  useEffect(() => {
    fetchProducts();
  },[]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const filterdProducts = serachCategory ? products.filter(product => product.category === serachCategory) : products;

  const startIndex = currentPage * productsPerPage;
  const endIndex = Math.min(startIndex  + productsPerPage,filterdProducts.length);

  let paginatedProducts = filterdProducts.slice(startIndex,endIndex);

  const pageCount = Math.ceil(filterdProducts.length / productsPerPage);


  return (
    <>
      <div>products</div>
      {error && <div>Error: {error}</div>}
      <select value={serachCategory} onChange={(e) => setSearchCategory(e.target.value)} style={{cursor:"pointer"}}>
          <option value="">All</option>
          <option value="smartphones">smartphones</option>
          <option value="laptops">laptops</option>
          <option value="fragrances">fragrances</option>
          <option value="skincare">skincare</option>
          <option value="groceries">groceries</option>
          <option value="home-decoration">home-decoration</option>
          <option value="furniture">furniture</option>
          <option value="tops">tops</option>
          <option value="womens-dresses">womens-dresses</option>
          <option value="womens-shoes">womens-shoes</option>
      </select>
      <div style={{display:"flex"}} >
        {paginatedProducts.map(product => (
          <div className='product' key={product.id} style={{cursor:"pointer"}}>
            <img className='image' src={product.images[1]} alt={product.title} />
            <h1>{product.title}</h1>
            <p>$ {product.price}</p>
            <p>{product.description}</p>
            <h1>{product.brand}</h1>
            <p>StokcLeft {product.stock}</p>
            <p>rating {product.rating} / 5</p>
          </div>
        ))}
      </div>
      {paginatedProducts.map((product) => {
        <div key={product.id}>
          {product.images[1]}
        </div>
      })}
      <nav>
      <div className="pagination" style={{ display: "flex" }}>
        {Array.from({length:pageCount},(_,index) => (
          <div key={index} className="page-item">
            <button
              style={{ margin: "20px", cursor: "pointer", padding: "10px" }}
              onClick={() => handlePageChange(index)}
              className="page-link"
            >
              {index + 1}
            </button>
          </div>
        ))}
      </div>
      </nav>
    </>
  );
}

export default App;

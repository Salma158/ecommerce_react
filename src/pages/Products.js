
// import React, { useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProducts, setCurrentPage } from '../store/products/slices/productsSlice';
// import ProductCard from '../components/ProductCard';
// import "./Products.css"

// function Products() {
//   const dispatch = useDispatch();
//   const { products, loading, error, currentPage, totalPages } = useSelector(state => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts(currentPage));
//   }, [dispatch, currentPage]);

 
// const handlePageChange = (newPage) => {
//     dispatch(setCurrentPage(newPage)); 
//     dispatch(fetchProducts(newPage)); 
//   };

//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px', color: '#333' }}>
//         <div className="loading-spinner" style={{ border: '4px solid rgba(0, 0, 0, 0.1)', borderLeftColor: '#333', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <Container>
//         <h1 className='products' style={{ textAlign: 'center', fontFamily: 'Unna, serif' }}>Products</h1>

//         <Row>
//           {products.map((product) => (
//             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//               <ProductCard product={product} />
//             </Col>
//           ))}
//         </Row>
//       </Container>
//       <div className="pagination-container">
//   <button className="pagination-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//     Previous
//   </button>
//   <span>{currentPage} / {totalPages}</span>
//   <button className="pagination-button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
//     Next
//   </button>
// </div>


//     </div>
//   );
// }

// export default Products;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setCurrentPage, searchProducts } from '../store/products/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import "./Products.css"

function Products() {
  const dispatch = useDispatch();
  const { products, loading, error, currentPage, totalPages } = useSelector(state => state.products);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    dispatch(fetchProducts(newPage));
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') {
      dispatch(searchProducts(query));
    } else {
      dispatch(fetchProducts(currentPage));
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Container>
        <h1 className='products' style={{ textAlign: 'center', fontFamily: 'Unna, serif' }}>Products</h1>

        <Form.Group controlId="search" className='searchbar'>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </Form.Group>

        <Row>
          {loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', fontSize: '24px', color: '#333' }}>
            <div className="loading-spinner" style={{ border: '4px solid rgba(0, 0, 0, 0.1)', borderLeftColor: '#333', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
            Loading...
          </div>}
          {!loading && (searchQuery ? (
            products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductCard product={product} />
              </Col>
            ))
          ))}
        </Row>
      </Container>
      <div className="pagination-container">
        <button className="pagination-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button className="pagination-button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;


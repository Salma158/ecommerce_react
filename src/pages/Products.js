import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setCurrentPage,
} from "../store/products/slices/productsSlice";
import ProductCard from "../components/ProductCard";
import "./Products.css";
import LoadingSpinner from "./../components/LoadingSpinner"

function Products() {
  const dispatch = useDispatch();
  const { products, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    dispatch(fetchProducts(newPage));
  };

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Container>
        <h1
          className="products"
          style={{ textAlign: "center", fontFamily: "Unna, serif" }}
        >
          Products
        </h1>

        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;

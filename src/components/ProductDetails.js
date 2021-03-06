import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Tabs, Tab } from 'react-bootstrap';
import styled from 'styled-components';
import config from '../config/system';
import {CartBtn} from './cart/CartBtn'
import { getSingleProduct } from '../store/actions';
import { Loading } from './alerts/loading';
import { ErrorAlert } from './alerts/errorAlert';
import ReviewFrom from './ReviewForm';

const Details = styled(Container)`
  margin-top: 7vmax;
`;
const Actions = styled(Container)`
  margin: 5vmin 0;
`;
const WishList = styled(Button)`
  margin: 10px 0;
`;
const Rdiv = styled.div`
  font-size: 10px;
  margin: 25px 0;
  border: 1px solid #f5f5f5;
  padding: 10px;
  p {
    color: grey;
    margin: auto;
  }
`;

const ProductDetails = ({ getSingleProduct, product }) => {
  let { data, error, isLoading } = product.item;
  const { id } = useParams();
  useEffect(() => {
    getSingleProduct({
      type: 'products',
      id
    });
  }, []);

  const state = error ? <ErrorAlert /> : isLoading || !data.filename ? <Loading /> : null;
  return (
    state || (
      <Details>
        <Row>
          <Col sm={6} md={4}>
            <Image src={`${config.imageBaseUrl}/${data.filename}`} thumbnail />
          </Col>
          <Col sm={6} md={8}>
            <div>{data.description}</div>
            <Actions>
              <Row>
                <Col sm={6} md={4}>
                  <Tabs defaultActiveKey="reviews" id="review-tab" style={{ fontSize: '10px' }}>
                    <Tab eventKey="reviews" title="Reviews">
                      {data.reviews.length ? (
                        data.reviews.map((e) => (
                          <Rdiv key={e._id}>
                            <span>{new Date(e.date).toDateString()}</span>
                            <div>{e.writer}</div>
                            <p>{e.body}</p>
                          </Rdiv>
                        ))
                      ) : (
                        <div>No reviews yet</div>
                      )}
                    </Tab>
                    <Tab eventKey="write-review" title="Write">
                      <ReviewFrom id={id} type="products" />
                    </Tab>
                  </Tabs>
                </Col>
                <Col sm={6} md={4}>
                  <WishList variant="outline-info" size="sm">
                    Wishlist
                  </WishList>
                </Col>
                <Col sm={6} md={4}>
                  <CartBtn item={data}>Add to cart</CartBtn>
                </Col>
              </Row>
            </Actions>
          </Col>
        </Row>
      </Details>
    )
  );
};

ProductDetails.propTypes = {
  getSingleProduct: PropTypes.func,
  product: PropTypes.object
};
const mapStateToProps = ({ product }) => {
  return {
    product
  };
};
const mapDispatchToProp = {
  getSingleProduct
};
export default connect(mapStateToProps, mapDispatchToProp)(ProductDetails);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CardColumns, Button } from 'react-bootstrap';
import { Product } from './Product';
import { Loading } from '../../../../components/alerts/loading';
import { ErrorAlert } from '../../../../components/alerts/errorAlert';
import { getCategoryProducts } from '../../../../store/actions';

const Deck = styled(CardColumns)`
  margin: 20px auto;
  margin-left: 20px;
  padding: 0px !important;
  width: 100%;
  @media (max-width: 910px) {
    margin: auto !important;
  }
`;
const LightHeading = styled.h2`
  background-color: #ffaf30;
  height: 3px;
  margin-top: 50px;
  text-align: center;
`;
const Category = styled.div`
  box-shadow: 2px 2px 48px 48px #eee;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
`;
const Btn = styled(Button)`
float: right;
`
const H = styled.h3`
float: left;
text-transform: capitalize;
`

function Config(id, name) {
  const Comp = ({ getCategoryProducts, products }) => {
    useEffect(() => {
      getCategoryProducts({
        type: 'products',
        categoryId: id,
        limit: 3,
        name
      });
    }, []);

    let { data, error, isLoading } = products[name];

    const state = error ? <ErrorAlert /> : isLoading ? <Loading /> : null;
    return (
      state || (
        <Category>
            <H>{name}</H>
            <Btn variant=" outlined primary" size='sm'>view all</Btn>
          <LightHeading></LightHeading>
          <Deck>
            {data.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </Deck>
        </Category>
      )
    );
  };

  Comp.propTypes = {
    getCategoryProducts: PropTypes.func,
    products: PropTypes.object
  };
  const mapStateToProps = ({ products }) => {
    return {
      products
    };
  };
  const mapDispatchToProp = {
    getCategoryProducts
  };
  const exp = connect(mapStateToProps, mapDispatchToProp)(Comp);
  return exp;
}
export default Config;

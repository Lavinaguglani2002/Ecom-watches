import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  // Load more products when the page changes
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page > 1) loadMore();
  }, [page]);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('https://ecom-watches-3.onrender.com/api/v1/product/product-filters', {
        checked,
        radio,
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'All Products - Best Offers'}>
      <div className='row mt-3'>
        <div className='col-md-3 filter-section'>
          <h4 className='text-center'>Filter by Category</h4>
          <div className='d-flex flex-column'>
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className='text-center m-4'>Filter by Price</h4>
          <div className='d-flex flex-column'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <button className='btn btn-danger reset-button' onClick={() => window.location.reload()}>RESET FILTER</button>
        </div>
        <div className='col-md-9'>
          <h1>All Products</h1>
          <div className='products-container'>
            {products?.map((p) => (
              <div className='card m-2' key={p._id}>
                <img
                  src={`https://ecom-watches-3.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className='card-img-top'
                  alt={p.name}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{p.name}</h5>
                  <p className='card-text'>{p.description.substring(0, 50)}...</p>
                  <p className='card-text'>$ {p.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className='btn btn-secondary ms-2'
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem('cart', JSON.stringify([...cart, p]));
                      toast.success('Item Added to cart');
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button
                className='btn btn-warning'
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Loading ...' : 'Load More'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

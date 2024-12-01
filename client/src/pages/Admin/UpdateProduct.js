import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`);
        console.log(data); // Log to check data structure

        if (data?.product) {
          setName(data.product.name);
          setId(data.product._id);
          setDescription(data.product.description);
          setPrice(data.product.price);
          setQuantity(data.product.quantity);
          setCategory(data.product.category?._id || "");
          setShipping(data.product.shipping ? "1" : "0");
        }
      } catch (error) {
        console.log(error);
        toast.error('Error fetching product details');
      }
    };

    getSingleProduct();
  }, [params.slug]);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong in getting categories');
      }
    };

    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      if (photo) {
        productData.append("photo", photo);
      }
  
      const { data } = await axios.put(`http://localhost:8080/api/v1/product/update-product/${id}`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (data.success) {
        toast.success('Product updated successfully');
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || 'Update failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this product?");
      if (!answer) return;
      
      const { data } = await axios.delete(`http://localhost:8080/api/v1/product/product/${id}`);
      if (data.success) {
        toast.success('Product deleted successfully');
        navigate("/dashboard/admin/products");
      } else {
        toast.error('Deletion failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title={'Dashboard - Update Product'}>
      <div className="container-fluid m-3 p-3">
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Update Product</h1>
            <div className='m-1 w-75'>
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className='form-select mb-3'
                onChange={(values) => setCategory(values)}
                values={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
              <div className='mb-3'>
                <label htmlFor="photo-upload" className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : "Upload Photo"}
                </label>
                <input
                  type="file"
                  id="photo-upload"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
              <div className='mb-3'>
                {photo ? (
                  <div className='text-center'>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={'200px'}
                      className='img img-responsive'
                    />
                  </div>
                ) : (
                  <div className='text-center'>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={'200px'}
                      className='img img-responsive'
                    />
                  </div>
                )}
              </div>
              <div className='mb-3'>
                <input
                  type="text"
                  value={name}
                  placeholder='Write a name'
                  className='form-control'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input
                  type="text"
                  value={description}
                  placeholder='Write a description'
                  className='form-control'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input
                  type="text"
                  value={price}
                  placeholder='Write a price'
                  className='form-control'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input
                  type="text"
                  value={quantity}
                  placeholder='Write a quantity'
                  className='form-control'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <Select
                  bordered={false}
                  placeholder="Select shipping"
                  size="large"
                  showSearch
                  className='form-select mb-3'
                  onChange={(value) => setShipping(value)}
                  value={shipping}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className='mb-3'>
                <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>
              </div>
              <div className='mb-3'>
                <button className='btn btn-danger' onClick={handleDelete}>DELETE PRODUCT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

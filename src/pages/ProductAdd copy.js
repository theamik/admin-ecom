import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import { toast } from "react-toastify";
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { Select } from "antd";
import Dropzone from 'react-dropzone'
import { getColors } from '../features/color/colorSlice';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts, resetState } from '../features/product/productSlice';



let schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().required('Price is required'),
    brand: yup.string().required('Brand is required'),
    category: yup.string().required('Category is required'),
    tags: yup.string().required("Tag is Required"),
    // color: yup
    //     .array()
    //     .min(1, "Pick at least one color")
    //     .required("Color is Required"),
    quantity: yup.number().required('Quantity is required'),
});

const ProductAdd = () => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            brand: '',
            category: '',
            tags: '',
            color: '',
            quantity: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createProducts(values));
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        },
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
        dispatch(getColors())
    }, [dispatch])
    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;
    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, createdProduct, isError, isLoading]);

    const coloropt = [];
    colorState.forEach((i) => {
        coloropt.push({
            label: i.title,
            value: i._id,
        });
    });
    const [color, setColor] = useState([]);
    const handleColors = (e) => {
        setColor(e);
    };

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });
    console.log(img);
    useEffect(() => {
        formik.values.color = color ? color : " ";
        formik.values.images = img;
    }, []);
    return (
        <div >
            <h3 className="mb-4">Add Product</h3>
            <form action="" onSubmit={formik.handleSubmit} >
                <div >
                    <CustomInput
                        type="text"
                        label="Enter Product Title"
                        name="title"
                        i_id="title"
                        val={formik.values.title}
                        onCh={formik.handleChange('title')}

                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title ? (
                            <div>{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <ReactQuill
                        className='mt-3 mb-3'
                        theme="snow"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange('description')}
                    />

                    <div className="error">
                        {formik.touched.description && formik.errors.description ? (
                            <div>{formik.errors.description}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        i_id="price"
                        val={formik.values.price}
                        onCh={formik.handleChange('price')}
                    />

                    <div className="error">
                        {formik.touched.price && formik.errors.price ? (
                            <div>{formik.errors.price}</div>
                        ) : null}
                    </div>
                    <select
                        name="brand"
                        id="brand"
                        value={formik.values.brand}
                        onChange={formik.handleChange('brand')}
                        onBlur={formik.handleBlur('brand')}
                        className='form-control py-3 mt-3 mb-3'>
                        <option value="">Select Brand</option>

                        {brandState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>{i.title}</option>
                            )
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.brand && formik.errors.brand ? (
                            <div>{formik.errors.brand}</div>
                        ) : null}
                    </div>
                    <select
                        name="category"
                        id="category"
                        value={formik.values.category}
                        onChange={formik.handleChange('category')}
                        onBlur={formik.handleBlur('category')}
                        className='form-control py-3 mt-3 mb-3'>
                        <option value="">Select Category</option>

                        {catState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>{i.title}</option>
                            )
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.category && formik.errors.category ? (
                            <div>{formik.errors.category}</div>
                        ) : null}
                    </div>
                    <select
                        name="tags"
                        id="tags"
                        value={formik.values.tags}
                        onChange={formik.handleChange('tags')}
                        onBlur={formik.handleBlur('tags')}
                        className='form-control py-3 mt-3 mb-3'>
                        <option value="" disabled>Select Tags</option>
                        <option value="featured">Featured</option>
                        <option value="popular">Popular</option>
                        <option value="special">Special</option>
                    </select>
                    <div className="error">
                        {formik.touched.tags && formik.errors.tags ? (
                            <div>{formik.errors.tags}</div>
                        ) : null}
                    </div>
                    <Select
                        mode="multiple"
                        allowClear
                        className="form-control py-3 mt-3 mb-3"
                        placeholder="Select Colors"
                        defaultValue=''
                        onChange={(i) => handleColors(i)}
                        options={coloropt}
                    />
                    <div className="error">
                        {formik.touched.color && formik.errors.color ? (
                            <div>{formik.errors.color}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Quantity"
                        name="quantity"
                        i_id="quantity"
                        val={formik.values.quantity}
                        onCh={formik.handleChange('quantity')}
                    />
                    <div className="error">
                        {formik.touched.quantity && formik.errors.quantity ? (
                            <div>{formik.errors.quantity}</div>
                        ) : null}
                    </div>
                    <div className="bg-white border-1 p-5 text-center mt-3 mb-3">
                        <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => {
                            return (
                                <div className=" position-relative" key={j}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(delImg(i.public_id))}
                                        className="btn-close position-absolute"
                                        style={{ top: "10px", right: "10px" }}
                                    ></button>
                                    <img src={i.url} alt="" width={200} height={200} />
                                </div>
                            );
                        })}
                    </div>


                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    )
}


export default ProductAdd
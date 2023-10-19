import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/cutomers/customerSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';
import pCategoryReducer from '../features/pcategory/pcategorySlice';
import colorReducer from '../features/color/colorSlice';
import blogReducer from '../features/blogs/blogSlice';
import blogCatReducer from '../features/bcategory/bcategorySlice';
import enquiryReducer from '../features/enquiry/enquirySlice';
import uploadReducer from '../features/upload/uploadSlice';
import couponReducer from '../features/coupon/couponSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        customers: customerReducer,
        product: productReducer,
        brand: brandReducer,
        pCategory: pCategoryReducer,
        color: colorReducer,
        blog: blogReducer,
        bCategory: blogCatReducer,
        enquiry: enquiryReducer,
        upload: uploadReducer,
        coupon: couponReducer,
    },
});
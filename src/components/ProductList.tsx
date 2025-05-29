import React, { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../services/productService';

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [formProduct, setFormProduct] = useState<Product>({ name: '', price: 0 });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        try {
            if (editingId !== null) {
                const updatedProduct = await updateProduct(editingId, formProduct);
                setProducts((prev) =>
                    prev.map((p) => (p.id === editingId ? updatedProduct : p))
                );
            } else {
                const newProduct = await createProduct(formProduct);
                setProducts((prev) => [...prev, newProduct]);
            }
            resetForm();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (product: Product) => {
        setFormProduct({ name: product.name, price: product.price });
        setEditingId(product.id!);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
            if (editingId === id) resetForm();
        } catch (error) {
            console.error(error);
        }
    };

    const resetForm = () => {
        setFormProduct({ name: '', price: 0 });
        setEditingId(null);
    };

    return (
        <div className="container mt-4">
            <h3>Products</h3>

            {/* Form */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={formProduct.name}
                                onChange={(e) =>
                                    setFormProduct({ ...formProduct, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Price"
                                value={formProduct.price}
                                onChange={(e) =>
                                    setFormProduct({ ...formProduct, price: Number(e.target.value) })
                                }
                            />
                        </div>
                        <div className="col-md-2">
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                {editingId !== null ? 'Update' : 'Submit'}
                            </button>
                        </div>
                        {editingId !== null && (
                            <div className="col-md-2">
                                <button className="btn btn-secondary w-100" onClick={resetForm}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product List */}
            <ul className="list-group">
                {products.map((product) => (
                    <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            {product.name} - ${product.price}
                        </div>
                        <div>
                            <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEdit(product)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this product?")) {
                                        handleDelete(product.id!);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;

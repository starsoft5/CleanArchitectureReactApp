// services/productService.ts
import type { Product } from '../types/Product';

const API_URL = 'http://localhost:50848/api/product'; // Change based on your backend

export const getAllProducts = async (): Promise<Product[]> => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
};

export const getProductById = async (id: number): Promise<Product> => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Product with id ${id} not found`);
    return await res.json();
};

export const createProduct = async (product: Product): Promise<Product> => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return await res.json();
};

export const updateProduct = async (id: number, product: Product): Promise<Product> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!res.ok) {
        const errorDetails = await res.text(); // or res.json() if API returns structured error
        throw new Error(`Failed to update product: ${res.status} ${res.statusText} - ${errorDetails}`);
    }
    return await res.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
};

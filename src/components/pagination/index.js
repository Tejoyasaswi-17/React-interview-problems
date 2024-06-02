import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import ProductCard from './components/ProductCard';

function Pagination() {
    const [products, setProducts] = useState({});
    const [page, setPage] = useState(1);
    const pageLimit = 20;
    const totalPages = Math.ceil(products.total / pageLimit) || 0;
    const endPoint = 'https://dummyjson.com/products';

    const fetchProducts = async () => {
        const apiData = await fetch(`${endPoint}?limit=${pageLimit}&skip=${(page - 1) * pageLimit}`);
        const jsonData = await apiData.json();
        if (jsonData && jsonData.products) {
            setProducts(jsonData);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page]);

    return (
        <div>
            <h1>EFPKart</h1>
            {products.products?.length > 0 && (
                <div className={styles.products}>
                    {products.products?.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            )}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    {page > 1 && <button onClick={() => setPage(prev => prev - 1)}>🔙</button>}
                    {Array(totalPages).fill(0).map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setPage(index + 1)}
                            className={page === index + 1 ? styles.active_page : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {page < totalPages && <button onClick={() => setPage(prev => prev + 1)}>🔜</button>}
                </div>
            )}
        </div>
    );
}

export default Pagination;
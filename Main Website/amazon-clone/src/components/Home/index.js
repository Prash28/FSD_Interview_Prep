import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/getProducts')
        .then(product => setProducts(product.data))
        .then(console.log(products))
        .catch((err) => console.log(err))
    }, [])
    return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Category
                    </th>
                </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        <tr>
                            <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        </tr>
                    })}
                </tbody>
        </table>
    </div>
  )
}

export default Home
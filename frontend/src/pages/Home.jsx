import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import tablestyle from "../css/tablestyle.module.css";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get('https://library-production-8c6a.up.railway.app/books')
            .then(response => {
                setBooks(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    return (
        <div className={ tablestyle.body }>
            <h1>Books List</h1>
            <Link to='/books/create'>
                
            </Link>

            {loading ? (
                <div></div>
            ) : (
                <table className={`${tablestyle.table}`}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publish Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={ book._id }>
                                <td>{ index + 1 }</td>
                                <td>{ book.title }</td>
                                <td>{ book.author }</td>
                                <td>{ book.publishYear }</td>
                                <td className={ tablestyle.operationsColumn }>
                                    <Link to={`/books/details/${book._id}`} target="_blank">
                                        Info
                                    </Link>
                                    <Link to={`/books/edit/${book._id}`} target="_blank">
                                        Edit
                                    </Link>
                                    <Link to={`/books/delete/${book._id}`} target="_blank">
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        
    )
}

export default Home;

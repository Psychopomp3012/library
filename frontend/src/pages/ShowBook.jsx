import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8081/books/${id}`)
            .then((response) => {
                setBook(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            <BackButton />
            <h1>Show Book</h1>
            {loading ? (      
                <></>
            ) : (
              <>
                <div>
                    <span>Id</span>
                    <span>{ book._id }</span>
                </div>
                <div>
                    <span>Title</span>
                    <span>{ book.title }</span>
                </div>
                <div>
                    <span>Author</span>
                    <span>{ book.author }</span>
                </div>
                <div>
                    <span>Publish Year</span>
                    <span>{ book.publishYear }</span>
                </div>
                <div>
                    <span>Create Time</span>
                    <span>{ new Date(book.createdAt).toString() }</span>
                </div>
                <div>
                    <span>Last Update Time</span>
                    <span>{ new Date(book.updatedAt).toString() }</span>
                </div>
              </>
              
            )}
        </div> 
    )
}

export default ShowBook;
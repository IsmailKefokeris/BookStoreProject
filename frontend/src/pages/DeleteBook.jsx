import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';

//DeleteBook
const DeleteBook = () => {
  const [responseMessage, setResponse] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const serverURL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";


  useEffect(() => {
    setLoading(true);
    axios
      .delete(`${serverURL}/books/${id}`)
      .then((response) => {
        setResponse(response.data.message);
        alert(response.data.message);
        setLoading(false);
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, []);
  return (
    <h1>Delete Book</h1>
  );
}

export default DeleteBook
import api from "../../services/api";
import { useState, useEffect } from "react";

const List = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/client/");

        const data = response.data;

        setClients(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>List</h1>
      <p>
        {clients.map((client, index) => (
          <ul>
            <li key={index}>{client.id}</li>
            <li key={index}>{client.email}</li>
          </ul>
        ))}
      </p>
    </div>
  );
};

export default List;

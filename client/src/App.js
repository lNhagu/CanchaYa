import axios from 'axios';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleApellidoChange = (e) => {
    setApellido(e.target.value);
  };

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  const handleRegistrarClick = () => {
    axios.post('http://localhost:8000/api/usuarios/', {
      // {
      //   "id": 0,
      //   "nombre": "juan",
      //   "apellido": "carlos",
      //   "tipo": "u",
      //   "estado": 1,
      //   "nombreUsuario": "juanca123",
      //   "pass": "juanca123"
      // }
      id: 0,
      nombre: nombre,
      apellido: apellido,
      tipo: 'u',
      estado: 1,
      
      //telefono: telefono
    }).then (() => {
      alert('Usuario registrado');
    })
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" value={nombre} onChange={handleNombreChange} />
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" value={apellido} onChange={handleApellidoChange} />
      </div>
      <div>
        <label htmlFor="telefono">Teléfono:</label>
        <input type="text" id="telefono" value={telefono} onChange={handleTelefonoChange} />
      </div>
      {/* <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary">Usuario</button>
        <button type="button" class="btn btn-secondary">Administrador</button>
      </div> */}
      <button onClick={handleRegistrarClick}>Registrar</button>
    </div>
    
  );
}


export default App;

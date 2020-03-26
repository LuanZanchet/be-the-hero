import React, {useEffect, useState} from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  const ongName = localStorage.getItem('ongName');
  const [incidents, setIncidents] = useState([]);
  useEffect(()=>{
    api.get('profile',{
      headers:{
        Authorization: ongId
      }
    }).then(response =>{
      setIncidents(response.data);
    });
  },[ongId]);

  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`,{
        headers:{
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
      
    }catch(e){
      alert("Erro ao deletar caso, tente novamente");
    }
  }

  function handleLogout(){
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header> 
      <img src={logoImg} alt="Be the Hero"/>
  <span>Bem vindo, {ongName}</span>
      <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
      <button type="button">
        <FiPower size={18} color="#e02041" onClick={handleLogout} />
      </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident =>(
           <li key={incident.id}>
            <strong> Caso:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÂO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p> {Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'  }).format(incident.value)}</p>
            <button type="button" onClick={() => handleDeleteIncident(incident.id)}> 
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
           </li>
        ))}       
     
      </ul>
    </div>
  );
}

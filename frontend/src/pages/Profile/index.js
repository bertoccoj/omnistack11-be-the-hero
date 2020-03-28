import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
  const [incidents, setincidents] = useState([]);

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then((response) => {
      setincidents(response.data.incidents);
    });
  }, [ongId]);

  async function handleDeleteincident(id) {
    try {
      const response = await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      console.log(response);

      setincidents(incidents.filter((incident) => incident.id !== id));

    } catch (error) {
      alert('Erro ao deletar o caso selecionado', error);
    }
  }

  async function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, <b>{ongName}</b></span>

        <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {
          incidents && incidents.length
            ? incidents.map(({id, title, description, value}) => (
              <li key={id}>
                <strong>CASO:</strong>
                <p>{title}</p>

                <strong>DESCRIÇÃO:</strong>
                <p>{description}</p>

                <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value) }</p>

                <button type="button" onClick={() => handleDeleteincident(id)}>
                  <FiTrash2 size={20} color="A8A8B3"/>
                </button>
              </li>
              ))
            : (<h1>Você não cadastrou nenhum caso</h1>)
        }
      </ul>
    </div>
  );
}

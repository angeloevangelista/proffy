import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = ({ children }) => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars0.githubusercontent.com/u/48136118?s=460&u=6101d27e8851db314005129fbd5ff2a4a7996880&v=4"
          alt="Angelo Evangelista"
        />
        <div>
          <strong>Angelo Evangelista</strong>
          <span>Matemática</span>
        </div>
      </header>

      <p>
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
        <br />
        <br />
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Entrar em contato" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;

import React from 'react';

import warningIcon from '../../assets/images/icons/warning.svg';

import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import PageHeader from '../../components/PageHeader';

import './styles.css';

export default function TeacherForm() {
  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <fieldset>
          <legend>Seus dados</legend>
          <Input id="name" name="name" label="Nome Completo" />
          <Input id="avatar" name="avatar" label="Avatar" />
          <Input id="whatsapp" name="whatsapp" label="WhatsApp" />
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>

          <Select
            id="subject"
            name="subject"
            label="Matéria"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Física', label: 'Física' },
              { value: 'Química', label: 'Química' },
              { value: 'Português', label: 'Português' },
            ]}
          />
          <Input id="cost" name="cost" label="Custo da sua hora por aula" />
          <Input id="whatsapp" name="whatsapp" label="WhatsApp" />
          <TextArea id="bio" name="bio" label="Biografia" />
        </fieldset>

        <fieldset>
          <legend>
            Horários disponiveis
            <button type="button">+ Novo horário</button>
          </legend>

          <div className="schedule-item">
            <Select
              id="week-day"
              name="week-day"
              label="Dia da semana"
              options={[
                { value: '0', label: 'Domingo' },
                { value: '1', label: 'Segunda-feira' },
                { value: '2', label: 'Terça-feira' },
                { value: '3', label: 'Quarta-feira' },
                { value: '4', label: 'Quinta-feira' },
                { value: '5', label: 'Sexta-feira' },
                { value: '6', label: 'Sábado' },
              ]}
            />
            <Input id="from" name="from" label="Das" type="time" />
            <Input id="to" name="to" label="Até" type="time" />
          </div>
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
          <button type="button">Salvar cadastro</button>
        </footer>
      </main>
    </div>
  );
}

import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import Input from '../../components/Input';
import Select from '../../components/Select';
import TextArea from '../../components/TextArea';
import PageHeader from '../../components/PageHeader';

import './styles.css';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default function TeacherForm() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [bio, setBio] = useState('');
  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState<Array<ScheduleItem>>([
    { week_day: 1, from: '', to: '' },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: '',
        to: '',
      },
    ]);
  }

  async function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    try {
      const formData = {
        name,
        avatar,
        whatsapp,
        subject,
        cost: Number(cost),
        bio,
        schedule: scheduleItems,
      };

      await api.post('classes', formData);

      alert('Cadastro realizado com sucesso');

      history.push('/');
    } catch (error) {
      alert('Erro a cadastrar');

      if (error.response) {
        console.log(error.response);
      }
    }
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      return position === index
        ? { ...scheduleItem, [field]: value }
        : scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              id="name"
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              id="avatar"
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              id="whatsapp"
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              id="subject"
              name="subject"
              label="Matéria"
              defaultValue={subject}
              onChange={(e) => setSubject(e.target.value)}
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
            <Input
              id="cost"
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <TextArea
              id="bio"
              name="bio"
              label="Biografia"
              defaultValue={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponiveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  id="week_day"
                  name="week_day"
                  label="Dia da semana"
                  defaultValue={scheduleItem.week_day}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'week_day', e.target.value)
                  }
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
                <Input
                  id="from"
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'from', e.target.value)
                  }
                />
                <Input
                  id="to"
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e) =>
                    setScheduleItemValue(index, 'to', e.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

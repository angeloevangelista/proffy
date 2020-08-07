import React, { useState, FormEvent } from 'react';

import Input from '../../components/Input';
import Select from '../../components/Select';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import './styles.css';

import api from '../../services/api';

export default function TeacherList() {
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  async function searchTeacher(e: FormEvent) {
    e.preventDefault();

    try {
      if (!subject || !week_day || !time)
        return alert('Preencha todos os campos');

      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });

      setTeachers(response.data);
    } catch (error) {
      alert('Houve um erro durante a busca');
    }
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Esses são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeacher}>
          <Select
            id="subject"
            name="subject"
            label="Matéria"
            defaultValue={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
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
          <Select
            id="week_day"
            name="week_day"
            label="Dia da semana"
            defaultValue={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
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
            id="time"
            label="Hora"
            name="time"
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher) => (
          <TeacherItem key={String(teacher.id)} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}

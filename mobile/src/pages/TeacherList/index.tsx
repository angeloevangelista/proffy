import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { View, ScrollView, Text, TextInput, ToastAndroid } from 'react-native';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

import weekDays from '../../util/WeekDays.json';

const TeacherList: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState(1);
  const [time, setTime] = useState('');

  async function loadFavorites() {
    const storedFavorites =
      (await AsyncStorage.getItem('@proffy/favorites')) || '';

    setFavorites(JSON.parse(storedFavorites));
  }

  function handleToggleFiltersVisibility() {
    setShowFilters(!showFilters);
  }

  async function handleFiltersSubmit() {
    if (!subject || !week_day || !time) {
      return ToastAndroid.show('Forneça todas as informações necessárias', 5);
    }

    try {
      const response = await api.get<Teacher[]>('classes', {
        params: {
          subject,
          week_day,
          time,
        },
      });

      loadFavorites();
      setTeachers(response.data);
      setShowFilters(false);
    } catch (error) {
      ToastAndroid.show('Houve uma falha no servidor', 5);
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        rightContent={
          <BorderlessButton onPress={handleToggleFiltersVisibility}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {showFilters && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={(value) => setSubject(value)}
              returnKeyType="next"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <View style={styles.input}>
                  <Picker
                    selectedValue={week_day}
                    onValueChange={(value) => setWeekDay(Number(value))}
                  >
                    {weekDays.map((day) => (
                      <Picker.Item
                        key={String(day.id)}
                        label={day.name}
                        value={day.id}
                      />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={(value) => setTime(value)}
                />
              </View>
            </View>

            <RectButton
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher) => (
          <TeacherItem
            key={String(teacher.id)}
            teacher={teacher}
            favorited={
              favorites.findIndex(
                (favoritedTeacher) => favoritedTeacher.id === teacher.id
              ) !== -1
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;

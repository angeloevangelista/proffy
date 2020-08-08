import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { View, ScrollView, Text, TextInput } from 'react-native';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import styles from './styles';

import weekDays from '../../util/WeekDays.json';

const TeacherList: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);

  function handleToggleFiltersVisibility() {
    setShowFilters(!showFilters);
  }

  function handleSubmit() {}

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
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <View style={styles.input}>
                  <Picker
                    selectedValue={weekDays[0].id}
                    onValueChange={() => {}}
                  >
                    {weekDays.map((day) => (
                      <Picker.Item
                        key={String(day.id)}
                        label={day.name}
                        value={day.name}
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
                />
              </View>
            </View>

            <RectButton onPress={handleSubmit} style={styles.submitButton}>
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
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </ScrollView>
    </View>
  );
};

export default TeacherList;

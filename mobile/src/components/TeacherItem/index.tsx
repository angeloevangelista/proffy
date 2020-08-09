import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import formatToBRL from '../../util/formatToBRL';

import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';

import styles from './styles';

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsfavorited] = useState(favorited);

  function handleLinkToWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=+55${teacher.whatsapp}`);
  }

  async function handleToggleFavorite() {
    const storedFavorites = await AsyncStorage.getItem('@proffy/favorites');

    if (isFavorited) {
      const serializedFavorites: Teacher[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      await AsyncStorage.setItem(
        '@proffy/favorites',
        JSON.stringify(
          serializedFavorites.filter(
            (storedTeacher) => storedTeacher.id !== teacher.id
          )
        )
      );
    } else {
      const serializedFavorites: Teacher[] = storedFavorites
        ? [...JSON.parse(storedFavorites), teacher]
        : [teacher];

      await AsyncStorage.setItem(
        '@proffy/favorites',
        JSON.stringify(serializedFavorites)
      );
    }

    setIsfavorited(!isFavorited);
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/Hora {'   '}
          <Text style={styles.priceValue}>{formatToBRL(teacher.cost)}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[styles.favoriteButton, isFavorited && styles.favorited]}
          >
            {isFavorited ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            onPress={handleLinkToWhatsapp}
            style={styles.contactButton}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;

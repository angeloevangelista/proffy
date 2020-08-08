import React from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

import styles from './styles';

interface PageHeaderProps {
  title: string;
  rightContent?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  rightContent,
  children,
}) => {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate('Landing');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={logoImg} resizeMode="contain" />
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {rightContent}
      </View>

      {children}
    </View>
  );
};

export default PageHeader;

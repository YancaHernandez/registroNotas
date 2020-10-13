import React from 'react';
import {Button} from 'react-native-paper';

const BarraSuperior = ({navigation, route}) => {
  const handlePress = () => {
    navigation.navigate('NuevaMateria');
  };

  return (
    <Button icon="plus-circle" color="#FFF" onPress={() => handlePress()}>
      Materia
    </Button>
  );
};

export default BarraSuperior;

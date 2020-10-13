import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

import globalContext from '../context/globalContext';

const NuevoCliente = () => {
  const navegation = useNavigation();
  const {agregarMateria} = useContext(globalContext);

  const [materia, guardarMateria] = useState('');
  const [alerta, guardarAlerta] = useState(false);

  const submit = async () => {
    if (materia.trim() == '') {
      guardarAlerta(true);
    } else {
      await agregarMateria(materia);
      navegation.navigate('Inicio');
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir nueva Materia</Headline>

      <TextInput
        label="Nombre materia"
        placeholder="Ej: Matematica"
        onChangeText={(texto) => guardarMateria(texto)}
        value={materia}
        style={styles.input}
      />
      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => submit()}
        // style={globalStyles.boton}
        // rounded
        // block
        // disabled={materia == ''}
      >
        Guardar
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nombre materia"
              placeholder="Ej: Matematica"
              onChangeText={(texto) => guardarMateria(texto)}
              value={materia}
              style={styles.input}
            />
            <Paragraph>Escriba el nombre de la materia</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => guardarAlerta(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoCliente;

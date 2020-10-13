import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {
  Text,
  Headline,
  List,
  Button,
  Colors,
  TextInput,
  Paragraph,
  Dialog,
  Portal,
  Snackbar,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import globalStyles from '../styles/global';
import globalContext from '../context/globalContext';

const ConfigurarMaterias = ({route}) => {
  const {id} = route.params.item;

  const navegation = useNavigation();
  const {obtenerMateria, editarMateria} = useContext(globalContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [materia, setMateria] = useState(null);
  const [actividad, setActividad] = useState({
    nombre: '',
    porcentaje: null,
  });
  const [corteARegistrar, setCorteARegistrar] = useState('');
  const [porcentajeTotalCorte, setPorcentajeTotalCorte] = useState({
    corte1: 0,
    corte2: 0,
    corte3: 0,
  });
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const consultarMateria = async () => {
      const consulta = await obtenerMateria(id);
      setMateria(consulta);
      obtenerPorcentajeTotalCorte();
    };
    consultarMateria();
  }, [materia]);

  const obtenerPorcentajeTotalCorte = () => {
    if (materia != null) {
      console.log(materia.corte1);

      let sumaPorcentajeCorte1 = 0;
      if (materia.corte1.length > 0) {
        // console.log(materia.corte1.length);

        sumaPorcentajeCorte1 = materia.corte1.reduce(
          (accumulator, currentValue) => {
            let sumatoria = accumulator.porcentaje + currentValue.porcentaje;

            console.log(accumulator.porcentaje);
            console.log(currentValue.porcentaje);
            return sumatoria;
          },
        );
      }

      // let sumaPorcentajeCorte2 = 0;
      // if (materia.corte2.length > 0) {
      //   sumaPorcentajeCorte2 = materia.corte2.reduce(
      //     (accumulator, currentValue) => {
      //       let sumatoria = accumulator.porcentaje + currentValue.porcentaje;
      //       return sumatoria;
      //     },
      //   );
      // }

      // let sumaPorcentajeCorte3 = 0;
      // if (materia.corte3.length > 0) {
      //   sumaPorcentajeCorte3 = materia.corte3.reduce(
      //     (accumulator, currentValue) => {
      //       let sumatoria = accumulator.porcentaje + currentValue.porcentaje;
      //       return sumatoria;
      //     },
      //   );
      // }

      // console.log(sumaPorcentajeCorte1);
      // console.log(sumaPorcentajeCorte2);
      // console.log(sumaPorcentajeCorte3);

      setPorcentajeTotalCorte({
        ...porcentajeTotalCorte,
        corte1: sumaPorcentajeCorte1,
        // corte2: sumaPorcentajeCorte2,
        // corte3: sumaPorcentajeCorte3,
      });
      // console.log(porcentajeTotalCorte);
    }
  };

  const guardarActividad = () => {
    if (actividad.nombre.trim() == '') {
      setError('Escriba el nombre de la actividad');
      setSnackbarVisible(true);
    } else if (actividad.porcentaje == null) {
      setError('Escriba el porcentaje de la actividad');
      setSnackbarVisible(true);
    } else {
      switch (corteARegistrar) {
        case 'corte1':
          editarMateria(materia.corte1.push(actividad));
          break;
        case 'corte2':
          editarMateria(materia.corte2.push(actividad));
          break;
        case 'corte3':
          editarMateria(materia.corte3.push(actividad));
          break;

        default:
          break;
      }

      console.log(materia);
      setModalVisible(false);

      setActividad({nombre: '', porcentaje: null});
    }
  };

  const registrarActividad = (corte) => {
    setCorteARegistrar(corte);
    setModalVisible(true);
  };

  if (materia == null) return null;
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{materia.nombre}</Headline>
      <View style={styles.botonesCorte}>
        <Button
          mode="outlined"
          icon="plus-circle"
          color={Colors.blue500}
          onPress={() => registrarActividad('corte1')}>
          Corte 1
        </Button>
        <Button
          mode="outlined"
          icon="plus-circle"
          color={Colors.blue500}
          onPress={() => registrarActividad('corte2')}>
          Corte 2
        </Button>
        <Button
          mode="outlined"
          icon="plus-circle"
          color={Colors.blue500}
          onPress={() => registrarActividad('corte3')}>
          Corte 3
        </Button>
      </View>

      <Portal>
        <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <Dialog.Title>Registrar actividad ({corteARegistrar})</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Nombre"
              placeholder="Ej: Taller"
              onChangeText={(texto) =>
                setActividad({...actividad, nombre: texto})
              }
              style={styles.input}
            />
            <TextInput
              keyboardType="numeric"
              label="Porcentaje"
              placeholder="Ej: 40"
              onChangeText={(texto) =>
                setActividad({...actividad, porcentaje: parseInt(texto)})
              }
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalVisible(false)}>Cancelar</Button>
            <Button onPress={() => guardarActividad()}>Aceptar</Button>
          </Dialog.Actions>

          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            action={{
              label: 'OK',
              onPress: () => {
                setSnackbarVisible(false);
              },
            }}>
            {error}
          </Snackbar>
        </Dialog>
      </Portal>

      <ScrollView>
        <List.Section title="Corte y sus actividades">
          <List.Accordion
            title="Corte 1 (30%)"
            left={(props) => <List.Icon {...props} icon="folder" />}>
            {materia.corte1.length != 0 ? (
              <FlatList
                data={materia.corte1}
                keyExtractor={(corte1) => corte1.nombre.toString() + 1}
                renderItem={({item}) => (
                  <List.Item
                    key={item.nombre + 1}
                    title={item.nombre}
                    description={item.porcentaje + '%'}
                  />
                )}
              />
            ) : (
              <Text>No se han registro actividades</Text>
            )}
          </List.Accordion>

          <List.Accordion
            title="Corte 2 (30%)"
            left={(props) => <List.Icon {...props} icon="folder" />}>
            {materia.corte2.length != 0 ? (
              <FlatList
                data={materia.corte2}
                keyExtractor={(corte2) => corte2.nombre.toString() + 1}
                renderItem={({item}) => (
                  <List.Item
                    key={item.nombre + 1}
                    title={item.nombre}
                    description={item.porcentaje + '%'}
                  />
                )}
              />
            ) : (
              <Text>No se han registro actividades</Text>
            )}
          </List.Accordion>

          <List.Accordion
            title="Corte 3 (40%)"
            left={(props) => <List.Icon {...props} icon="folder" />}>
            {materia.corte3.length != 0 ? (
              <FlatList
                data={materia.corte3}
                keyExtractor={(corte3) => corte3.nombre.toString() + 1}
                renderItem={({item}) => (
                  <List.Item
                    key={item.nombre + 1}
                    title={item.nombre}
                    description={item.porcentaje + '%'}
                  />
                )}
              />
            ) : (
              <Text>No se han registro actividades</Text>
            )}
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  botonesCorte: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default ConfigurarMaterias;

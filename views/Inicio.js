import React, {useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Card, List, Paragraph, Title, Colors, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import globalContext from '../context/globalContext';

const Inicio = () => {
  const navegation = useNavigation();

  const {materias} = useContext(globalContext);
  return (
    <>
      {materias?.length > 0 ? (
        <View>
          <View>
            <Card>
              <Card.Content>
                <Title>Materias</Title>
                <Paragraph>Lista de materias</Paragraph>
                {/* <Button icon="plus-circle">Nueva materia</Button> */}
              </Card.Content>
            </Card>

            <FlatList
              data={materias}
              keyExtractor={(materias) => materias.id.toString()}
              renderItem={({item}) => (
                <>
                  <List.Item
                    key={item.id}
                    title={item.nombre}
                    description=""
                    left={(props) => <List.Icon {...props} icon="tune" />}
                    right={(props) => (
                      <>
                        <Button
                          icon="circle-edit-outline"
                          color={Colors.blue500}></Button>
                        <Button icon="delete" color={Colors.red500}></Button>
                      </>
                    )}
                    onPress={() =>
                      navegation.navigate('ConfigurarMaterias', {item})
                    }
                  />
                </>
              )}
            />
          </View>
          {/* <FAB icon="plus" style={styles.fab} /> */}
        </View>
      ) : (
        <Card>
          <Card.Content>
            <Title>Sin materias</Title>
            <Paragraph>Registre un materia</Paragraph>
          </Card.Content>
        </Card>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 20,
  },
});
export default Inicio;

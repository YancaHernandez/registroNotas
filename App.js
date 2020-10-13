import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Inicio from './views/Inicio';
import NuevaMateria from './views/NuevaMateria';
import DetallesMateria from './views/DetallesMateria';
import ConfigurarMaterias from './views/ConfigurarMaterias';
import BarraSuperior from './components/ui/Barra';

import GlobalState from './context/globalState';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// Definir el tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF',
  },
};

const App = () => {
  return (
    <>
      <GlobalState>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Inicio"
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.surface,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              }}>
              <Stack.Screen
                name="Inicio"
                component={Inicio}
                options={({navigation, route}) => ({
                  // headerTitleAlign: 'center',
                  title: 'Inicio',
                  headerLeft: (props) => (
                    <BarraSuperior
                      {...props}
                      navigation={navigation}
                      route={route}
                    />
                  ),
                })}
              />
              <Stack.Screen
                name="NuevaMateria"
                component={NuevaMateria}
                options={{title: 'Nueva Materia'}}
              />
              <Stack.Screen
                name="DetallesMateria"
                component={DetallesMateria}
                options={{title: 'Detalles Materia'}}
              />
              <Stack.Screen
                name="ConfigurarMaterias"
                component={ConfigurarMaterias}
                options={{title: 'Configurar materia'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </GlobalState>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;

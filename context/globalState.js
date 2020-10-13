import React, {useReducer, useEffect} from 'react';
import globalContext from './globalContext';
import globalReducer from './globalReducer';
import AsyncStorage from '@react-native-community/async-storage';
import {v4 as uudi} from 'uuid';

import {
  CREATE_MATERIAS,
  CREATE_NOTAS,
  DELETE_MATERIAS,
  DELETE_NOTAS,
  INICIAL,
  UPDATE_MATERIAS,
  UPDATE_NOTAS,
} from './types';

const GlobalState = (props) => {
  const initialState = {
    materias: [],
    notas: [],
  };
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    return async () => {
      await AsyncStorage.setItem('stateGlobalNotas', JSON.stringify(state));
    };
  }, [state]);

  // async function init(initialState) {
  //   const stateGlobal = await AsyncStorage.getItem('stateGlobalNotas');
  //   if (stateGlobal) {
  //     return JSON.parse(stateGlobal);
  //   }
  //   return initialState;
  // }
  /**
   *
   * ACCIONES PARA LA MATERIA
   */
  const agregarMateria = async (materia) => {
    materia = {
      id: uudi(),
      nombre: materia,
      corte1: [],
      corte2: [],
      corte3: [],
    };
    dispatch({
      type: CREATE_MATERIAS,
      payload: materia,
    });
    // try {
    //   await AsyncStorage.setItem('stateGlobalNotas', JSON.stringify(state));
    // } catch (error) {}
  };

  const obtenerMateria = async (id) => {
    return state.materias.find((materia) => materia.id == id);
  };

  const editarMateria = async (materia) => {
    dispatch({
      type: UPDATE_MATERIAS,
      payload: materia,
    });
    // try {
    //   await AsyncStorage.setItem('stateGlobalNotas', JSON.stringify(state));
    // } catch (error) {}
  };

  const eliminarMateria = async (id) => {
    dispatch({
      type: DELETE_MATERIAS,
      payload: id,
    });
    // try {
    //   await AsyncStorage.setItem('stateGlobalNotas', JSON.stringify(state));
    // } catch (error) {}
  };

  /**
   *
   * ACCIONES PARA LA NOTAS
   */
  const agregarNota = async (nota) => {
    nota = {
      id: uudi(),
      identificacion: nota.identificacion,
      nombre: nota.nombre,
      corte1: [],
      corte2: [],
      corte3: [],
    };
    dispatch({
      type: CREATE_NOTAS,
      payload: nota,
    });
    // try {
    //   await AsyncStorage.setItem('stateGlobalNotas', JSON.stringify(state));
    // } catch (error) {}
  };

  const obtenerNota = async (id) => {
    return state.notas.find((nota) => nota.id == id);
  };

  const editarNota = async (nota) => {
    dispatch({
      type: UPDATE_NOTAS,
      payload: nota,
    });
    // try {
    //   await AsyncStorage.setItem('stateGlobalNotas', JSON.stringify(state));
    // } catch (error) {}
  };

  const eliminarNota = async (id) => {
    dispatch({
      type: DELETE_NOTAS,
      payload: id,
    });
    // try {
    //   await AsyncStorage.setItem('stateGlobalNotas', JSON.stringify(state));
    // } catch (error) {}
  };

  return (
    <globalContext.Provider
      value={{
        materias: state.materias,
        notas: state.notas,
        agregarMateria,
        obtenerMateria,
        editarMateria,
        eliminarMateria,

        agregarNota,
        obtenerNota,
        editarNota,
        eliminarNota,
      }}>
      {props.children}
    </globalContext.Provider>
  );
};
export default GlobalState;

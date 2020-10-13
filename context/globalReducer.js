import AsyncStorage from '@react-native-community/async-storage';
import {
  CREATE_MATERIAS,
  UPDATE_MATERIAS,
  DELETE_MATERIAS,
  CREATE_NOTAS,
  UPDATE_NOTAS,
  DELETE_NOTAS,
  INICIAL,
} from './types';

export default (state, action) => {
  switch (action.type) {
    case INICIAL:
      const stateGlobal = AsyncStorage.getItem('stateGlobalNotas');
      //   await AsyncStorage.removeItem('stateGlobalNotas');
      if (stateGlobal) {
        return JSON.parse(stateGlobal);
      }
      return {...state};
    case CREATE_MATERIAS:
      return {
        ...state,
        materias: [...state.materias, action.payload],
      };
    case UPDATE_MATERIAS:
      return {
        ...state,
        materias: state.materias.map((materia) =>
          materia.id === action.payload.id ? action.payload : materia,
        ),
      };
    case DELETE_MATERIAS:
      return {
        ...state,
        materias: state.materias.filter(
          (materia) => materia._id !== action.payload,
        ),
      };
    case CREATE_NOTAS:
      return {
        ...state,
        notas: [...state.notas, action.payload],
      };
    case UPDATE_NOTAS:
      return {
        ...state,
        notas: state.notas.map((nota) =>
          nota.id === action.payload.id ? action.payload : nota,
        ),
      };
    case DELETE_NOTAS:
      return {
        ...state,
        notas: state.notas.filter((nota) => nota._id !== action.payload),
      };
    default:
      break;
  }
};

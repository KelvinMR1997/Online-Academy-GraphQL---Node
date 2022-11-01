import { database } from './../data/data.store';
import { IResolvers } from "@graphql-tools/utils";

const query: IResolvers = {
  Query: {
    estudiantes(): any {
      return database.estudiantes
    },
    estudiante(__: void, { id }): any {
      const resultado = database.estudiantes.filter(estudiante => estudiante.id === id)[0]
      if (resultado === undefined) {
        return {
          id: '-1',
          name: `No se ha encontrado el estudiante con ID ${id}`,
          email: '',
          courses: []
        }
      }
      return resultado;
    },
    cursos(): any {
      return database.cursos
    },
    curso(__: void, { cursoId }): any {
      const resultado = database.cursos.filter(curso => curso.id === cursoId)[0]
      if (resultado === undefined) {
        return {
          id: '-1',
          description: `No se ha encontrado un curso con el id ${cursoId}`,
          clases: -1,
          time: 0.0,
          logo: '',
          level: 'TODOS',
          path: '',
          teacher: '',
          reviews: []
        }
      }
      return resultado
    }
  },
};

export default query;

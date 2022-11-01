import { database } from "./../data/data.store";
import { IResolvers } from "@graphql-tools/utils";
import _ from "lodash";

const type: IResolvers = {
  Estudiante: {
    courses: (parent) => {
      const cursosLista: Array<any> = [];
      parent.courses.map((curso: string) => {
        cursosLista.push(_.filter(database.cursos, ["id", curso])[0]);
      });
      return cursosLista;
    },
  },
  Curso: {
    students: parent => {
      const studentList: Array<any> = [];
      const idCurso = parent.id
      database.estudiantes.map((student: any) => {
        if (student.courses.filter((id: any) => id === idCurso) > 0) {
          studentList.push(student)
        }
      })
      return studentList
    },
    path: parent => `https://www.udemy.com${parent.path}`
  }
};

export default type;

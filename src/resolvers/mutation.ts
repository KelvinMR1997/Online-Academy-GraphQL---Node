import { database } from "./../data/data.store";
import { IResolvers } from "@graphql-tools/utils";
import _ from "lodash";

const mutation: IResolvers = {
    Mutation: {
        cursoNuevo(__: void, { curso }): any {
            const ItemCurso = {
                id: String(database.cursos.length + 1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: [],
            }

            if (database.cursos.filter(x => x.title === ItemCurso.title).length === 0) {
                database.cursos.push(ItemCurso)
                return ItemCurso
            }

            return {
                id: "-1",
                title: `El curso con titulo ${ItemCurso.title} ya existe`,
                description: `El curso con titulo:  ${ItemCurso.title} , ya existe`,
                clases: -1,
                time: 0.0,
                level: "TODOS",
                logo: "",
                path: "",
                teacher: "",
                reviews: [],
            }


        },
        modificarCurso(__: void, { curso }): any {
            const Exist = _.findIndex(database.cursos, function (o) {
                return o.id === curso.id
            });
            if (Exist > -1) {
                const valorations = database.cursos[Exist].reviews;
                curso.reviews = valorations
                database.cursos[Exist] = curso
                return curso
            }

            return {
                id: "-1",
                title: `El curso no existe en la Base de datos`,
                description: `El curso no existe en la Base de datos`,
                clases: -1,
                time: 0.0,
                level: "TODOS",
                logo: "",
                path: "",
                teacher: "",
                reviews: [],
            }
        },
        eliminarCurso(__: void, { id }): any {
            const borrarCurso = _.remove(database.cursos, function (curso) {
                return curso.id === id
            })

            if (borrarCurso[0] === undefined) {
                return {
                    id: "-1",
                    title: `El curso no existe en la Base de datos`,
                    description: `El curso no existe en la Base de datos`,
                    clases: -1,
                    time: 0.0,
                    level: "TODOS",
                    logo: "",
                    path: "",
                    teacher: "",
                    reviews: [],
                }
            }

            return borrarCurso[0]
        }
    }
};

export default mutation;

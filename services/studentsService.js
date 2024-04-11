const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class StudentsService {
  constructor() {
    this.students = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.students.push({
        id: faker.number.bigInt({min:1, max: 1000000}).toString(),
        name: faker.person.firstName(),
        gender: faker.person.gender(),
        phoneNumber: faker.phone.number(),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newStudent = {
      id: faker.number.bigInt({min:1, max: 1000000}).toString(),
      ...data, // Script operation para concatenar esos valores
    };

    this.students.push(newStudent);
    return newStudent;
  }

  find() {
    //Promesa para simular un tiempo de espera
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.students);
      }, 5000);
    });
  }

  async findOne(id) {
    //const name = this.getTotal(); //Para generar un error
    const student = this.students.find((item) => item.id === id);
    if (!student) {
      throw boom.notFound('Student not found'); //Devuelve un error 404
    }
    if (student.isBlock) {
      throw boom.conflict('Student is blocked'); //Devuelve un error 409
    }
    return student; //Devuelve el objeto encontrado, si no lo encuentra devuelve un error 404
  }

  async update(id, changes) {
    const index = this.students.findIndex((item) => item.id === id);
    if (index === -1) {
      //Cuando no lo encuentra finIndex envía un -1
      throw boom.notFound('Student not found'); //Devuelve un error 404
    }
    const student = this.students[index];
    this.students[index] = {
      ...student,
      ...changes, //Script operation para concatenar esos valores
    };
    return this.students[index]; //Devuelve el objeto actualizado
  }

  async delete(id) {
    const index = this.students.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Student not found'); //Devuelve un error 404
    }
    this.students.splice(index, 1); //Eliminamos el elemento
    return { id };
  }
}

module.exports = StudentsService;

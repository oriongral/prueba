const { faker } = require('@faker-js/faker');

class LessonsService {

constructor() {
    this.lessons = [];
    this.generate();
  }

generate() {
    for (let index = 0; index < 100; index++) {
      this.lessons.push({
        id: faker.string.uuid(),
        course: this.randomSubject(),
        module: faker.number.int({ min: 1, max: 10 }),
        teacher: faker.person.fullName(),
        classroom: faker.string.alphanumeric(3),
        hourOfClass:  faker.date.soon().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true }), // generar una hora de clase aleatoria
      });
    }
}

randomSubject() {
    const subjects = [
      'Matemáticas',
      'Español',
      'Historia',
      'Geografía',
      'Física',
      'Química',
      'Biología',
      'Inglés',
      'Francés',
      'Alemán',
      'Arte',
      'Música',
      'Educación Física',
      'Filosofía',
      'Informática',
    ];
    // Devuelve un elemento aleatorio del array subjects.
    return faker.helpers.arrayElement(subjects);
  }

  create(lesson) {
    const newLesson = {
      id: faker.string.uuid(),
      course: this.randomSubject(), // generar un nombre de materia aleatorio
      module: faker.number.int({ min: 1, max: 10 }), // generar un número de módulo aleatorio
      teacher: faker.person.fullName(), // generar un nombre de maestro aleatorio
      classroom: faker.string.alphanumeric(3), // generar un código de aula aleatorio
      hourOfClass:  faker.date.soon().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true }), // generar una hora de clase aleatoria
    };

    this.lessons.push(newLesson);
    return newLesson;
  }

  find() {
    return this.lessons; // devolver los datos de las lecciones
  }

  findOne(id) {
    // lógica para encontrar una lección por ID
    return this.lessons.find(item => item.id === id);
  }

  update() {
    // lógica para actualizar una lección existente
  }

  delete() {
    // lógica para eliminar una lección existente
  }
}

module.exports = LessonsService;

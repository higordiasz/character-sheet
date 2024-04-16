import { Character as Char } from "../Models/index.js";

class Character {
  constructor() {}
  async create(name) {
    let variables = [{ created: true }];
    let created = await Char.Controller.createCharacter(name, variables);
    return created;
  }
  getVariables(character) {
    if (!Array.isArray(character)) return null;
    let aux = character;
    aux.shift();
    return aux;
  }
  async updateVariable(name, character, id, value) {
    if (!Array.isArray(character)) return false;
    let aux = character;
    let index = aux.findIndex((item) => {
      return item.id === id;
    });
    if (index > -1) {
      aux[index].value = value;
    } else {
      let n = { id: id, value: value };
      aux.push(n);
    }
    return await Char.Controller.updateCharacter(name, aux);
  }
}

export { Character };

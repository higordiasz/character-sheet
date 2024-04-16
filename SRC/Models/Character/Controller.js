import { Model } from "./Model.js";
const Controller = {};

Controller.getCharacter = async (name) => {
  let character = await Model.findOne({ characterName: name });
  if (!character) return [];
  return character.characterVariables;
};

Controller.updateCharacter = async (name, variables) => {
  if (!isNaN(name)) return false;
  if (!Array.isArray(variables)) return false;
  let character = await Model.findOne({ characterName: name });
  if (!character) return false;
  character.characterVariables = variables;
  let saved = await character
    .save()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return saved;
};

Controller.createCharacter = async (name, variables) => {
  if (!isNaN(name)) return false;
  if (!Array.isArray(variables)) return false;
  let created = await Model.create({
    characterName: name,
    characterVariables: variables,
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return created;
};

export { Controller };

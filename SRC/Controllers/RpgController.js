import { Character } from "../Models/index.js";
import { Character as Char } from "../Class/Character.js";
import { RPG } from "../Helpers/index.js";

const rpgController = {};
const characters = ["char1", "char2", "char3", "char4", "mestre"]; // Limit the number of characters by array.
const char = new Char();

rpgController.getCharacter = async (req, res) => {
  if (!characters.includes(req.params.character)) return res.redirect("/"); // IF you remove this line, remove limit from characters.
  if (req.params.character == "mestre") return res.render("mestre", {});
  switch (req.params.character) {
    case "char1":
      return res.render("ficha", { url: "https://i.imgur.com/N6Yg2Tb.png" });
    case "char2":
      return res.render("ficha", { url: "https://i.imgur.com/jHgdsa9.png" });
    case "char3":
      return res.render("ficha", { url: "https://i.imgur.com/no93Mg2.png" });
    case "char4":
      return res.render("ficha", { url: "https://i.imgur.com/IY6vvbt.png" });
    default:
      return res.render("ficha", { url: "https://i.imgur.com/xNKiLFt.png" });
  }
};

rpgController.getCharacterJson = async (req, res) => {
  if (!characters.includes(req.params.character))
    // IF you remove this line, remove limit from characters.
    return res.status(200).send({ error: true }); // /\
  let charName = req.params.character;
  if (req.params.character == "mestre") {
    charName = req.query.name || "dias";
  }
  let character = await Character.Controller.getCharacter(charName);
  if (character.length < 1) {
    await char.create(charName);
    return res
      .status(200)
      .send({ error: false, character: [], name: charName });
  } else {
    return res.status(200).send({
      error: false,
      character: char.getVariables(character),
      name: charName,
    });
  }
};

rpgController.updateCharacter = async (req, res) => {
  let body = req.body;
  let name = req.params.character;
  if (!body.id) return res.status(200).send({ error: true });
  if (!body.value) body.value = "";
  let character = await Character.Controller.getCharacter(name);
  if (character.length < 1) {
    await char.create(req.params.character);
    character = await Character.Controller.getCharacter(name);
    char.updateVariable(name, character, body.id, body.value);
  } else {
    char.updateVariable(name, character, body.id, body.value);
  }
  let variables = [{ id: body.id, value: body.value }];
  await RPG.functions.update(name, variables);
  return res.status(200).send({ error: false });
};

export { rpgController };

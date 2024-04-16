import { Router } from "express";
import { RPG } from "../Helpers/index.js";
import { rpgController } from "../Controllers/index.js";

const mainRouter = Router();

mainRouter.get("/:character", rpgController.getCharacter);
mainRouter.get("/:character/json", rpgController.getCharacterJson);
mainRouter.post("/:character", rpgController.updateCharacter);

mainRouter.get("/events", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  RPG.connections.push(res);

  res.on("close", () => {
    let index = RPG.connections.indexOf(res);
    if (index > -1) RPG.connections.splice(index, 1);
    res.end();
  });
});

export { mainRouter };

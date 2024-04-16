import { Schema, model } from "mongoose";

const characterSchema = new Schema({
  characterName: {
    type: String,
    required: true,
  },
  characterVariables: {
    type: Array,
    required: true,
  },
});

const Model = model("character", characterSchema);

export { Model };

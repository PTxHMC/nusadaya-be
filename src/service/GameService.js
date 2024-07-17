import prisma from "../db/index.js";
import { gameValidation } from "../validation/GameValidation.js";
import validate from "../validation/validation.js";

const createGame = async (data) => {
  const newData = validate(gameValidation, data);

  const game = await prisma.game.create({
    data: {
      title: newData.title,
      description: newData.description,
      type: newData.type,
      content: newData.content,
      thumbnail: newData.thumbnail,
    },
  });

  return game;
};

export default { createGame };

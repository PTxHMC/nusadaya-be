import GameService from "../service/GameService";
import {
  createResponse,
} from "../utils/CreateResponse.js";

const createGame = async (req, res) => {
  try {
    const data = req.body;

    const game = await GameService(data);

    const responseData = createResponse("Berhasil membuat game", game);

    res.status(201).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  createGame
};

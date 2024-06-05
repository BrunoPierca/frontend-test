import { JsonDB, Config } from "node-json-db";

export default async function handler(req, res) {
  const db = new JsonDB(new Config("db", true, false, "/"));

  if (req.method === "GET") {
    const query = req.query;
    const { pokemonId } = query;
    const data = await db.getData("/");

    return res
      .status(200)
      .json(data.some((pokemon) => pokemon.id === Number(pokemonId)));
  } else if (req.method === "DELETE") {
    try {
      const query = req.query;
      const { pokemonId } = query;

      await db.delete(
        "/catchedPokemon[" +
        (await db.getIndex("/catchedPokemon", Number(pokemonId))) +
        "]"
      );

      return res.status(200).send("Released Pokemon");
    } catch {
      return res.status(409).send("Couldn't find pokemon");
    }
  }
  return res.status(405).send("Method not allowed.");
}

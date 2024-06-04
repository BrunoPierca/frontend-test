import { JsonDB, Config } from "node-json-db";

export default async function handler(req, res) {
  const db = new JsonDB(new Config("db", true, false, "/"));
  if (req.method === "GET") {
    const data = await db.getData("/savedPokemon");

    return res.status(200).json({ results: data, count: data.length });
  }

  if (req.method === "POST") {
    const newPokemon = {
      id: req.body.id,
      name: req.body.name,
      url: req.body.url
    };

    const index = await db.getIndex("/savedPokemon", Number(newPokemon.id));

    if (index === -1) {
      await db.push("/savedPokemon[]", newPokemon);
      return res.status(200).json(newPokemon);
    } else {
      return res.status(409).send("Pokemon already exists");
    }
  }
  return res.status(405).send("Method not allowed.");
}

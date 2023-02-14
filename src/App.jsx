import { useState } from "react";

const App = () => {
  const [pokemonword, setPokemonword] = useState("");
  const handleChangePokemon = (e) => {
    setPokemonword(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    searchPokemon(pokemonword);
  };

  const [namePokemon, setnamePokemon] = useState("");
  const [imgpokemon, setimgpokemon] = useState("");
  const [error, setError] = useState(null);

  const searchPokemon = async (pokemon) => {
    try {
      const urlApi = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const tojson = await urlApi.json();
      let nombrepokemon = tojson.name;
      setnamePokemon(nombrepokemon);
      const pokemonimage = await imagePokemon(nombrepokemon);
      setimgpokemon(pokemonimage);
    } catch (error) {
      setError(error);
    }
  };
  const imagePokemon = async (namepokemon) => {
    try {
      const urlApi = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${namepokemon}`
      );
      const tojson = await urlApi.json();
      return tojson.sprites.other.home.front_default;
    } catch (error) {
      setError(error);
    }
  };
  return (
    <main className="py-10 bg-gradient-to-l from-slate-800 to-slate-900 text-white">
      <h1 className="py-10 text-center text-5xl"> Classical Pokémon Search</h1>
      <div className="container my-3 py-12 mx-auto grid grid-cols-1 md:grid-cols-2 col-span-4">
        <div className="py-5">
          <form
            onSubmit={handleSubmit}
            className="px-6 py-7 bg-slate-800 shadow-mdw shadow-zinc-900 max-w-sm mx-auto rounded-md"
          >
            <input
              className="lowercase shadow appearance-none border-b-2 border-slate-300 rounded w-full p-2 mb-10 bg-transparent placeholder:text-slate-300 placeholder:capitalize"
              type="text"
              placeholder="Nombre Pokémon"
              onChange={handleChangePokemon}
            />
            <button
              className="py-3 px-6 w-full border border-cyan-500 rounded hover:bg-cyan-600 active:scale-95"
              type="submit"
              onClick={() => setError(null)}
            >
              Buscar
            </button>
          </form>
        </div>
        <div className="mx-auto max-w-sm m-auto">
          {error ? (
            <span>Ups! Intente nuevamente</span>
          ) : (
            <div className="my-3">
              <h2 className="text-center text-3xl capitalize">{namePokemon} </h2>
              <img className="w-60" src={imgpokemon} alt="" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;

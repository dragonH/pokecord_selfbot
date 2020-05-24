import fs from 'fs';

(async () => {
    const pokemonList = JSON.parse(fs.readFileSync('./pokemon-list.json', 'utf-8'));
    const keys = Object.keys(pokemonList);
    keys.sort();
    const results: any = {};
    keys.forEach((key) => {
        results[key] = pokemonList[key];
    });
    fs.writeFileSync('./pokemon-list-sort.json', JSON.stringify(results, null, 4));
})();

import fs from 'fs';

(async () => {
    const editedList = JSON.parse(fs.readFileSync('./pokemon-list-sort.json', 'utf-8'));
    const sourceList = JSON.parse(fs.readFileSync('./pokemon-list.json', 'utf-8'));
    const mergedList: any = {};
    Object.keys(sourceList).forEach((pokemon) => {
        mergedList[pokemon] = editedList[pokemon] || '';
    });
    fs.writeFileSync('./pokemon-list.json', JSON.stringify(mergedList, null, 4));
})();

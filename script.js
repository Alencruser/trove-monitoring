const gemTypes = ["cosmic"];
const lootTypes = ["radiant", "stellar", 'dust'];

Array.from(document.querySelectorAll("button")).forEach((button)=> {
    button.addEventListener("click", () => {
        const myGemType = button.id.split("-")[0];
        const myLootType = button.id.split("-")[1]
        const actionCalled = button.id.split("-")[2];
        updateGem(myGemType, myLootType, actionCalled);
    });
});


function updateGem(gemType, lootType, action) {
    const idToTarget = `${gemType}-${lootType}`;
    const actualNumber = document.getElementById(`${idToTarget}-number`);
    actualNumber.textContent = action === "add" ? Number(actualNumber.textContent) + 1 : Number(actualNumber.textContent) - 1;
    document.getElementById(idToTarget).textContent = actualNumber.textContent;
    const myValue = Number(document.getElementById(`${idToTarget}-value`).textContent);
    document.getElementById(`${idToTarget}-total-dust`).textContent = Number(actualNumber.textContent) * myValue;
    // on vient changer le total de dust et d'ouvertures
    changeTotal(gemType);
}

function changeTotal(gemType) {
    const totalNumberLine = document.getElementById(`${gemType}-total-number`);
    const totalDustLine = document.getElementById(`${gemType}-total-dust`);
    const totalNumberValue = gemTypes.reduce((acc,base) => {
        lootTypes.forEach(lootType => {
            acc += Number(document.getElementById(`${base}-${lootType}-number`).textContent)
        });
        return acc;
    }, 0);
    totalNumberLine.textContent = totalNumberValue;

    const totalDustValue = gemTypes.reduce((acc,base) => {
        lootTypes.forEach(lootType => {
            acc += Number(document.getElementById(`${base}-${lootType}-total-dust`).textContent)
        });
        return acc;
    }, 0);
    totalDustLine.textContent = totalDustValue;
}
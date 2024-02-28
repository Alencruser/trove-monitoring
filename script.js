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

Array.from(document.querySelectorAll("input")).forEach(input => {
    input.addEventListener("keyup", () => {
        const myGemType = input.id.split("-")[0];
        const myLootType = input.id.split("-")[1];
        const myValue = input.value;
        updateValuesFromInput(myGemType, myLootType, myValue);
    });
})


function updateGem(gemType, lootType, action) {
    const idToTarget = `${gemType}-${lootType}`;
    const actualNumber = document.getElementById(`${idToTarget}-number`);
    actualNumber.textContent = action === "add" ? Number(actualNumber.textContent) + 1 : Number(actualNumber.textContent) - 1;
    document.getElementById(idToTarget).value = actualNumber.textContent;
    const myValue = Number(document.getElementById(`${idToTarget}-value`).textContent);
    document.getElementById(`${idToTarget}-total-dust`).textContent = Number(actualNumber.textContent) * myValue;
    // on vient changer le total de dust et d'ouvertures
    changeTotal(gemType);
}

function updateValuesFromInput(gemType, lootType, value) {
    const idToTarget = `${gemType}-${lootType}`;
    document.getElementById(`${idToTarget}-number`).textContent = value;
    const myValue = Number(document.getElementById(`${idToTarget}-value`).textContent);
    document.getElementById(`${idToTarget}-total-dust`).textContent = value * myValue;
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
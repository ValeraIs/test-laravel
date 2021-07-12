
const getFormattingWeight = (weight) => {
    let ton = 1000000,
        kilo = 1000
    if (weight >= ton) {
        return (weight / ton).toFixed(2) + " T"
    } else if (weight >= kilo) {
        return (weight / kilo).toFixed(2) + " Kg"
    } else {
        return weight + " g"
    }
}

export default getFormattingWeight;

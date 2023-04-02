function hasEmptyKeys(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === "") {
            return true;
        }
    }

    return false;
}

export { hasEmptyKeys };
const generateUniqueString = ():string => {
    const ts:string = String(new Date().getTime())
    let out:string = '';

    for (let i = 0; i < ts.length; i += 2) {
        out += Number(ts.substr(i, 2)).toString(36);
    }

    return out;
}

export default generateUniqueString;

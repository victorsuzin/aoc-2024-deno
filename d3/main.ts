async function pt_1() :Promise<number>{
    const txt = await Deno.readTextFile('data.txt');
    const mul_array = txt.match(/mul\(\d{1,3},\d{1,3}\)/g);
    let total = 0;

    if(!mul_array){return 0;}
    for(const mul of mul_array){
        total += Number(mul.substring(4,mul.indexOf(','))) * Number(mul.substring(mul.indexOf(',') + 1, mul.length - 1));
    }
    return total;
}

console.log(await pt_1());
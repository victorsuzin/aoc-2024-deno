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

async function pt_2() :Promise<number>{
    const txt = await Deno.readTextFile('data.txt');
    const mul_array = txt.match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g);
    let total = 0;
    let enabled = true;

    if(!mul_array){return 0;}
    
    for(const mul of mul_array){
        if(mul === 'do()'){
            enabled = true;
        } else if(mul === "don't()"){
            enabled = false;
        } else if(enabled){
            total += Number(mul.substring(4,mul.indexOf(','))) * Number(mul.substring(mul.indexOf(',') + 1, mul.length - 1));
        }
    }
    return total;
}

console.log(await pt_1());
console.log(await pt_2());

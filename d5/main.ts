import data from "./data.json" with { type: "json"};
import data_test from "./data_test.json" with { type: "json"};

function main_function(pt: string): number{
  let total = 0;
  
  for(const update of data.updates){
    const cur_rules = data.rules.filter((e) => update.includes(e[0]) && update.includes(e[1]));
    
    const cur_update: Array<{page: string, value: number}> = [];
    for(const page of update){
      cur_update.push({"page": String(page), "value": cur_rules.filter((e) => e[0] === page).length});
    }
    cur_update.sort((a, b) => b.value - a.value);

    let is_valid_update: boolean = true;
    for(let i = 0; i < cur_update.length; i++){
      if(cur_update[i].page !== String(update[i])){
        is_valid_update = false;
        break;
      }
    }
    
    if(pt === 'pt_1') {
      total += is_valid_update ? update[Math.round((update.length - 1)/2)] : 0;
    } else if(pt === 'pt_2'){
      total += !is_valid_update ? Number(cur_update[Math.round((update.length - 1)/2)].page) : 0;
    }
  }

  return total;
}

function pt_1(): number {
  return main_function('pt_1');
}

function pt_2(): number {
  return main_function('pt_2');
}

console.log(pt_1());
console.log(pt_2());

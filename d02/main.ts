import data from "./data.json" with { type: "json"};

function pt_1() :number{
  let count_safe = 0;

  for(const e of data){
    let is_safe = true;
    let dir = 0;

    for(let i = 0; i < e.length - 1; i++){
      const delta = e[i+1] - e[i];
      
      if(delta===0 || Math.abs(delta)>3){
        is_safe = false;
        break;
      }

      if(!dir){
        dir = Math.round(delta/Math.abs(delta));
      }

      if(Math.round(delta/Math.abs(delta))!=dir){
        is_safe = false;
        break;
      }
    }
    count_safe += Number(is_safe);
  }
  return count_safe;
}

function pt_2() :number{
  let count_safe = 0;

  for(const e of data){
    let is_safe = false;
    
    for(let i = -1; i < e.length; i++){
      
      const e_temp = [...e];
      if(i>=0) e_temp.splice(i, 1);

      const e_asc = [...e_temp].sort((a,b) => a - b);
      const e_desc = [...e_temp].sort((a,b) => b - a);

      if(JSON.stringify(e_asc) != JSON.stringify(e_temp) && JSON.stringify(e_desc) != JSON.stringify(e_temp)) {
        continue;
      }
      
      const e_map = [...e_temp].map((e, idx) => e_temp[idx + 1] - e);
      e_map.splice(-1, 1);
      
      const zero_count = e_map.filter(e => e === 0).length;
      if(zero_count){
        continue;
      }
      
      const positive_count = e_map.filter(e => e > 0).length;
      const negative_count = e_map.filter(e => e < 0).length;

      if(positive_count && negative_count){
        continue;
      }

      const maxDelta = positive_count ? Math.max(...e_map) : Math.abs(Math.min(...e_map));

      if(maxDelta>3){
        continue;
      }
      is_safe = true;
      break;
    }

    count_safe += Number(is_safe);
  }
  return count_safe;
}

console.log(pt_1());
console.log(pt_2());
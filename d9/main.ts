async function get_disk_map() :Promise<{"diskmap": Array<string>, "reduced_diskmap": Array<{"char": string, "pos": number, "cnt": number}>}>{
  const txt = await Deno.readTextFile('data.txt');
  let new_string: Array<string> = [];
  let reduced_diskmap: Array<{"char": string, "pos": number, "cnt": number}> = [];
  for(let i = 0; i < txt.length; i++){
    const chr: string = Number(i) % 2 ? '.' : String(Number(i) / 2);
    const ar: Array<string> = Array(Number(txt[i])).fill(chr);
    reduced_diskmap.push({"char": chr, "pos": new_string.length, "cnt": ar.length});
    new_string = new_string.concat(ar);
  };

  return {"diskmap": new_string, "reduced_diskmap": reduced_diskmap};
}

async function pt_1(){
  const disk_map_full = await get_disk_map();
  const disk_map = disk_map_full.diskmap;
  console.log(disk_map_full);
  let result = [];
  let final_result = 0;

  let last_digit_idx = disk_map.length -  1;
  let last_digit = disk_map[last_digit_idx];
  for(let i = 0; i < disk_map.length; i++){
    if(disk_map[i] === '.'){
      while(last_digit === '.'
        && i <= last_digit_idx
      ){
        last_digit_idx--;
        last_digit = disk_map[last_digit_idx];
      }

      if(i <= last_digit_idx){
        result.push(last_digit);
        final_result += i * Number(last_digit);
      }
      last_digit_idx--;
      last_digit = disk_map[last_digit_idx];
    } else {
      result.push(disk_map[i]);
      final_result += i * Number(disk_map[i]);
    }
    if(i >= last_digit_idx) break;
  }

  console.log(final_result);
}

await pt_1();

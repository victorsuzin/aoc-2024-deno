async function get_disk_map() :Promise<{"diskmap": Array<string>, "reduced_diskmap": Array<{"char": string, "pos": number, "cnt": number}>}>{
  const txt = await Deno.readTextFile('data.txt');
  let new_string: Array<string> = [];
  const reduced_diskmap: Array<{"char": string, "pos": number, "cnt": number}> = [];
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
        final_result += i * Number(last_digit);
      }
      last_digit_idx--;
      last_digit = disk_map[last_digit_idx];
    } else {
      final_result += i * Number(disk_map[i]);
    }
    if(i >= last_digit_idx) break;
  }

  console.log(final_result);
}

async function pt_2(){
  const disk_map_full = await get_disk_map();

  const reduced_diskmap = [...disk_map_full.reduced_diskmap]; 

  let reversed_reduced = [...disk_map_full.reduced_diskmap];
  reversed_reduced.reverse();
  reversed_reduced = reversed_reduced.filter(e => e.char !== '.' && e.cnt > 0);

  for(const file of reversed_reduced){
    if(!reduced_diskmap.filter(e => e.pos < file.pos && e.char === '.' && e.cnt > 0).length) break;
    const free_space_to_be_replaced = reduced_diskmap.sort((a,b) => a.pos - b.pos).filter((e) => e.char === '.' && e.pos < file.pos && e.cnt >= file.cnt)[0];
    if(free_space_to_be_replaced
    ){
      if(free_space_to_be_replaced.cnt > file.cnt){
        reduced_diskmap.push({"char": '.', "pos": (free_space_to_be_replaced.pos + free_space_to_be_replaced.cnt - file.cnt), "cnt":free_space_to_be_replaced.cnt - file.cnt});
      }
      reduced_diskmap[reduced_diskmap.indexOf(free_space_to_be_replaced)].char = file.char;
      reduced_diskmap[reduced_diskmap.indexOf(free_space_to_be_replaced)].cnt = file.cnt;
      
      reduced_diskmap[reduced_diskmap.indexOf(file)].char = '.';      
    }
  }
  reduced_diskmap.sort((a,b) => a.pos - b.pos);
  let filesystem :Array<string> = [];
  for(const file of reduced_diskmap){
    filesystem = filesystem.concat(Array(file.cnt).fill(file.char));
  }

  let checksum :number = 0;
  for(let i = 0; i < filesystem.length; i++){
    checksum += filesystem[i] === '.' ? 0 : i * Number(filesystem[i]);
  }
  console.log(checksum);
}

await pt_1();
await pt_2();

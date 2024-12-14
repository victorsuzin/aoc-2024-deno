async function pt_2() :Promise<number>{
  const txt = await Deno.readTextFile('data.txt');
  const rows = txt.split("\r\n");
  const splitted_rows = txt.split("\r\n").map(e => e.split(""));
  let count_matches = 0;
  for(let i = 1; i < splitted_rows.length - 1; i++){
    for(let j = 1; j < splitted_rows[i].length - 1; j++){
      if(splitted_rows[i][j] != 'A') continue;
      if(
        (
          (splitted_rows[i-1][j-1] === 'M' && splitted_rows[i+1][j+1] === 'S') ||
          (splitted_rows[i-1][j-1] === 'S' && splitted_rows[i+1][j+1] === 'M')
        ) && (
          (splitted_rows[i-1][j+1] === 'M' && splitted_rows[i+1][j-1] === 'S') ||
          (splitted_rows[i-1][j+1] === 'S' && splitted_rows[i+1][j-1] === 'M')
        )
      ){
        count_matches++;
      }
    }
  }
  return count_matches;
}

async function pt_1() :Promise<number>{
  const txt = await Deno.readTextFile('data.txt');
  const rows = txt.split("\r\n");
  const reversed_rows = rows.map(e => e.split("").reverse().join(""));
  const splitted_rows = txt.split("\r\n").map(e => e.split(""));

  let cols_prep = [];
  
  for(let i = 0; i < rows[0].length; i++){
    cols_prep.push([]);
  }
  /* O(n) */
  for(const splitted_row of splitted_rows){
    for(let i = 0; i < rows[0].length; i++){
      cols_prep[i].push(splitted_row[i]);
    }
  }

  const cols = cols_prep.map(e => e.join(""));
  const reversed_cols = cols_prep.map(e => e.reverse().join(""));

  let fwd_diag_prep = [];

  for(let i = 0; i < rows[0].length + cols[0].length - 1; i++){
    fwd_diag_prep.push([]);
  }

  for(let i = 0; i < rows[0].length; i++){
    let r = 0;
    let c = 0;
    c += i;

    while(r < cols[0].length && c < rows[0].length){
      fwd_diag_prep[i].push(rows[r][c]);
      r++;
      c++;
    };
  }
  
  for(let i = 1; i < cols[0].length; i++){
    let r = 0;
    let c = 0;
    r += i;

    while(r < cols[0].length && c < rows[0].length){
      fwd_diag_prep[i + rows[0].length - 1].push(rows[r][c]);
      r++;
      c++;  
    };
  }

  const fwd_diag = fwd_diag_prep.map(e => e.join(""));
  const reversed_fwd_diag = fwd_diag_prep.map(e => e.reverse().join(""));

  let bwd_diag_prep = [];
  let bwd_diag_idx = 0;

  for(let i = 0; i < rows[0].length + cols[cols.length-1].length - 1; i++){
    bwd_diag_prep.push([]);
  }
  /* O(n*m) - ToDo research better performin solution */
  for(let i = -1; Math.abs(i) <= rows[0].length; i--){
    let r = 0;
    let c = rows[0].length;
    c += i;

    while(r < cols[0].length && Math.abs(c) <= rows[0].length){
      bwd_diag_prep[bwd_diag_idx].push(rows[r][c]);
      r++;
      c--;  
    };
    bwd_diag_idx++;
  }
  
  /* O(n*m) - ToDo research better performin solution */
  for(let i = 1; i < cols[cols.length - 1].length; i++){
    let r = 0;
    let c = cols[cols.length - 1].length - 1;
    r += i;

    while(r < cols[0].length && Math.abs(c) <= rows[0].length){
      bwd_diag_prep[i + rows[0].length - 1].push(rows[r][c]);
      r++;
      c--;
    };
  }

  const bwd_diag = bwd_diag_prep.map(e => e.join(""));
  const reversed_bwd_diag = bwd_diag_prep.map(e => e.reverse().join(""));
  
  let count_matches = 0;
  for(const r of rows){
    const cur_matches = r.match(/XMAS/g)?.length;
    count_matches += cur_matches ? cur_matches : 0;
  }
  for(const r of reversed_rows){
    const cur_matches = r.match(/XMAS/g)?.length;
    count_matches += cur_matches ? cur_matches : 0;
  }
  for(const c of cols){
    const cur_matches = c.match(/XMAS/g)?.length;
    count_matches += cur_matches ? cur_matches : 0;
  }
  for(const c of reversed_cols){
    const cur_matches = c.match(/XMAS/g)?.length;
    count_matches += cur_matches ? cur_matches : 0;
  }
  for(const d of fwd_diag){
    const cur_matches = d.match(/XMAS/g)?.length;
    count_matches += cur_matches ? cur_matches : 0;
  }
  for(const d of reversed_fwd_diag){
    const cur_matches = d.match(/XMAS/g)?.length;
    count_matches += cur_matches ? cur_matches : 0;
  }
  for(const d of bwd_diag){
    const cur_matches = d.match(/XMAS/g)?.length;
    count_matches += cur_matches ? cur_matches : 0;
  }
  for(const d of reversed_bwd_diag){
    const cur_matches = d.match(/XMAS/g)?.length;
    count_matches += cur_matches ? cur_matches : 0;
  }

  return count_matches;
}

console.log(await pt_1());
console.log(await pt_2());
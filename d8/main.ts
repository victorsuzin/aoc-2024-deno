async function pt_1(){
  const txt = await Deno.readTextFile('data.txt');
  const splitted_rows = txt.split("\r\n").map(e => e.split(""));

  const frequencies: Array<string> = [];
  const antennas: Array<{"frenquency": string, "row": number, "col": number}> = [];
  const antinodes_locations: Array<{"row": number, "col": number}> = [];
  
  for(let i = 0; i < splitted_rows.length; i++){
    const row = splitted_rows[i];
    for(let j = 0; j < row.length; j++){
      const cell = row[j];
      if(cell === '.') continue;

      if(!frequencies.filter(e => e === cell).length) frequencies.push(cell);
      antennas.push({frenquency: cell, row: i, col: j});

    }
  }

  for(const frequency of frequencies){
    const cur_antennas = antennas.filter(e => e.frenquency === frequency);
    for(let i = 0; i < cur_antennas.length - 1; i++){
      const cur_antenna = cur_antennas[i];
      for(let j = i + 1; j < cur_antennas.length; j++){
        const next_antenna = cur_antennas[j];

        const delta_row = next_antenna.row - cur_antenna.row;
        const delta_col = next_antenna.col - cur_antenna.col;

        const antinode_1 = {"row": cur_antenna.row - delta_row, "col": cur_antenna.col - delta_col};
        const antinode_2 = {"row": next_antenna.row + delta_row, "col": next_antenna.col + delta_col};

        if(
          antinode_1.row >= 0 &&
          antinode_1.col >= 0 &&
          antinode_1.row < splitted_rows.length &&
          antinode_1.col < splitted_rows[0].length &&
          !antinodes_locations.filter(e => e.row === antinode_1.row && e.col === antinode_1.col).length
        ) antinodes_locations.push(antinode_1);

        if(
          antinode_2.row >= 0 &&
          antinode_2.col >= 0 &&
          antinode_2.row < splitted_rows.length &&
          antinode_2.col < splitted_rows[0].length &&
          !antinodes_locations.filter(e => e.row === antinode_2.row && e.col === antinode_2.col).length
        ) antinodes_locations.push(antinode_2);
      }
    }
  }
  console.log(antinodes_locations.length);
  
}

await pt_1();
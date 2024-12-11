import { type Console } from "node:console";

type coordinates = {
  row: number;
  col: number;
}

function change_direction(
  direction: string
) :string{
  let next_direction :string;
  switch(direction){
    case "up":
      next_direction = "right";
      break;

    case "down":
      next_direction = "left";
      break;
      
    case "left":
      next_direction = "up";
      break;

    case "right":
      next_direction = "down";
      break;

    default:
      next_direction = "";
  }

  return next_direction;
}

function get_next_position(
  direction: string,
  cur_position: coordinates
) :coordinates{
  const next_position = {"row": cur_position.row, "col": cur_position.col};
  switch(direction){
    case "up":
      next_position.row--;
      break;

    case "down":
      next_position.row++;
      break;
      
    case "left":
      next_position.col--;
      break;

    case "right":
      next_position.col++;
      break;

    default:
      next_position.row = -1;
      next_position.col = -1;
  }

  return next_position;
}

function get_initial_position(map :Array<Array<string>>) :coordinates{
  let initial_position :coordinates = {"row": 0, "col": 0};
  
  for(let r = 0; r < map.length; r++){
    const c = map[r].indexOf('^');
    if(c === -1) continue;

    initial_position.row = r;
    initial_position.col = c;
    break;
  }

  return initial_position;
}

async function pt_1() :Promise<Array<coordinates>>{
  const txt = await Deno.readTextFile('data.txt');
  const splitted_rows = txt.split("\r\n").map(e => e.split(""));
  const path: Array<coordinates> = [];
  let cur_position: coordinates = get_initial_position(splitted_rows);
  let cur_direction: string = 'up';

  path.push(cur_position);

  let out_of_map = false;
  while(!out_of_map){
    const next_pos_coor = get_next_position(cur_direction, cur_position);
    if(
      next_pos_coor.row >= splitted_rows.length ||
      next_pos_coor.col >= splitted_rows[0].length ||
      next_pos_coor.row < 0 ||
      next_pos_coor.col < 0
    ){
      out_of_map = true;
      break;
    }
    const next_pos = splitted_rows[next_pos_coor.row][next_pos_coor.col];
    if(typeof(next_pos) === 'undefined') break;

    if(next_pos === '#'){
      cur_direction = change_direction(cur_direction);
      continue;
    } else {
      if(!path.filter(e => e.row === next_pos_coor.row && e.col === next_pos_coor.col).length){
        path.push(next_pos_coor);
      }
      cur_position = next_pos_coor;
    }
    
    out_of_map = typeof(next_pos) === 'undefined';
  }
  return path;
}

async function pt_2() :Promise<number>{
  const txt = await Deno.readTextFile('data.txt');
  const splitted_rows = txt.split("\r\n").map(e => e.split(""));
  
  const possible_positions = await pt_1(); 
  let total_available_positions = 0;
  let cntr = 0;
  
  for(const position of possible_positions){
    cntr++;
    if(cntr % 10 === 0){
      console.clear();
      console.log(String(cntr)+'/'+String(possible_positions.length));
    }
    
    const new_map = JSON.parse(JSON.stringify(splitted_rows));
    new_map[position.row].splice(position.col, 1, '#');

    const path: Array<{ "coor": coordinates, "direction": string }> = [];
    let cur_position: coordinates = get_initial_position(new_map);
    let cur_direction: string = 'up';

    path.push({"coor": cur_position, "direction": cur_direction});
    
    let out_of_map = false;
    let loop_entered = false;

    while(!out_of_map && !loop_entered){
      const next_pos_coor = get_next_position(cur_direction, cur_position);
      if(
        next_pos_coor.row >= new_map.length ||
        next_pos_coor.col >= new_map[0].length ||
        next_pos_coor.row < 0 ||
        next_pos_coor.col < 0
      ){
        out_of_map = true;
        break;
      }

      if(path.filter(e => e.coor.row === next_pos_coor.row && e.coor.col === next_pos_coor.col && e.direction === cur_direction).length){
        total_available_positions++;
        loop_entered = true;
        break;
      }
      const next_pos = new_map[next_pos_coor.row][next_pos_coor.col];
      if(typeof(next_pos) === 'undefined') break;

      if(next_pos === '#'){
        cur_direction = change_direction(cur_direction);
        continue;
      } else {
        if(!path.filter(e => e.coor.row === next_pos_coor.row && e.coor.col === next_pos_coor.col).length){
          path.push({"coor": next_pos_coor, "direction": cur_direction});
        }
        cur_position = next_pos_coor;
      }
      
      out_of_map = typeof(next_pos) === 'undefined';
    }

  }
  return total_available_positions;
}

const pt_1_response = await pt_1();
const pt_2_response = await pt_2();

console.log(pt_1_response.length);
console.log(pt_2_response);
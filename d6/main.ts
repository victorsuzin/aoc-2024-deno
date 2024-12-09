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

async function pt_1() :Promise<number>{
  const txt = await Deno.readTextFile('data.txt');
  const splitted_rows = txt.split("\r\n").map(e => e.split(""));
  const path: Array<coordinates> = [];
  let cur_position: coordinates = {"row": 0, "col": 0};
  let cur_direction: string = 'up';

  for(let r = 0; r < splitted_rows.length; r++){
    const c = splitted_rows[r].indexOf('^');
    if(c === -1) continue;

    cur_position.row = r;
    cur_position.col = c;
    path.push(cur_position);
    break;
  }

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
  return path.length;
}

console.log(await pt_1());
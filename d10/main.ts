type coordinate = {
  row: number,
  col: number,
  height: number
}

type trail = {
  trailhead: coordinate,
  trailend: coordinate
}

const txt = await Deno.readTextFile('data.txt');
const map = txt.split('\r\n');
const map_height = map.length;
const map_width = map[0].length;

function follow_trail(previous_path: Array<coordinate>, previous_point: coordinate) :Array<coordinate>{
  let result :Array<coordinate> = previous_path;

  if(previous_point.col + 1 < map_width && Number(map[previous_point.row][previous_point.col + 1]) === previous_point.height + 1) {
    const new_point :coordinate = {row: previous_point.row, col: previous_point.col + 1, height: previous_point.height + 1};
    result.push(new_point);
    result = follow_trail(result, new_point);
  }

  if(previous_point.col - 1 >= 0 && Number(map[previous_point.row][previous_point.col - 1]) === previous_point.height + 1) {
    const new_point :coordinate = {row: previous_point.row, col: previous_point.col - 1, height: previous_point.height + 1};
    result.push(new_point);
    result = follow_trail(result, new_point);
  }

  if(previous_point.row + 1 < map_height && Number(map[previous_point.row + 1][previous_point.col]) === previous_point.height + 1) {
    const new_point :coordinate = {row: previous_point.row + 1, col: previous_point.col, height: previous_point.height + 1};
    result.push(new_point);
    result = follow_trail(result, new_point);
  }

  if(previous_point.row - 1 >= 0 && Number(map[previous_point.row - 1][previous_point.col]) === previous_point.height + 1) {
    const new_point :coordinate = {row: previous_point.row - 1, col: previous_point.col, height: previous_point.height + 1};
    result.push(new_point);
    result = follow_trail(result, new_point);
  }
  return result;
}

function pt_1(){
  //let trails :Array<trail> = [];
  let result :number = 0;
  for(let row = 0; row < map.length; row++){
    for(let col = 0; col < map[row].length; col++){
      if(Number(map[row][col])) continue;
      const cur_trailhead :coordinate = {row: row, col: col, height: 0};
      const trailends = follow_trail([cur_trailhead], cur_trailhead).filter(e => e.height === 9);
      const new_trails :Array<trail> = [];
      for(const trailend of trailends){
        if(!new_trails.filter(e => e.trailend.col === trailend.col && e.trailend.row === trailend.row).length)
          new_trails.push({trailhead: cur_trailhead, trailend: trailend});
      }
      result += new_trails.length;
      //trails = trails.concat(new_trails);
    }
  }
  console.log(result);
}

function pt_2(){
  //let trails :Array<trail> = [];
  let result :number = 0;
  for(let row = 0; row < map.length; row++){
    for(let col = 0; col < map[row].length; col++){
      if(Number(map[row][col])) continue;
      const cur_trailhead :coordinate = {row: row, col: col, height: 0};
      const trailends = follow_trail([cur_trailhead], cur_trailhead).filter(e => e.height === 9);
      result += trailends.length;
      //trails = trails.concat(new_trails);
    }
  }
  console.log(result);
}

pt_1();
pt_2();
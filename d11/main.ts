const txt = await Deno.readTextFile('data.txt');
let stones = txt.split(' ');

function pt_1(){
  for(let i = 0; i < 25; i++){
    const new_stones :Array<string> = [];
    for(const stone of stones){
      if(Number(stone) === 0){
        new_stones.push('1');
      } else if (stone.length % 2 === 0){
        const left_stone :number = Number(stone.substring(0, stone.length/2));
        const right_stone :number = Number(stone.substring(stone.length/2));
        new_stones.push(String(left_stone));
        new_stones.push(String(right_stone));
      } else{
        new_stones.push(String(Number(stone) * 2024));
      }
    }
    stones = [...new_stones];
  }

  console.log(stones.length);
}

type stone_memory = {
  "stone": string,
  "step": number,
  "total_stones": number
}

const stone_memory :Array<stone_memory> = [];


function get_total_stones(stone :string, step :number, total_steps :number) :number{
  const in_memory_stone :Array<stone_memory> = stone_memory.filter(e => e.stone === stone && e.step === step);
  if(in_memory_stone.length) return in_memory_stone[0].total_stones;
  if(step === total_steps) return 1;

  let total_stones :number = 0;

  if(stone === '0'){
    total_stones = get_total_stones('1', step + 1, total_steps);

  } else if (stone.length % 2 === 0) {
    total_stones = get_total_stones(
      String(Number(stone.substring(0, stone.length/2))),
      step + 1,
      total_steps
    ) + get_total_stones(
      String(Number(stone.substring(stone.length/2))),
      step + 1,
      total_steps
    );

  } else {
    total_stones =  get_total_stones(String(Number(stone)*2024), step + 1, total_steps);

  }
  stone_memory.push({stone: stone, step: step, total_stones: total_stones});
  return total_stones;
}

function pt_2(){
  let total :number = 0;
  for(const stone of stones){
    total += get_total_stones(stone, 0, 75);
  }
  console.log(total);
}


//pt_1();
pt_2();
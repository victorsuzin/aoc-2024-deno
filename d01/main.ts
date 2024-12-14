import data from "./data.json" with { type: "json"};

let total_pt1 = 0;
data["a1"].sort();
data["a2"].sort();
for(let i = 0; i < data["a1"].length; i++){
  total_pt1 += Math.abs(data["a1"][i] - data["a2"][i]);
}
console.log(total_pt1);

let total_pt2 = 0;

for(const e1 of data["a1"]){
  total_pt2 += data["a2"].filter(e => e == e1).length * e1;
}
console.log(total_pt2);
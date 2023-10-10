export function genId(orderedItems) {
  let characters ='';
  characters+='1234567890';
  characters+='abcdefghijklmnopqrstuvwxyz';
  let idArray=[];

  while (idArray.length < 9) {
      const character = characters[Math.floor(Math.random()*characters.length)];
      idArray.push(character);
  }
  orderedItems.forEach((item) => {
    if (idArray.join('')=== item.id) {
      genId(orderedItems);
      return
    }
  });
  return idArray.join('');
}
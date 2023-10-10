export function genPass(length, upper,lower,num,sym) {
  let characters ='';
  characters+='1234567890';
  characters+='abcdefghijklmnopqrstuvwxyz';
  let idArray=[];

  while (idArray.length < 9) {
      const character = characters[Math.floor(Math.random()*characters.length)];
      passwordArray.push(character);
  }
  return passwordArray.join('');
}
const a = [1, 2, 3]
const b = [1, 2, 2]

if (a.every(x => b.some(y => y === x))) {
  console.log('dim')
}

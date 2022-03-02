function generateHtml()
{ 
var cards = []

for (let i = 0; i < array.length; i++) {
    var card = `
    <h1> MY name is! ${team[i].name} </h1>
    `
    cards.push(card)
}

var fakeHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    ${cards}
</body>
</html>`

return fakeHtml

}
module.exports = generateHtml
function generateHtml()
{ 
var cards = []

for (let i = 0; i < array.length; i++) {
    var card = `
    <h1> MY name is! ${team[i].name} </h1>
    `
    cards.push(card)
}

var Html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" 
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <title>Team Profile Generator</title>
</head>
<body class="text-center">
    <nav class="navbar navbar-light bg-danger"><h1 class="mx-auto">My Team</h1></nav>
    <div class="container">
    <div class="d-flex flex-row flex-wrap">
    ${cards}
    </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" 
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>`

return Html

}
module.exports = generateHtml
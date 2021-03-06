var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
var data = require('./public/product_data.js');
var products = data.products;


app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));
function process_quantity_form(POST, response) {
    let model = products[0]['model'];
    let model_price = products[0]['price'];

    if (typeof POST['quantity_textbox'] != 'undefined') {
        let q = POST['quantity_textbox'];
        if (isNonNegInt(q)) {
            var contents = fs.readFileSync('./views/display_quantity_template.view', 'utf8');
            response.send(eval('`' + contents + '`')); // render template string
        } else {
            response.send(`${q} is not a quantity!`);
        }
    }

}

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});

app.post("/process_form", function (request, response) {
    let POST = request.body;
    process_quantity_form(POST, response);
    });

app.listen(8080, () => console.log(`listening on port 8080`));

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const pkg = require("./package.json");
const Handlebars = require("handlebars");

let app = new express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine("hbs", hbs.__express);

app.get("/", (req, res) => {
  hbs.registerHelper("a", function(items, options) {
    var out = "<ul>",
      data;

    if (options.data) {
      data = Handlebars.createFrame(options.data);
    }

    for (var i = 0, l = items.length; i < l; i++) {
      if (data) {
        data.index = i;
      }
      out = out + "<li>" + options.fn(items[i], { data: data }) + "</li>";
    }

    return out + "</ul>";
  });
  hbs.registerPartial("partial", require("./views/partial.hbs"));
  res.render("index", {
    title: 1,
    body: 2,
    content: "partialContent",
    list: ["我", "是", "谁"]
  });
});

app.listen(4501, function() {
  console.log(`${pkg.name} run at port 4501`);
});

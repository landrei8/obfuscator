// demo.js — a little script to test the obfuscator with.
// Paste it into the Input box (JavaScript mode) and hit "Obfuscate".
// It exercises: strings, nested scopes, function params, loops,
// objects, template literals, and a class.

function makeGreeter(greeting) {
  const punctuation = "!";
  return function greet(name) {
    const message = greeting + ", " + name + punctuation;
    console.log(message);
    return message;
  };
}

const people = ["Ada", "Alan", "Grace", "Katherine"];

const hello = makeGreeter("Hello");
people.forEach(function (person, index) {
  hello(person + " (#" + (index + 1) + ")");
});

class Counter {
  constructor(label) {
    this.label = label;
    this.count = 0;
  }
  tick() {
    this.count += 1;
    return `${this.label}: ${this.count}`;
  }
}

const c = new Counter("ticks");
for (let i = 0; i < 3; i++) {
  console.log(c.tick());
}

const config = {
  appName: "Demo App",
  version: "1.0.0",
  features: ["login", "search", "export"],
};
console.log("Loaded " + config.appName + " v" + config.version);
console.log("Enabled features: " + config.features.join(", "));

// expose a global so you can see renaming vs. non-renaming behavior
function add(a, b) {
  return a + b;
}
console.log("2 + 3 = " + add(2, 3));

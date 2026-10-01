console.log("Hello, I am second");

function sum(a, b){
    console.log(a+b);
}

const sub = (a, b) => {
    console.log(a-b);
}

// module.exports.sum = sum;
// module.exports.sub = sub;

module.exports = {
    sum: sum,
    sub: sub,
}
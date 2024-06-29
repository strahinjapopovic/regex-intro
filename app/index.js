// testing string str1
console.log("#--- Regex 'foo bar' ---");
const str1 = "foo bar";
// each method returns true or false
const foo = str1.startsWith({ 
    toString: () => 'foo' 
});
console.log(`startsWith('foo') -> ${foo}`);
// -> true
const bar = str1.endsWith({ 
    toString: () => 'bar' 
});
console.log(`endsWith('bar') -> ${bar}`);
// -> true
const wspace = str1.includes(' ');
console.log(`includes(' ') -> ${wspace}`);
// -> true
//----------------------------------------------------------------------------------------------------------
// regexp for maching username
console.log("#--- Regex Username ---");
const regexUsername = /^[a-zA-Z0-9_-]{8,18}$/; // regex meta-chars for maching username
console.log(regexUsername.test("username"));
// -> true
console.log(regexUsername.test("user-1"));
// -> false
console.log(regexUsername.test("@stan-pope"));
// -> true
//----------------------------------------------------------------------------------------------------------
console.log("#--- Symbol.match ---");
const regex1 = /foo/;
regex1[Symbol.match] = false;
console.log("/foo/".startsWith(regex1));
// -> true
console.log("/foo/".startsWith(regex1.toString()));
// -> true
console.log("/foo/".startsWith({ 
    toString: () => "/foo/" 
}));
// -> true
//----------------------------------------------------------------------------------------------------------
console.log("#--- Regex Variable ---");
const alpha = "abcdefghijklmnopqrstuvwxyz";
const regexp0 = /xyz/i; // regular expression variable /xyz/ with case-insensitive match i-flag 
console.log(regexp0.test(alpha));
// -> true
console.log(regexp0.exec(alpha));
// -> ['xyz']
const regexp1 = /[xyz]/g;
console.log(regexp1.exec(alpha));
// -> ['x']
const regexp2 = /([xyz])/g;
console.log(regexp2.exec(alpha));
// -> ['x', 'x']
//----------------------------------------------------------------------------------------------------------
console.log("#--- RegExp Constructor ---");
const regEx = new RegExp(/abc/, "i");
console.log(regEx.test(alpha));
// -> true
console.log(regEx.exec(alpha));
// -> ['abc']
//----------------------------------------------------------------------------------------------------------
console.log("#--- Anchor ---");
const regExp11 = /^[a-c]/;
const regExp12 = /z$/;
const regExp13 = /[x-z]\b/;

console.log(regExp11.test(alpha));
// -> true
console.log(regExp11.exec(alpha));
// -> ['a']

console.log(regExp12.test(alpha));
// -> true
console.log(regExp12.exec(alpha));
// -> ['z']

console.log(regExp13.test(alpha));
// -> true
console.log(regExp13.exec(alpha));
// -> ['z']
//----------------------------------------------------------------------------------------------------------
console.log("#--- Quantifiers ---");
const regexp = /(x+y*z?){2,6}/;

const strQuantifierTest = "xyzxzzzxy";
console.log(regexp.test(strQuantifierTest));
// -> true
console.log(regexp.exec(strQuantifierTest));
// -> ['xyzxz', 'xz']

const strQuantifierTestII = "xyzzzxyz";
console.log(regexp.test(strQuantifierTestII));
// -> false
console.log(regexp.exec(strQuantifierTestII));
// -> null
// regular expression rule demands that it cannot be two times `z` in a row (before expression repeates at least 2 times {2,6} while up to 6 times is optional) 
// because if you have z more then once, you should have x before z in those 2 times minimum. That expression pattern is required to repeat 2 times minimum.
//----------------------------------------------------------------------------------------------------------
console.log("#--- OR Operator ---");
const regexOr = /(?:i|j|k)/; // esuvalent as /[abc]/

console.log(regexOr.test(alpha));
// -> true
console.log(alpha.match(regexOr));
// -> ['i']

const regexOrName = /^Stan(ley|ford)?$/;

console.log(regexOrName.test("ford"));
// -> false
console.log(regexOrName.exec("ford"));
// -> null

console.log(regexOrName.test("Stanley"));
// -> true
console.log(regexOrName.exec("Stanley"));
// -> ['Stanley', 'ley']

console.log(regexOrName.test("Stanford"));
// -> true
console.log(regexOrName.exec("Stanford"));
// -> ['Stanford', 'ford']

console.log(regexOrName.test("Standard"));
// -> false
console.log(regexOrName.exec("Standard"));
// -> null

const regexOrEmail = /^([\w.]+)@([\w.]+)\.(com|edu|net)$/;
console.log(regexOrEmail.test("spope.mails@gmail.com"));
// -> true
console.log(regexOrEmail.exec("spope.mails@gmail.com"));
// -> ['spope.mails@gmail.com', 'spope.mails', 'gmail', 'com']
// this regex match email composition in three capturing groups from which last one giving the options to end domain address with .com, .edu or .net

// if -> else statement for regex test return 
const testRegex = regexOrEmail.test("spope.mails@gmail.com");
(!testRegex) ? console.log(`regex returned -> ${testRegex}`) : console.log(`regex returned -> ${testRegex}`);
// -> regex returned -> true

console.log("#--- Replace URL ---");
const regexURL = /^(https?:\/\/)?([\da-z\.-]+)(\.[a-z\.]{2,6})([\/\w\.-]*)*\/?$/;
const strURL = "https://www.codexdev.net/index.html";
console.log(strURL.replace(regexURL, `$1$2$3/regex-intro.html`));
// -> https://www.codexdev.org/regex-intro.html
const dis = strURL.split(regexURL);
console.log(dis);
// -> ['', 'https://', 'www.codexdev', '.net', '/index.html', '']
console.log(`Regex file name: ${dis[4].replace("\/", "")}`);
// -> Regex file name: index.html

const regexParam = /^(https?:\/\/)?(w{3})?\.([a-z0-9\.-]*)\.(com|net|edu|biz|co)\/?(\w*\.?\w*?)*?\/?(\w*)\/?([0-9])*?\/?([0-9])*\/?$/;
const strParamURL = "https://www.codexdev.net/software/api/1/2";
const ans = strParamURL.split(regexParam);
console.log(ans);
// ->  ['', 'https://', 'www', 'codexdev', 'net', 'software', 'api', '1', '2', '']
console.log(strParamURL.replace(regexParam, `idFirst = $7\nidSecond = $8`));
// -> idFirst = 1
// -> idSecond = 2
console.log(`Parameter at group #7 is: ${ans[7]}\nParameter at group #8 is: ${ans[8]}`);
// -> Parameter at group #7 is: 1
// -> Parameter at group #8 is: 2

const regexParamURL0 = /^(https?:\/\/)?(w{3})?\.([a-z0-9\.-]*)\.(com|net|edu|biz|co)\/?(\w*\.?\w*?)*?\/(\w*)\/?(\w)*\/?([\w\%20\w]*)*\/?$/;

const strParamURL0 = "https://www.codexdev.net/software/api/1/John%20Doe";
const idURL0 = strParamURL0.replace(regexParamURL0, `$7 $8`);
console.log(strParamURL0);
// -> https://www.codexdev.net/software/api/1/John%20Doe
console.log(idURL0.split(" "));
// -> ['1', 'John%20Doe']
(!idURL0.split(" ")[0] || !idURL0.split(" ")[1]) ? console.log(`Error URL id OR fullName OR both parameter(s) not provided!`) : console.log(`Id: ${idURL0.split(" ")[0]}\nfullName: ${idURL0.split(" ")[1].split("%20").join(" ")}`);
// -> Id: 1
// -> fullName: John Doe
const strParamURL1 = "https://www.codexdev.net/software/api/2";
const idURL1 = strParamURL1.replace(regexParamURL0, `$7 $8`);
console.log(strParamURL1);
// -> https://www.codexdev.net/software/api/2
console.log(idURL1.split(" "));
// -> ['2', '']
(!idURL1.split(" ")[0] || !idURL1.split(" ")[1]) ? console.log(`Error URL id OR fullName OR both parameter(s) not provided!`) : console.log(`Id: ${idURL1.split(" ")[0]}\nfullName: ${idURL1.split(" ")[1].split("%20").join(" ")}`);
// -> Error URL id OR fullName OR both parameter(s) not provided!
//----------------------------------------------------------------------------------------------------------
//const re1 = str1.startsWith(/foo/);
//const re2 = str1.endsWith(/bar/);
//const wspc = str1.includes(/\s/);
// TypeError: First argument to String.prototype.includes must not be a regular expression
//----------------------------------------------------------------------------------------------------------


import { author, user } from '@d2phap/npm-package-template';

// print out the values
const el = document.getElementById('content');
el.innerHTML = `NPM module data:<br/>
<pre>author = <code>${JSON.stringify(author, null, 2)}</code></pre>
<pre>user = <code>${JSON.stringify(user, null, 2)}</code></pre
`;

console.log(author, user);

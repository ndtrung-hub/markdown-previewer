import "./App.css";
import { useEffect, useState } from "react";
import { marked } from "marked";

function App() {
  const [value, setValue] = useState(placeholderInit);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    // script.src =
    //   "https://cdnjs.cloudflare.com/ajax/libs/marked/4.0.2/marked.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function handleChange(event) {
    setValue(event.target.value);
  }

  const renderer = new marked.Renderer();

  console.log(marked(value, { sanitize: false }));
  console.log(value);
  return (
    <div className="App">
      <div className="container" id="text-container">
        <textarea
          id="editor"
          placeholder={value}
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className="container" id="output-container">
        <div
          id="preview"
          dangerouslySetInnerHTML={{
            __html: marked(marked(value, { sanitize: true, breaks: true }), {
              renderer: renderer,
            }),
          }}
        />
      </div>
    </div>
  );
}

const placeholderInit = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export default App;

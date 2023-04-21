const aceEditor = document.querySelector("#aceEditor");
const aceOutput = document.querySelector("#aceOutput");
let selectedLanguage = "js";

const LANGUAGES = {
  js: "ace/mode/javascript",
  php: "ace/mode/php",
  undefined: "ace/mode/text",
};

ace.edit(aceOutput, {
  theme: "ace/theme/monokai",
  mode: "ace/mode/sh",
  showPrintMargin: false,
  readOnly: true,
  showGutter: false,
  fontFamily: "Fira Code",
  highlightActiveLine: false,
});

ace.edit(aceEditor, {
  theme: "ace/theme/monokai",
  showPrintMargin: false,
  fontFamily: "Fira Code",
  readOnly: false,
  mode: LANGUAGES[selectedLanguage],
});

const appendOutput = (str, breakeLines = 1) => {
  output.session.insert(
    {
      row: output.session.getLength(),
      column: 0,
    },
    str + "\n".repeat(breakeLines)
  );
};

const editor = ace.edit("aceEditor");
const output = ace.edit("aceOutput");

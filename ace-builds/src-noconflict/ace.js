// pass options to ace.edit
ace.edit(element, {
  mode: "ace/mode/javascript",
  selectionStyle: "text",
});
// use setOptions method to set several options at once
editor.setOptions({
  autoScrollEditorIntoView: true,
  copyWithEmptySelection: true,
});
// use setOptions method
editor.setOption("mergeUndoDeltas", "always");

// some options are also available as methods e.g.
editor.setTheme("monkai");

// to get the value of the option use
editor.getOption("optionName");

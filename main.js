const UUID = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
  (
    c ^
    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
  ).toString(16)
);

let timeOut = null;

document.querySelector("#langs").addEventListener("click", (e) => {
  last = selectedLanguage;
  e.target.parentElement.querySelectorAll("span").forEach((element) => {
    if (element !== e.target) {
      element.classList.remove("selected");
      return true;
    }

    selectedLanguage = e.target.getAttribute("lang");
    localStorage.setItem("lang", selectedLanguage);
    e.target.classList.add("selected");
    document.title = selectedLanguage + " Online Editor";
  });

  editor.session.setMode(LANGUAGES[selectedLanguage]);
  if (last != selectedLanguage)
    appendOutput(`\n\n# language changed ${selectedLanguage} <- ${last}`, 0);
});

const execute = async () => {
  formData = new FormData();

  formData.append("UUID", UUID);
  formData.append("code", editor.getValue());
  formData.append("lang", selectedLanguage);

  fetch("https://apoloray.freeddns.org:5050/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      appendOutput("", 2);
      appendOutput(`# ${UUID}.${selectedLanguage} ${data.executionTime}ms`);
      appendOutput(data.stdout ? data.stdout.trim() : data.stderr.trim(), 0);
    });
};

(() => {
  if (localStorage.getItem("code"))
    editor.insert(localStorage.getItem("code").trim());

  selectedLanguage = localStorage.getItem("lang");
  if (!selectedLanguage) selectedLanguage = "JS";
  editor.session.setMode(LANGUAGES[selectedLanguage]);

  document.title = selectedLanguage + " Online Editor";
  document
    .querySelector("#langs")
    .querySelectorAll("span")
    .forEach((element) =>
      element.getAttribute("lang") === selectedLanguage
        ? element.classList.add("selected")
        : null
    );

  appendOutput(`# the ${selectedLanguage} output will be displayed here`);

  editor.session.on("change", function () {
    if (timeOut) clearTimeout(timeOut);

    timeOut = setTimeout(
      () => localStorage.setItem("code", editor.getValue()),
      800
    );
  });
})();

(() => {
  appendOutput("# ready to code 😎", 0);

  document.querySelector("#execute").addEventListener("click", execute);
  document.addEventListener("keydown", (e) => {
    if (e.key.toLocaleLowerCase() === "s" && e.ctrlKey) {
      e.preventDefault();
      execute();
    }
  });
})();

document.querySelector("#download").addEventListener("click", () =>
  saveAs(
    new Blob([editor.getValue()], {
      type: "text/plain;charset=utf-8",
    }),
    `${UUID.split("-")[0]}.${selectedLanguage.toLowerCase()}`
  )
);

import { saveAs } from "file-saver";
import md2docx from "./md2docx";

const fileInput = document.getElementById("markdownFile");
const convertButton = document.getElementById("convertButton");
convertButton.addEventListener("click", (e) => {
  var file = fileInput.files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = async function (evt) {
      const text = evt.target.result;
      const converted = await md2docx(text);
      saveAs(converted, "test.docx");
    };
    reader.onerror = function (evt) {
      console.log(evt);
    };
  }
});

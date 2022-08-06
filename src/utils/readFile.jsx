const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export default async function readFile(event) {
  var file = event.dataTransfer.files[0];
  var reader = new FileReader();
  reader.onload = function (evt) {
    
  };

  let content = null;

  reader.readAsText(file);
  setTimeout(() => (content = reader.result), 500);
  await delay(500);

  return content;
}

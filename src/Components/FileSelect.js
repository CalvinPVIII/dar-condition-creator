const { ipcRenderer } = window.require("electron");
export default function FileSelect() {
  const onFileUpload = async (e) => {
    ipcRenderer.invoke("convertFile", e.target.files[0].path).then((result) => {
      console.log(result);
      if (result === "Success") {
        ipcRenderer.invoke("getItemsFromXml").then((res) => {
          console.log(res);
        });
      } else {
        return "error";
      }
    });
  };

  const test = () => {
    console.log("test");
    ipcRenderer.send("test", "hello");
  };
  return (
    <>
      Select File
      <input
        type="file"
        onChange={(e) => onFileUpload(e)}
        accept=".esp, .esl, .esm"
      />
      <button onClick={test}>Test Button</button>
    </>
  );
}

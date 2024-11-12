async function extractAndFetchData() {
  const inputText = document.getElementById("inputText").value;
  const lines = inputText.split("\n"); // Tách các dòng

  let table = "<table>";
  table += "<tr><th>Cột 1</th><th>Cột 2</th><th>Cột 3</th><th>Code</th><th>Lifetime</th></tr>";

  for (const line of lines) {
    const parts = line.split("|");
    const col1 = parts[0] || "";
    const col2 = parts[1] || "";
    const col3 = parts[2] || "";

    let code = "";
    let lifetime = "";

    if (col3) {
      try {
        const response = await fetch(`https://api.code.pro.vn/2fa/v1/get-code?secretKey=${col3}`);
        if (response.ok) {
          const data = await response.json();
          code = data.Code || "";
          lifetime = data.lifetime || "";
        } else {
          console.error("Lỗi API:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error.message);
      }
    }

    table += `<tr><td>${col1}</td><td>${col2}</td><td>${col3}</td><td>${code}</td><td>${lifetime}</td></tr>`;
  }

  table += "</table>";
  document.getElementById("output").innerHTML = table;
}

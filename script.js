function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('active');
}
async function initializeScanner() {
  const res = await fetch("/api/create-scan-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  const data = await res.json();

  const widget = new BodygramScanningWidget("scanner", {
    scanToken: data.token,
    systemOfMeasurement: "metric",
    onResult: (result) => {
      console.log("Scan result:", result);
      document.getElementById("results").innerText = JSON.stringify(result, null, 2);
    }
  });

  widget.insert();
}

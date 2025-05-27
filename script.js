function toggleMenu() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('active');
}
async function initializeScanner() {
  try {
    const response = await fetch("/api/create-scan-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    console.log("Token response:", data);

    if (!data.token) {
      alert("❌ No token received. Check backend or API key.");
      return;
    }

    const widget = new BodygramScanningWidget("scanner", {
      scanToken: data.token,
      systemOfMeasurement: "metric",
      onLoad: () => console.log("Scanner loaded"),
      onResult: (result) => {
        console.log("Scan result:", result);
        document.getElementById("results").innerText = JSON.stringify(result, null, 2);
      },
      onError: (error) => console.error("Scan error:", error)
    });

    widget.insert();

  } catch (err) {
    console.error("Failed to initialize scanner:", err);
  }
}


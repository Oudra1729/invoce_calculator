import React, { useState } from "react";

const InvoiceCalculator: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string>(""); // Code input by the user
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false); // Authorization state

  const [ttc, setTtc] = useState<string>(""); // TTC value as a string
  const [tva, setTva] = useState<string>(""); // TVA value as a string
  const [ht, setHt] = useState<number | null>(null); // HT value as a number
  const [tvaAmount, setTvaAmount] = useState<number | null>(null); // TVA amount as a number

  const correctCode = "test12345";

  const handleAccessCodeSubmit = () => {
    if (accessCode === correctCode) {
      setIsAuthorized(true);
    } else {
      alert("Invalid code! Please try again.");
    }
  };

  const calculateInvoice = () => {
    const ttcValue = parseFloat(ttc);
    const tvaValue = parseFloat(tva);

    if (isNaN(ttcValue) || isNaN(tvaValue) || ttcValue <= 0 || tvaValue < 0) {
      alert("Please enter valid numbers!");
      return;
    }

    const htValue = ttcValue / (1 + tvaValue / 100);
    const tvaAmountValue = ttcValue - htValue;

    setHt(parseFloat(htValue.toFixed(2)));
    setTvaAmount(parseFloat(tvaAmountValue.toFixed(2)));
  };

  const printInvoice = () => {
    const ttcValue = ttc || "0.00";
    const htValue = ht?.toFixed(2) || "0.00";
    const tvaAmountValue = tvaAmount?.toFixed(2) || "0.00";
  
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}.${String(
      today.getMonth() + 1
    ).padStart(2, "0")}.${today.getFullYear()}`;
  
    const invoiceHTML = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .container {
              max-width: 600px;
              margin: auto;
            }
            .header {
              text-align: left;
            }
            .details, .totals {
              margin-top: 20px;
            }
            .totals div {
              display: flex;
              justify-content: space-between;
            }
            .logo {
              width: 100px;
              height: 55px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-11-21%20at%2013.17.35_f9cc8a9c.jpg-P1mfU5bK7OB4loTdxaXHW12SQUIz1M.jpeg"
                alt="Logo"
                class="logo"
              />
              <h2>CAMIONS DEPANNAGE PLATEAUX - AIDE AUX CONSTAT AMIABLE</h2>
              <p>OUARZAZATE</p>
              <p>LE : ${formattedDate}</p>
            </div>
            <div class="details">
              <h3>FACTURE :N°00316/2024</h3>
              <p><strong>ICE:</strong> 001538130000070</p>
              <p><strong>NOM DU BENEFICIERE:</strong> CMPF OUARZAZATE</p>
              <p><strong>VEHICULE:</strong> PEUGEOT</p>
              <p><strong>FRAIS D'ATTENT SUR TANGER MED 3 HOURS:</strong> 3500.00 DH</p>
            </div>
            <div class="totals">
              <div><strong>Total H.T:</strong> ${htValue} DH</div>
              <div><strong>Total T.V.A:</strong> ${tvaAmountValue} DH</div>
              <div><strong>Montant Total T.T.C:</strong> ${ttcValue} DH</div>
            </div>
            <p><strong>Arrêté La Présente Facture À La Somme De TROIS MILLE CINQ CENTS DH</strong></p>
            <footer>
              <p>Assistance AUTO-PRESTIGE</p>
            </footer>
          </div>
        </body>
      </html>
    `;
  
    const printWindow = window.open("", "_blank");
  
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      printWindow.addEventListener("load", () => {
        printWindow.print();
      });
    } else {
      alert("Failed to open print window. Please allow popups for this site.");
    }
  };
  

  if (!isAuthorized) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <h1>Enter Access Code</h1>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="password"
            placeholder="Enter code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            style={{ padding: "10px", width: "200px" }}
          />
        </div>
        <button
          onClick={handleAccessCodeSubmit}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Invoice Calculator</h1>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="ttc">
          Montant Total T.T.C (TTC):
          <input
            id="ttc"
            type="number"
            value={ttc}
            onChange={(e) => setTtc(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="tva">
          Taux T.V.A (%):
          <input
            id="tva"
            type="number"
            value={tva}
            onChange={(e) => setTva(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
          />
        </label>
      </div>
      <button
        onClick={calculateInvoice}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Calculer
      </button>
      <div
        id="invoice"
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid black",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Invoice Details</h2>
        <p>
          <strong>Total H.T:</strong> {ht !== null ? `${ht} DH` : "0.00 DH"}
        </p>
        <p>
          <strong>Total T.V.A:</strong> {tvaAmount !== null ? `${tvaAmount} DH` : "0.00 DH"}
        </p>
        <p>
          <strong>Montant Total T.T.C:</strong> {ttc || "0.00"} DH
        </p>
      </div>
      <button
        onClick={printInvoice}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Print Invoice
      </button>
    </div>
  );
};

export default InvoiceCalculator;

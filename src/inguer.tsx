import React, { useState } from "react";

const InvoiceCalculator: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const [ttc, setTtc] = useState<string>("");
  const [tva, setTva] = useState<string>("");
  const [ht, setHt] = useState<number | null>(null);
  const [tvaAmount, setTvaAmount] = useState<number | null>(null);

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

    if (isNaN(ttcValue) || isNaN(tvaValue) || ttcValue < 0 || tvaValue < 0) {
      alert("Please enter valid numbers!");
      return;
    }

    if (ttcValue === 0) {
      setHt(0);
      setTvaAmount(0);
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
         
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
            .container { max-width: 800px; margin: auto; padding: 20px; }
            .header, .footer { position: relative; height: 64px; margin-bottom: 32px; }
            .stripe { position: absolute; left: 0; right: 0; height: 8px; }
            .stripe-1 { top: 0; background-color: #1d4ed8; }
            .stripe-2 { top: 8px; background-color: #dc2626; height: 4px; }
            .stripe-3 { bottom: 8px; background-color: #dc2626; height: 4px; }
            .stripe-4 { bottom: 0; background-color: #1d4ed8; }
            .curve { position: absolute; left: 0; top: 0; height: 64px; width: 96px; border-left: 30px solid #dc2626; border-bottom-right-radius: 100px; }
            .logo { width: 120px; height: 80px; margin: 0 auto 16px; display: block; }
            .title { text-align: center; color: #1e3a8a; font-size: 24px; font-weight: bold; margin-bottom: 8px; }
            .subtitle { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 32px; }
            .invoice-number { font-size: 18px; font-weight: bold; margin-bottom: 24px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            td { border: 1px solid #9ca3af; padding: 8px; }
            .total { font-weight: bold; margin-bottom: 32px; }
            .signature { text-align: right; font-style: italic; margin-bottom: 32px; }
            .footer-text { text-align: center; font-size: 14px; line-height: 1.5; margin-bottom: 32px; }
            .footer-decoration { display: flex; justify-content: center; gap: 64px; margin-bottom: 16px; }
            .circle { width: 32px; height: 32px; border: 4px solid #dc2626; border-radius: 50%; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="stripe stripe-1"></div>
              <div class="stripe stripe-2"></div>
              <div class="stripe stripe-3"></div>
              <div class="stripe stripe-4"></div>
              <div class="curve"></div>
            </div>

            <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-11-21%20at%2013.17.35_f9cc8a9c.jpg-P1mfU5bK7OB4loTdxaXHW12SQUIz1M.jpeg"
                alt="Logo"
                class="logo"
              />
            <h1 class="title">CAMIONS DEPANNAGE PLATEAUX - AIDE AUX CONSTATAT AMIABLE</h1>
            <div class="subtitle">
              <span>OUARZAZATE</span>
              <span>LE: ${formattedDate}</span>
            </div>

            <h2 class="invoice-number">FACTURE :N°00316/2024</h2>

            <table>
              <tr>
                <td>ICE :</td>
                <td>001538130000070</td>
              </tr>
              <tr>
                <td>NOM DU BENEFICIERE</td>
                <td>CMPF OUARZAZATE</td>
              </tr>
              <tr>
                <td>VEHICULE :PEUGEOT</td>
                <td>I.M.M : CY-529-R1</td>
              </tr>
              <tr>
                <td>FRAIS D'ATTENT SUR TANGER MED 3 HOURS</td>
                <td>${ttcValue} DH</td>
              </tr>
              <tr>
                <td>TOTAL. H.T</td>
                <td>${htValue} DH</td>
              </tr>
              <tr>
                <td>TOTAL . T.V.A</td>
                <td>${tvaAmountValue} DH</td>
              </tr>
              <tr>
                <td>MONTANT TOTAL T.T.C</td>
                <td>${ttcValue} DH</td>
              </tr>
            </table>

            <p class="total">Arrêté La Présente Facture À La Somme De ${ttcValue} DH</p>

            <p class="signature">Assistance AUTO-PRESTIGE</p>

            <div class="footer-text">
              <p><i>R. N°09 DOUAR TAFERZOUTE COMMUNE IGHREM N'OUGDAL OUARZAZATE</i></p>
              <p>Tél : +212 661 40 38 17 / +212 661 85 51 59 - Email : <u>assistance.prestige@gmail.com</u></p>
              <p>RC N° 10573 - IF N° 37723370 - Patente N° 47163051 - CNSS N°7435295 - ICE N° 003538078000075</p>
            </div>

            <div class="footer">
              <div class="stripe stripe-4"></div>
              <div class="stripe stripe-3"></div>
            </div>

            <div class="footer-decoration">
              <div class="circle"></div>
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
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
      <div className="font-sans p-6">
        <h1 className="text-2xl font-bold mb-4">Enter Access Code</h1>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="p-2 border rounded w-full max-w-xs"
          />
        </div>
        <button
          onClick={handleAccessCodeSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans p-6">
      <h1 className="text-2xl font-bold mb-4">Invoice Calculator</h1>
      <div className="mb-4">
        <label htmlFor="ttc" className="block mb-2">
          Montant Total T.T.C (TTC):
          <input
            id="ttc"
            type="number"
            value={ttc}
            onChange={(e) => setTtc(e.target.value)}
            className="ml-2 p-2 border rounded w-full max-w-xs"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="tva" className="block mb-2">
          Taux T.V.A (%):
          <input
            id="tva"
            type="number"
            value={tva}
            onChange={(e) => setTva(e.target.value)}
            className="ml-2 p-2 border rounded w-full max-w-xs"
          />
        </label>
      </div>
      <button
        onClick={calculateInvoice}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        Calculer
      </button>
      <div
        id="invoice"
        className="mt-8 p-6 border rounded-lg bg-gray-50"
      >
        <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
        <p className="mb-2">
          <strong>Total H.T:</strong> {ht !== null ? `${ht} DH` : "0.00 DH"}
        </p>
        <p className="mb-2">
          <strong>Total T.V.A:</strong> {tvaAmount !== null ? `${tvaAmount} DH` : "0.00 DH"}
        </p>
        <p className="mb-2">
          <strong>Montant Total T.T.C:</strong> {ttc || "0.00"} DH
        </p>
      </div>
      <button
        onClick={printInvoice}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Print Invoice
      </button>
    </div>
  );
};

export default InvoiceCalculator;


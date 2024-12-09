import React, { useState } from 'react';
import { convertToWordsAndDirhams } from './convert';
import './App.css';

const InvoiceCalculator: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [ttc, setTtc] = useState<string>("");
  const [fra, setFra] = useState<string>("");
  const [ice, setIce] = useState<string>("");
  const [num, setNum] = useState<string>("");
  const [imm, setImm] = useState<string>("");
  const [vehicule, setVehicule] = useState<string>("");
  const [nomben, setNomben] = useState<string>("");
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
    // Define default values for variables
    const ttcValue = ttc || "0.00";
    const frais = fra || "0.00";
    const iceValue = ice || "0.00";
    const numverFacture = num || "0.00";
    const htValue = ht?.toFixed(2) || "0.00";
    const tvaAmountValue = tvaAmount?.toFixed(2) || "0.00";
    const vehiculeValue = vehicule || "N/A";
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}.${String(
      today.getMonth() + 1
    ).padStart(2, "0")}.${today.getFullYear()}`;
  
    // Construct the HTML for the invoice
    const invoiceHTML = `
     <html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans m-0 p-0">
  <div class="max-w-3xl mx-auto p-5">
    <img
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202024-11-21%20at%2013.17.35_f9cc8a9c.jpg-P1mfU5bK7OB4loTdxaXHW12SQUIz1M.jpeg"
      alt="Logo"
      class="w-52 h-24 mx-auto mb-4"
    />
    <h1 class="text-center text-blue-800 font-bold text-xl mb-2">
      CAMIONS DEPANNAGE PLATEAUX - AIDE AUX CONSTATAT AMIABLE
    </h1>
    <div class="flex justify-between text-sm mb-8">
      <span>OUARZAZATE</span>
      <span>LE: ${formattedDate}</span>
    </div>

    <h2 class="text-lg font-bold mb-6">FACTURE :N°0${numverFacture}/2024</h2>

    <table class="w-full border border-gray-300 mb-6">
      <tr>
        <td class="border border-gray-300 p-2">ICE :</td>
        <td class="border border-gray-300 p-2">${iceValue}</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-2">NOM DU BENEFICIERE</td>
        <td class="border border-gray-300 p-2">${nomben}</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-2">VEHICULE : ${vehiculeValue}</td>
        <td class="border border-gray-300 p-2">I.M.M : ${imm}</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-2">FRAIS D'ATTENTE SUR ${frais}</td>
        <td class="border border-gray-300 p-2">${ttcValue} DH</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-2">TOTAL. H.T</td>
        <td class="border border-gray-300 p-2">${htValue} DH</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-2">TOTAL . T.V.A</td>
        <td class="border border-gray-300 p-2">${tvaAmountValue} DH</td>
      </tr>
      <tr>
        <td class="border border-gray-300 p-2">MONTANT TOTAL T.T.C</td>
        <td class="border border-gray-300 p-2">${ttcValue} DH</td>
      </tr>
    </table>

    <p class="mb-16">Arrêté La Présente Facture À La Somme De : <br> ${convertToWordsAndDirhams(parseFloat(ttcValue))}</p>

    <div class="w-48 h-48 mx-auto "></div>

    <div class="border-t-2 border-gray-300 my-4"></div>

    <div class="text-center text-sm leading-relaxed">
      <p><i>R. N°09 DOUAR TAZEGZAOUTE COMMUNE IGHREM N'OUGDAL OUARZAZATE</i></p>
      <p>Tél : +212 661 40 38 17 / +212 661 85 51 59 - Email : <u>assistance.prestige@gmail.com</u></p>
      <p>RC N° 10573 - IF N° 37723370 - Patente N° 47163051 - CNSS N°7435295 - ICE N° 003538078000075</p>
    </div>
  </div>
</body>
</html>

    `;
  
    // Open a new window and print the invoice
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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'linear-gradient(to bottom, #f3f4f6, #e5e7eb)'
      }}>
        <div style={{
          width: '700vh',
          maxWidth: '400px',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>Enter Access Code</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="accessCode" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>Access Code</label>
            <input
              id="accessCode"
              type="password"
              placeholder="Enter code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.25rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          <button 
            onClick={handleAccessCodeSubmit}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '200vh',
      padding: '2rem',
      background: 'linear-gradient(to bottom, #f3f4f6, #e5e7eb)'
    }}>
      <div style={{
        maxWidth: '42rem',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1f2937',
          marginBottom: '1.5rem'
        }}>
          Invoice Calculator
        </h1>
        <div style={{
          display: 'grid',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div>
              <label htmlFor="ttc" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Montant Total T.T.C (TTC)</label>
              <input
                id="ttc"
                type="number"
                value={ttc}
                onChange={(e) => setTtc(e.target.value)}
                placeholder="Enter TTC amount"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <div>
              <label htmlFor="tva" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Taux T.V.A (%)</label>
              <input
                id="tva"
                type="number"
                value={tva}
                onChange={(e) => setTva(e.target.value)}
                placeholder="Enter TVA rate"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <div>
              <label htmlFor="vehicule" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Vehicule</label>
              <input
                id="vehicule"
                type="text"
                value={vehicule}
                onChange={(e) => setVehicule(e.target.value)}
                placeholder="Enter vehicle details"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <div>
              <label htmlFor="imm" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>I.M.M</label>
              <input
                id="imm"
                type="text"
                value={imm}
                onChange={(e) => setImm(e.target.value)}
                placeholder="Enter IMM"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <div>
              <label htmlFor="ice" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>ICE</label>
              <input
                id="ice"
                type="text"
                value={ice}
                onChange={(e) => setIce(e.target.value)}
                placeholder="Enter ICE"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <div>
              <label htmlFor="nomben" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>NOM DU BENEFICIERE</label>
              <input
                id="nomben"
                type="text"
                value={nomben}
                onChange={(e) => setNomben(e.target.value)}
                placeholder="Enter beneficiary name"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <div>
              <label htmlFor="num" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Numbrer Facture</label>
              <input
                id="num"
                type="number"
                value={num}
                onChange={(e) => setNum(e.target.value)}
                placeholder="Enter a number"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <div>
              <label htmlFor="fra" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>FRAIS D'ATTENTE SUR :</label>
              <input
                id="fra"
                type="text"
                value={fra}
                onChange={(e) => setFra(e.target.value)}
                placeholder="Enter farais d'attant "
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>
        </div>

        <button 
          onClick={calculateInvoice}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <span style={{ marginRight: '0.5rem' }}>📊</span>
          Calculer
        </button>

        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '0.375rem',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>Invoice Details</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <span style={{ fontWeight: '500' }}>Total H.T:</span>
            <span>{ht !== null ? `${ht} DH` : "0.00 DH"}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <span style={{ fontWeight: '500' }}>Total T.V.A:</span>
            <span>{tvaAmount !== null ? `${tvaAmount} DH` : "0.00 DH"}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontWeight: '500' }}>Montant Total T.T.C:</span>
            <span>{ttc || "0.00"} DH</span>
          </div>
        </div>

        <button 
          onClick={printInvoice}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: 'white',
            color: '#3b82f6',
            border: '1px solid #3b82f6',
            borderRadius: '0.25rem',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ marginRight: '0.5rem' }}>🖨️</span>
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceCalculator;


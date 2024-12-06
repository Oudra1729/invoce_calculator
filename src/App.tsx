import React, { useState } from 'react';
import { convertToWordsAndDirhams } from './convert';
import './App.css';

const InvoiceCalculator: React.FC = () => {
  const [accessCode, setAccessCode] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [ttc, setTtc] = useState<string>("");
  const [ice, setIce] = useState<string>("");
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
    const iceValue = ice || "0.00";
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
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 800px;
              margin: auto;
              padding: 20px;
            }
            .header, .footer {
              position: relative;
              height: 64px;
              margin-bottom: 32px;
            }
            .stripe {
              position: absolute;
              left: 0;
              right: 0;
              height: 8px;
            }
            .stripe-1 {
              top: 0;
              background-color: #1d4ed8;
            }
            .stripe-2 {
              top: 8px;
              background-color: #dc2626;
              height: 4px;
            }
            .stripe-3 {
              bottom: 8px;
              background-color: #dc2626;
              height: 4px;
            }
            .stripe-4 {
              bottom: 0;
              background-color: #1d4ed8;
            }
            .curve {
              position: absolute;
              left: 0;
              top: 0;
              height: 64px;
              width: 96px;
              border-left: 30px solid #dc2626;
              border-bottom-right-radius: 100px;
            }
            .logo {
              width: 200px;
              height: 100px;
              margin: 0 auto 16px;
              display: block;
            }
            .title {
              text-align: center;
              color: #1e3a8a;
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 8px;
            }
            .subtitle {
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              margin-bottom: 32px;
            }
            .invoice-number {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 24px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 24px;
            }
            td {
              border: 1px solid #9ca3af;
              padding: 8px;
            }
           .total {
  
  margin-bottom: 64px; /* Add more space below the total */
}

.footer-line {
  border-top: 2px solid #9ca3af; /* Add a line above the footer */
  margin-bottom: 16px; /* Add space between the line and footer */
}

.footer-text {
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 5px;
  margin-top: 16px; /* Adjust for more spacing after the line */
}
.emplty{
  text-align: center;
  width:200px;
  height:200px; 
  }
            .footer-decoration {
              display: flex;
              justify-content: center;
              gap: 64px;
              margin-bottom: 16px;
            }
            .circle {
              width: 32px;
              height: 32px;
              border: 4px solid #dc2626;
              border-radius: 50%;
            }
          </style>
        </head>
        <body>
          <div class="container">
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
                <td>${iceValue}</td>
              </tr>
              <tr>
                <td>NOM DU BENEFICIERE</td>
                <td>${nomben}</td>
              </tr>
              <tr>
                <td>VEHICULE : ${vehiculeValue}</td>
                <td>I.M.M : ${imm}</td>
              </tr>
              <tr>
                <td>FRAIS D'ATTENTE SUR TANGER MED 3 HOURS</td>
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
             <p class="total">Arrêté La Présente Facture À La Somme De : <br> ${convertToWordsAndDirhams(parseFloat(ttcValue))}</p>

            <div class="emplty">
          
            </div>

            <div class="footer-line"></div>

            <div class="footer-text">
              <p><i>R. N°09 DOUAR TAFERZOUTE COMMUNE IGHREM N'OUGDAL OUARZAZATE</i></p>
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


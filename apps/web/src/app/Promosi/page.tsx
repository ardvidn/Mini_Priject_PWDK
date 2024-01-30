import React from 'react';

const Promosi = ({ kodeReferral, diskon, tanggalBerlaku }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-md mb-4">
      <h2 className="text-lg font-semibold">Promosi</h2>
      <p>Kode Referral: {kodeReferral}</p>
      <p>Diskon: {diskon}%</p>
      <p>Sisa Voucher: {tanggalBerlaku}</p>
    </div>
  );
};

export default Promosi;

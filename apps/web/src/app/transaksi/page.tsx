import React from 'react';
import Acara from '../Acara/page';
import Promosi from '../Promosi/page';

const TransaksiAcaraPromosi = () => {
  // Data acara dan promosi (dapat diperoleh dari API atau hard-coded)
  const acara = {
    nama: 'Nama Acara',
    harga: 100000,
    tanggal: '30 Januari 2024',
    waktu: '08:00 - 10:00',
    lokasi: 'Lokasi Acara',
    deskripsi: 'Deskripsi Acara',
    kursiTersedia: 100,
    jenisTiket: 'berbayar', // atau 'gratis'
  };

  const promosi = {
    kodeReferral: 'ABC123',
    diskon: 10,
    tanggalBerlaku: '30 Januari - 1 Februari 2024',
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">
        Transaksi Acara dan Promosi
      </h1>
      <Acara {...acara} />
      <Promosi {...promosi} />
    </div>
  );
};

export default TransaksiAcaraPromosi;

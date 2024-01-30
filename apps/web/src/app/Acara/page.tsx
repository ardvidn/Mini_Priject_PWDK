import React from 'react';

const Acara = ({
  nama,
  harga,
  tanggal,
  waktu,
  lokasi,
  deskripsi,
  kursiTersedia,
  jenisTiket,
}) => {
  return (
    <div className="p-4 border border-gray-300 rounded-md mb-4">
      <h2 className="text-lg font-semibold">{nama}</h2>
      <p>{harga} IDR</p>
      <p>
        {tanggal}, {waktu}
      </p>
      <p>{lokasi}</p>
      <p>{deskripsi}</p>
      <p>{kursiTersedia} kursi tersedia</p>
      <p>{jenisTiket === 'gratis' ? 'Acara Gratis' : 'Acara Berbayar'}</p>
    </div>
  );
};

export default Acara;

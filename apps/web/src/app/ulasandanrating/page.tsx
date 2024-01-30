// untuk menampilkan komponen ulasan dan rating acara.
import React from 'react';

import UlasanAcara from '../UlasanAcara/page';

const UlasanRatingAcara = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Ulasan dan Rating Acara</h1>
      <UlasanAcara />
    </div>
  );
};

export default UlasanRatingAcara;

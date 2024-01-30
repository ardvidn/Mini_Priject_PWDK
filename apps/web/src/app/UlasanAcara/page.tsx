import React from 'react';

const UlasanAcara = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-md mb-4">
      <h2 className="text-lg font-semibold mb-2">Ulasan Acara</h2>
      {/* Form untuk memberikan ulasan */}
      <form className="mb-4">
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          rows="4"
          placeholder="Tulis ulasan Anda tentang acara ini..."
        ></textarea>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          placeholder="Nama Anda"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Kirim Ulasan
        </button>
      </form>
      {/* Form untuk memberikan rating */}
      <h3 className="text-lg font-semibold mb-2">Rating Acara</h3>
      <div className="flex items-center mb-2">
        <input type="radio" id="sangat-buruk" name="rating" value="1" />
        <label htmlFor="sangat-buruk" className="ml-2">
          Sangat Buruk
        </label>
      </div>
      {/* Tambahkan opsi rating lainnya */}
    </div>
  );
};

export default UlasanAcara;

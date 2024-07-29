// FormSection.jsx
import React, { useState } from 'react';

const FormSection = () => {
  const juzNumbers = Array.from({ length: 30 }, (_, i) => i + 1);
  const [allSelected, setAllSelected] = useState(false)

  const toggleAllJuz = () => {
    const checkboxes = document.getElementsByName('juzSelection');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = !allSelected;
    });
    setAllSelected(!allSelected);
  };

  return (
    <div className="container mx-auto my-10">
      <form id="entry">
        <fieldset className="border p-4">
          <legend className="text-2xl font-bold mb-4">Pengaturan</legend>
          <div className="mb-4">
            <label htmlFor="memberSelection" className="form-label block text-lg mb-2 text-left">Tulis Nama Anggota (Pisahkan dengan Koma)</label>
            <textarea
              className="form-control w-full p-2 border rounded"
              id="memberSelection"
              rows="3"
              placeholder="contoh: Ilham, Ragil, Akhdan"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="form-label block text-lg mb-2">Pilih Juz</label>
            {juzNumbers.map((num) => (
              <div key={num} className="inline-block w-1/6 p-2 text-left pl-12">
                <div className="form-check">
                  <input
                    className="form-check-input mr-2"
                    type="checkbox"
                    value={num}
                    name="juzSelection"
                    id={`juz-${num}`}
                  />
                  <label className="form-check-label" htmlFor={`juz-${num}`}>
                    {num}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-4 flex flex-col items-center">
            <button
              type="button"
              className="btn btn-info bg-blue-500 text-white py-2 px-4 rounded mb-4"
              onClick={toggleAllJuz}
            >
              {allSelected ? 'Hapus Semua Juz' : 'Pilih Semua Juz'}
            </button>
          </div>
          <div className="mb-4">
            <button type="submit" className="btn btn-primary w-full bg-blue-600 text-white py-2 px-4 rounded">Tampilkan</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default FormSection;

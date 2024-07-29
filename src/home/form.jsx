// FormSection.jsx
import React, { useState, useEffect } from 'react';
import Divider from '../report/divider';

const FormSection = () => {
  const juzNumbers = Array.from({ length: 30 }, (_, i) => i + 1);
  const [allSelected, setAllSelected] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedJuz, setSelectedJuz] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const toggleAllJuz = () => {
    const checkboxes = document.getElementsByName('juzSelection');
    const newSelectedJuz = allSelected ? [] : juzNumbers;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = !allSelected;
    });
    setAllSelected(!allSelected);
    setSelectedJuz(newSelectedJuz);
  };

  const handleSubmit = () => {
    console.log('Selected Juz:', selectedJuz);
    console.log('Text area value:', textareaValue);
    Divider(selectedJuz, textareaValue);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedJuz((prev) =>
      event.target.checked ? [...prev, value] : prev.filter((juz) => juz !== value)
    );
  };

  useEffect(() => {
    setIsButtonDisabled(!textareaValue.trim() || selectedJuz.length === 0);
  }, [textareaValue, selectedJuz]);

  return (
    <div className="container mx-auto my-10 p-4">
      <form id="entry">
        <fieldset className="border p-4">
          <legend className="text-2xl font-bold mb-4">Pengaturan</legend>
          <div className="mb-4">
            <label htmlFor="memberSelection" className="form-label block text-lg mb-2">
              Tulis Nama Anggota (Pisahkan dengan Koma)
            </label>
            <textarea
              className="form-control w-full p-2 border rounded"
              id="memberSelection"
              rows="3"
              placeholder="contoh: Ilham, Ragil, Akhdan"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="form-label block text-lg mb-2">Pilih Juz</label>
            <div className="flex flex-wrap justify-center">
              {juzNumbers.map((num) => (
                <div key={num} className="w-1/6 p-2 text-left">
                  <div className="form-check">
                    <input
                      className="form-check-input mr-2"
                      type="checkbox"
                      value={num}
                      name="juzSelection"
                      id={`juz-${num}`}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor={`juz-${num}`}>
                      {num}
                    </label>
                  </div>
                </div>
              ))}
            </div>
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
            <button
              id="tampilkanButton"
              type="button"
              className={`btn w-full py-2 px-4 rounded ${
                isButtonDisabled ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white'
              }`}
              onClick={handleSubmit}
              disabled={isButtonDisabled}
            >
              Tampilkan
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default FormSection;

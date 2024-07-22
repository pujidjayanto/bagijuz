export default function Home() {
  const checkboxes = [];
  for (let i = 1; i <= 30; i++) {
    checkboxes.push(
      <div key={i}>
        <input type="checkbox" id={`checkbox-${i}`} />
        <label htmlFor={`checkbox-${i}`}>{i}</label>
      </div>
    );
  }

  return (
    <>
      <h1>Membantu Pembagian Juz berkelompok</h1>
      <h2>Pengaturan</h2>
      <form action="">
        <label> Tulis Nama Anggota (pisahkan dengan koma)</label>
        <textarea />
        {checkboxes}
        <button type="submit"> Tampilkan </button>
      </form>
      <button> Pilih Semua </button>
      <button> Hapus Semua </button>
    </>
  )
}
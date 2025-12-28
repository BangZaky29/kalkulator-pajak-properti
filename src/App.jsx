import { useState } from 'react';
import './App.css';
import LogoNuansaLegal from './assets/NS_white_01.png';


function App() {
  const [inputType, setInputType] = useState('njop');
  const [njopValue, setNjopValue] = useState('');
  const [location, setLocation] = useState('Jakarta');
  const [activeTab, setActiveTab] = useState('jual-beli');
  
  // Form states untuk Jual Beli Tanah
  const [pajakPenjual, setPajakPenjual] = useState('');
  const [pajakPembeli, setPajakPembeli] = useState('');
  const [pengecekanSertipikat, setPengecekanSertipikat] = useState('');
  const [aktaJualBeli, setAktaJualBeli] = useState('');
  const [daftarBalikNama, setDaftarBalikNama] = useState('');
  const [zonaNilaiTanah, setZonaNilaiTanah] = useState('');
  const [kasNegaraBN, setKasNegaraBN] = useState('');
  const [validasi, setValidasi] = useState('');
  
  // Form states untuk Waris Tanah
  const [pajakWaris, setPajakWaris] = useState('');
  const [zonaNilaiTanahWaris, setZonaNilaiTanahWaris] = useState('');
  const [pengecekanSertipikatWaris, setPengecekanSertipikatWaris] = useState('');
  const [kasNegaraBNWaris, setKasNegaraBNWaris] = useState('');
  const [daftarBalikNamaWaris, setDaftarBalikNamaWaris] = useState('');
  const [validasiWaris, setValidasiWaris] = useState('');
  
  // Form states untuk Hibah
  const [pajakBalikNamaHibah, setPajakBalikNamaHibah] = useState('');
  const [kasNegaraBNHibah, setKasNegaraBNHibah] = useState('');
  const [pengecekanSertipikatHibah, setPengecekanSertipikatHibah] = useState('');
  const [validasiHibah, setValidasiHibah] = useState('');
  const [aktaHibah, setAktaHibah] = useState('');
  const [zonaNilaiTanahHibah, setZonaNilaiTanahHibah] = useState('');
  const [daftarBalikNamaHibah, setDaftarBalikNamaHibah] = useState('');
  const [skb, setSkb] = useState('');

  const formatRupiah = (angka) => {
    if (!angka) return '';
    const number = angka.toString().replace(/[^,\d]/g, '');
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const handleNjopChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setNjopValue(value);
  };

  const hitungPajak = () => {
    if (!njopValue) {
      alert('Mohon masukkan nilai NJOP/Nilai Transaksi');
      return;
    }

    const nilai = parseFloat(njopValue);
    const nilaiTransaksi = inputType === 'transaksi' ? nilai : 0;
    const njop = inputType === 'njop' ? nilai : 0;

    if (activeTab === 'jual-beli') {
      // Perhitungan Pajak Penjual (PPh)
      let pphPenjual = 0;
      if (inputType === 'transaksi') {
        if (nilaiTransaksi > njop) {
          pphPenjual = (nilaiTransaksi - njop) * 0.025;
        } else {
          pphPenjual = nilaiTransaksi * 0.025;
        }
      } else {
        pphPenjual = njop * 0.025;
      }

      // Perhitungan Pajak Pembeli (BPHTB) - 5%
      const bphtb = (nilai - 80000000) * 0.05;

      // Nilai Baku (Fixed Values)
      const sertipikat = 850000; // Pengecekan Sertifikat
      const akta = 3500000; // Akta Jual Beli
      const validasiValue = 1000000; // Validasi
      const balikNama = 3000000; // Daftar Balik Nama

      setPajakPenjual(formatRupiah(pphPenjual.toFixed(0)));
      setPajakPembeli(formatRupiah(bphtb.toFixed(0)));
      setPengecekanSertipikat(formatRupiah(sertipikat.toString()));
      setAktaJualBeli(formatRupiah(akta.toString()));
      setDaftarBalikNama(formatRupiah(balikNama.toString()));
      setZonaNilaiTanah('Belum diketahui!');
      setKasNegaraBN('Belum diketahui!');
      setValidasi(formatRupiah(validasiValue.toString()));
    } else if (activeTab === 'waris') {
      // Perhitungan untuk Waris
      const pajakWarisValue = nilai * 0.025; // 2.5%
      
      // Nilai Baku (Fixed Values)
      const sertipikatWaris = 850000;
      const validasiWarisValue = 1000000;
      const balikNamaWarisValue = 3000000;

      setPajakWaris('Belum diketahui!');
      setZonaNilaiTanahWaris('Belum diketahui!');
      setPengecekanSertipikatWaris(formatRupiah(sertipikatWaris.toString()));
      setKasNegaraBNWaris('Belum diketahui!');
      setDaftarBalikNamaWaris(formatRupiah(balikNamaWarisValue.toString()));
      setValidasiWaris(formatRupiah(validasiWarisValue.toString()));
    } else if (activeTab === 'hibah') {
      // Perhitungan untuk Hibah
      const pajakHibahValue = nilai * 0.05; // 5%
      
      // Nilai Baku (Fixed Values)
      const sertipikatHibahValue = 850000;
      const validasiHibahValue = 1000000;
      const aktaHibahValue = 3500000;
      const balikNamaHibahValue = 3000000;

      setPajakBalikNamaHibah('Belum diketahui!');
      setKasNegaraBNHibah('Belum diketahui!');
      setPengecekanSertipikatHibah(formatRupiah(sertipikatHibahValue.toString()));
      setValidasiHibah(formatRupiah(validasiHibahValue.toString()));
      setAktaHibah(formatRupiah(aktaHibahValue.toString()));
      setZonaNilaiTanahHibah('Belum diketahui!');
      setDaftarBalikNamaHibah(formatRupiah(balikNamaHibahValue.toString()));
      setSkb('Belum diketahui!');
    }
  };

  const calculateTotalPengurusan = () => {
    const parseValue = (str) => {
      if (str === 'Belum diketahui!' || !str) return 0;
      return parseFloat(str.replace(/\./g, '')) || 0;
    };
    
    if (activeTab === 'jual-beli') {
      // Total = Pajak Penjual + Pajak Pembeli + Pengecekan Sertipikat + Akta Jual Beli + Daftar Balik Nama + Validasi
      const total = 
        parseValue(pajakPenjual) +
        parseValue(pajakPembeli) +
        parseValue(pengecekanSertipikat) +
        parseValue(aktaJualBeli) +
        parseValue(daftarBalikNama) +
        parseValue(validasi);
      
      return formatRupiah(total.toFixed(0));
    } else if (activeTab === 'waris') {
      // Total = Pajak Waris + Pengecekan Sertipikat + Daftar Balik Nama + Validasi
      const total = 
        parseValue(pajakWaris) +
        parseValue(pengecekanSertipikatWaris) +
        parseValue(daftarBalikNamaWaris) +
        parseValue(validasiWaris);
      
      return formatRupiah(total.toFixed(0));
    } else if (activeTab === 'hibah') {
      // Total = Pajak Balik Nama Hibah + Pengecekan Sertipikat + Akta Hibah + Daftar Balik Nama + Validasi
      const total = 
        parseValue(pajakBalikNamaHibah) +
        parseValue(pengecekanSertipikatHibah) +
        parseValue(aktaHibah) +
        parseValue(daftarBalikNamaHibah) +
        parseValue(validasiHibah);
      
      return formatRupiah(total.toFixed(0));
    }
    
    return '0';
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="logo">
            <img src={LogoNuansaLegal} alt="Nuansa Legal" style={{ width: '98px', height: '98px', objectFit: 'contain' }} />
          </div>
          <div className="header-text">
            <h1>KALKULATOR PAJAK PROPERTI</h1>
            <p className="subtitle">Hitung perkiraan biaya pajak dan notaris untuk jual-beli, hibah dan waris properti</p>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="hero-section">
        </div>

        <div className="container">
          <div className="calculator-card">
            <div className="input-section">
              <div className="input-group">
                <label>
                  NJOP / Nilai Transaksi
                  <span className="info-icon">ⓘ</span>
                </label>
                <div className="input-wrapper">
                  <span className="currency">Rp</span>
                  <input
                    type="text"
                    value={formatRupiah(njopValue)}
                    onChange={handleNjopChange}
                    placeholder="0"
                  />
                </div>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="njop"
                      checked={inputType === 'njop'}
                      onChange={(e) => setInputType(e.target.value)}
                    />
                    NJOP
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="transaksi"
                      checked={inputType === 'transaksi'}
                      onChange={(e) => setInputType(e.target.value)}
                    />
                    Nilai Transaksi
                  </label>
                </div>
              </div>

              <div className="input-group">
                <label>Lokasi</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="KABUPATEN BOGOR">KABUPATEN BOGOR</option>
                  <option value="KOTA BOGOR">KOTA BOGOR</option>
                  <option value="KABUPATEN BANDUNG BARAT">KABUPATEN BANDUNG BARAT</option>
                  <option value="KABUPATEN SUMEDANG">KABUPATEN SUMEDANG</option>
                  <option value="KOTA CILEGON">KOTA CILEGON</option>
                </select>
              </div>

              <button className="hitung-btn" onClick={hitungPajak}>
                Hitung
              </button>
            </div>
          </div>

          <div className="result-section">
            <h2>Biaya yang Perlu Anda Siapkan</h2>

            <div className="tabs">
              <button
                className={activeTab === 'jual-beli' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('jual-beli')}
              >
                Jual Beli Tanah
              </button>
              <button
                className={activeTab === 'waris' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('waris')}
              >
                Waris Tanah
              </button>
              <button
                className={activeTab === 'hibah' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('hibah')}
              >
                Hibah
              </button>
            </div>

            <div className="result-content">
              {activeTab === 'jual-beli' && (
                <div className="result-grid">
                  <div className="result-column">
                    <div className="form-field">
                      <label>Pajak Penjual</label>
                      <input type="text" value={pajakPenjual} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Pajak Pembeli</label>
                      <input type="text" value={pajakPembeli} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Pengecekan Sertipikat</label>
                      <input type="text" value={pengecekanSertipikat} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Akta Jual Beli</label>
                      <input type="text" value={aktaJualBeli} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Daftar Balik Nama</label>
                      <input type="text" value={daftarBalikNama} readOnly />
                    </div>
                  </div>

                  <div className="result-column">
                    <div className="form-field">
                      <label>Zona Nilai Tanah</label>
                      <input type="text" value={zonaNilaiTanah} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Kas Negara BN</label>
                      <input type="text" value={kasNegaraBN} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Validasi</label>
                      <input type="text" value={validasi} readOnly />
                    </div>
                    <div className="total-field">
                      <label>Total Biaya Pengurusan</label>
                      <input type="text" value={calculateTotalPengurusan()} readOnly />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'waris' && (
                <div className="result-grid">
                  <div className="result-column">
                    <div className="form-field">
                      <label>Pajak Waris</label>
                      <input type="text" value={pajakWaris} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Pengecekan Sertipikat</label>
                      <input type="text" value={pengecekanSertipikatWaris} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Daftar Balik Nama</label>
                      <input type="text" value={daftarBalikNamaWaris} readOnly />
                    </div>
                  </div>

                  <div className="result-column">
                    <div className="form-field">
                      <label>Zona Nilai Tanah</label>
                      <input type="text" value={zonaNilaiTanahWaris} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Kas Negara BN</label>
                      <input type="text" value={kasNegaraBNWaris} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Validasi</label>
                      <input type="text" value={validasiWaris} readOnly />
                    </div>
                    <div className="total-field">
                      <label>Total Biaya Pengurusan</label>
                      <input type="text" value={calculateTotalPengurusan()} readOnly />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hibah' && (
                <div className="result-grid">
                  <div className="result-column">
                    <div className="form-field">
                      <label>Pajak Balik Nama Hibah</label>
                      <input type="text" value={pajakBalikNamaHibah} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Pengecekan Sertipikat</label>
                      <input type="text" value={pengecekanSertipikatHibah} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Akta Hibah</label>
                      <input type="text" value={aktaHibah} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Daftar Balik Nama</label>
                      <input type="text" value={daftarBalikNamaHibah} readOnly />
                    </div>
                  </div>

                  <div className="result-column">
                    <div className="form-field">
                      <label>Zona Nilai Tanah</label>
                      <input type="text" value={zonaNilaiTanahHibah} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Kas Negara BN</label>
                      <input type="text" value={kasNegaraBNHibah} readOnly />
                    </div>
                    <div className="form-field">
                      <label>Validasi</label>
                      <input type="text" value={validasiHibah} readOnly />
                    </div>
                    <div className="form-field">
                      <label>SKB</label>
                      <input type="text" value={skb} readOnly />
                    </div>
                    <div className="total-field">
                      <label>Total Biaya Pengurusan</label>
                      <input type="text" value={calculateTotalPengurusan()} readOnly />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="notes-section">
              <h3>Catatan</h3>
              <div className="notes-content">
                <div className="note-column">
                  <h4>Untuk Jual-Beli:</h4>
                  <ul>
                    <li>Luas Tanah pada Sertipikat & PBB jika berbeda, maka menggunakan yang lebih besar</li>
                    <li>Jika Nilai Transaksi {'>'} NJOP, maka angka menggunakan perhitungan: (Nilai Transaksi - NJOP) x 5%</li>
                    <li>Jika Nilai Transaksi =/{'<'} NJOP, maka angka menggunakan perhitungan: NJOP x 30%</li>
                  </ul>
                </div>
                <div className="note-column">
                  <h4>Untuk Hibah:</h4>
                  <ul>
                    <li>Nilai NJOP dapat dilihat dalam PBB</li>
                    <li>Pajak Hibah dibayarkan oleh Penerima Hibah (SSB)</li>
                    <li>Jika Pemberi Hibah sudah memiliki SKB maka tidak lagi perlu membayar PPh kepada Penerima Hibah</li>
                    <li>Harus memiliki hubungan keluarga antara pemberi dan penerima hibah</li>
                  </ul>
                </div>
              </div>

              <div className="disclaimer">
                <h4>Disclaimer</h4>
                <p>• Hasil perhitungan kalkulator diatas hanya sebagai gambaran besaran (kurang lebih) pajak dan biaya dapat diperkirakan untuk kepentingan jual beli, waris dan hibah tanah. Untuk hasil yang lebih akurat, Anda dapat melampirkan copy sertifikat, pbb dan bukti bayar tahun berjalan dan dokumen pendukung lainnya kepada tim nuansalegal.id.</p>
                <p>• Perhitungan Pajak Pembeli dan Penjual, Biaya Validasi, Zona Nilai Tanah dan Kas Negara Balik Nama merupakan biaya resmi yang akan disetorkan ke Negara. Bukti pembayaran atas pajak tersebut akan diserahkan kepada Klien bersama dengan dokumen sertipikat yang telah selesai.</p>
                <p className="highlight">Perhitungan jual beli rumah tidak sebatas membayar biaya pembelian atau menerima uang pembelian, tetapi masih terdapat biaya-biaya lain yang harus Anda perhitungkan.</p>
                <p>Posisi Anda sebagai pembeli atau penjual, keduanya akan dikenakan pajak. Jika Anda seorang penjual, maka Anda akan dikenakan pajak penghasilan (PPh) atas tanah dan rumah yang Anda jual. Sebagai pembeli Anda akan dikenakan Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB).</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>Kalkulator Pajak Properti - Hitung Pajak Penghasilan</p>
            <p>&copy; 2022 Nuansa Solution | All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
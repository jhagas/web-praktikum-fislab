type Nilai = {
  prelab: number;
  abstrak: number;
  pendahuluan_metodologi: number;
  postlab: number;
  kesimpulan: number;
  format: number;
  waktu: number;
};

type Praktikan = {
  id: any;
  kelompok: any;
  kode_praktikum: any;
  nilai: any;
  profiles: {
    full_name: any;
    nrp: any;
    avatar_url: any;
  };
};

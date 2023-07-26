export const desc : any = {
  prelab: { nama: "Pre-Lab dan In-Lab", min: 1, max: 10, bobot: "45%" },
  abstrak: { nama: "Abstrak", min: 1, max: 10, bobot: "5%" },
  pendahuluan_metodologi: {
    nama: "Pendahuluan & Metodologi",
    min: 1,
    max: 10,
    bobot: "4%",
  },
  postlab: { nama: "Post-Lab", min: 1, max: 10, bobot: "30%" },
  kesimpulan: { nama: "Kesimpulan", min: 1, max: 10, bobot: "4%" },
  format: { nama: "Format POMITS", min: 1, max: 10, bobot: "4%" },
  waktu: { nama: "Ketepatan Waktu", min: 0, max: 1, bobot: "8%" },
};

export function hitungNilai(nilai: Nilai) {
  let hasil = 0;
  hasil += nilai.prelab * 45;
  hasil += nilai.abstrak * 5;
  hasil += nilai.pendahuluan_metodologi * 4;
  hasil += nilai.postlab * 30;
  hasil += nilai.kesimpulan * 4;
  hasil += nilai.format * 4;
  hasil += nilai.waktu * 80;
  hasil = hasil / 10;
  return hasil;
}

export function unique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}

export function titleCase(str: any) {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}

// const mulaiKuliah = "08/28/2023";
const mulaiKuliah = "07/10/2023";

export function mingguKuliah(date? : any) {
  const awal = new Date(mulaiKuliah) as any;
  let sekarang : any;
  if (!date) {
    sekarang = new Date();
  } else {
    sekarang = new Date(date);
  }
  const minggu = Math.floor((sekarang - awal) / 3600000 / 24 / 7) + 1;

  const mulai = minggu < 0 ? false : true;
  const selesai = minggu > 16 ? true : false;

  return { minggu, mulai, selesai };
}

export function rangeMinggu(week: number) {
  const date = new Date("02/06/2023");
  const today = new Date(date.setDate(date.getDate() + 7 * (week - 1)));

  const awalMinggu = new Date(
    today.setDate(today.getDate() - today.getDay() + 1)
  );
  const akhirMinggu = new Date(
    today.setDate(today.getDate() - today.getDay() + 7)
  );

  return { awalMinggu, akhirMinggu };
}

export const mingguList = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
];

export const weekdays = [13.5, 16, 18.5];
export const saturday = [9, 12.5, 15, 18.5];

export function convertTime(data: number) {
  const hour = Math.floor(data);
  const minute = (data % 1) * 60;

  const hourFormat = hour < 10 ? `0${hour}` : hour;
  const minuteFormat = minute < 10 ? `0${minute}` : minute;
  const string = `${hourFormat}:${minuteFormat}`;

  return string;
}

export function inRangeMinggu(a: Date) {
  let array = [];
  const limit = 6 - (a.getDay() - 1);

  for (let i = 0; i < limit; i++) {
    const awal = new Date(a);
    awal.setDate(awal.getDate() + i);

    if ((limit === 7) && (i === 0)) {
      continue;
    }

    if (i < limit - 1) {
      for (let j = 0; j < weekdays.length; j++) {
        const temp2 = new Date(awal);
        temp2.setHours(temp2.getHours() + weekdays[j]);
        temp2.setMinutes((weekdays[j] % 1) * 60);

        const timer = new Date(temp2);
        array.push(timer);
      }
    } else {
      for (let j = 0; j < saturday.length; j++) {
        const temp3 = new Date(awal);
        temp3.setHours(temp3.getHours() + saturday[j]);
        temp3.setMinutes((saturday[j] % 1) * 60);

        const timer = new Date(temp3);
        array.push(timer);
      }
    }
  }
  return array;
}

export function sortStringArray(a: any, b: any){
  let fa = a.profiles.nrp.toLowerCase(),
    fb = b.profiles.nrp.toLowerCase();

  if (fa < fb) {
    return -1;
  }
  if (fa > fb) {
    return 1;
  }
  return 0;
}

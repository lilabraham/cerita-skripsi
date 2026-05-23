export interface CommentItem {
  id: string;
  name: string;
  avatarColor: string; // Untuk warna profil acak
  message: string;
  date: string;
  likes: number;
}

export const initialComments: CommentItem[] = [
  {
    id: "1",
    name: "Siswa SMAN 1",
    avatarColor: "bg-indigo-500",
    message: "Ternyata selama ini aku salah paham. Aku kira HIV bisa nular lewat gigitan nyamuk. Makasih materinya, sangat mencerahkan! 🙌",
    date: "2 jam yang lalu",
    likes: 12,
  },
  {
    id: "2",
    name: "Anonim_99",
    avatarColor: "bg-teal-500",
    message: "Kak, kalau misalnya ada teman kita yang ODHIV, cara terbaik buat support mereka gimana ya biar mereka nggak merasa dijauhi?",
    date: "5 jam yang lalu",
    likes: 8,
  },
  {
    id: "3",
    name: "Pejuang UTBK",
    avatarColor: "bg-orange-500",
    message: "Kuisnya seru banget! Lebih gampang masuk ke otak daripada baca buku teks yang tebel-tebel. 🔥",
    date: "1 hari yang lalu",
    likes: 24,
  },
];
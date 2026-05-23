export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  duration: string;
}

export const videoData: VideoItem[] = [
  {
    id: "vid-1",
    youtubeId: "J2X3fR4V5T0", // ID youtube dummy (ganti nanti dengan ID aslimu)
    title: "Edukasi Dasar: Mengenal HIV & AIDS Lebih Dekat",
    category: "Dasar HIV",
    duration: "05:20"
  },
  {
    id: "vid-2",
    youtubeId: "Y8h_b8U6ZKw", 
    title: "Mitos dan Fakta Penularan - Wajib Tahu!",
    category: "Mitos vs Fakta",
    duration: "03:45"
  },
  {
    id: "vid-3",
    youtubeId: "xZ4VbU2P8R", 
    title: "Cara Efektif Melindungi Diri & Sesama",
    category: "Pencegahan",
    duration: "06:15"
  }
];
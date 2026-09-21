# Hidden History: Detektif Sumber

Game mini HistoryVerse untuk Sejarah Tingkatan 1 — membezakan sumber pertama dan sumber kedua.

## Cara guna di GitHub Pages
1. Cipta repository baru.
2. Upload semua fail/folder daripada ZIP ini ke root repository.
3. Settings → Pages → Deploy from a branch.
4. Pilih `main` dan `/ (root)`, kemudian Save.

## Struktur
- `index.html` — paparan game
- `style.css` — reka bentuk responsif
- `game.js` — misi, skor, nyawa, hint dan hotspot
- `assets/museum-scene.png` — scene muzium 3D

## Mudah maintain
Kedudukan objek, jenis sumber, nama dan penerangan semuanya berada dalam array `objects` di `game.js`.
Misi pula berada dalam array `missions`. Jadi tak perlu ubah keseluruhan game untuk tambah soalan.

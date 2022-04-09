const mockRefKategoriAnggaran = [
	{
		id: 1,
		nama: "Pemeliharaan",
		ref_sub_kategori_anggarans: [
			{
				id: 1,
				nama: "Kendaraan",
			},
			{
				id: 2,
				nama: "Mesin",
			},
			{
				id: 3,
				nama: "Inventaris",
			},
		],
	},
	{
		id: 2,
		nama: "Barang & Jasa",
		ref_sub_kategori_anggarans: [
			{
				id: 4,
				nama: "Porto",
			},
			{
				id: 5,
				nama: "Percetakan",
			},
			{
				id: 6,
				nama: "ATK",
			},
			{
				id: 7,
				nama: "Supply Komputer",
			},
		],
	},
	{
		id: 3,
		nama: "Umum lainnya",
		ref_sub_kategori_anggarans: [
			{
				id: 8,
				nama: "Representasi",
			},
			{
				id: 9,
				nama: "Rapat",
			},
		],
	},
];

export default mockRefKategoriAnggaran;
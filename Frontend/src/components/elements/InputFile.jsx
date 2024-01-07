export default function InputFile() {
  return (
    <label htmlFor="img" className="rounded-md">
      <input
        type="file"
        name="img"
        id="img"
        multiple={false}
        aria-label="Masukkan Gambar Makanan"
        className="block w-full px-2 py-1 text-orange-950 border border-orange-500 rounded-md cursor-pointer bg-orange-50/50"
      />
    </label>
  )
}

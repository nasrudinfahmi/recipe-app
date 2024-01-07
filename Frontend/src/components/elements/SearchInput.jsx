export default function SearchInput() {
  return (
    <div className="w-full h-max flex items-center border-search-wrapper focus-within:outline-2 shadow">
      <label htmlFor="input" className="basis-full flex">
        <input
          type="search"
          name="search-recipe"
          id="search-recipe"
          placeholder="Cari resep ..."
          className="w-full mx-auto py-1 ps-2 sm:ps-3 pe-1 outline-none"
        />
      </label>
      <select name="type-search" id="type-search" className="select-style">
        <option value="title">Nama Masakan</option>
        <option value="main-ingredient">Bahan Utama</option>
      </select>
    </div>
  )
}

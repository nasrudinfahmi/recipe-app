import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom"

export default function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { search } = useLocation()
  const [keyQuery, setKeyQuery] = useState(() => {
    const keyQueryParams = search?.split('=')[0]?.split("?")[1] || 'mainIngre'
    return keyQueryParams
  })
  const [valueQuery, setValueQuery] = useState(() => {
    const valueQuery = searchParams.get('mainIngre') || searchParams.get('title') || ''
    return valueQuery
  })

  const handleSearchInput = (e) => {
    const valueQueryParams = (e.target.value)
    setValueQuery(valueQueryParams)
  }

  const handleSelectChange = (e) => {
    const keyQueryParams = e.target.value
    setKeyQuery(keyQueryParams)
  }

  useEffect(() => {
    if (valueQuery) {
      setSearchParams({ [keyQuery]: valueQuery })
    }
    if (valueQuery === '') {
      setSearchParams({})
    }
  }, [keyQuery, valueQuery])

  return (
    <div className="w-full h-max flex items-center border-search-wrapper focus-within:outline-2 shadow">
      <label htmlFor="input" className="basis-full flex">
        <input
          type="search"
          name="search-recipe"
          id="search-recipe"
          placeholder="Cari resep ..."
          className="w-full mx-auto py-1 ps-2 sm:ps-3 pe-1 outline-none"
          spellCheck={false}
          autoComplete="off"
          value={valueQuery}
          onChange={handleSearchInput}
        />
      </label>
      <select name="type-search" id="type-search" className="select-style" onChange={handleSelectChange} value={keyQuery}>
        <option value="mainIngre">Bahan Utama</option>
        <option value="title">Nama Masakan</option>
      </select>
    </div>
  )
}
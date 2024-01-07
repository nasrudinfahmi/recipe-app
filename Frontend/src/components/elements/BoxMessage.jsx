export default function BoxMessage() {
  const handleInputMessage = (e) => {
    const message = e.target.innerHTML
    if (message === '') {
      e.target.classList.add('message-box')
    } else {
      e.target.classList.remove('message-box')
    }
  }

  return (
    <div
      className="relative block text-orange-950 w-full message-box min-h-32 lg:min-h-44 xl:min-h-60 p-3 2xl:min-h-80 border border-1 border-orange-500 rounded-md"
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onInput={(e) => handleInputMessage(e)}
    />
  )
}

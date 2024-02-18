function Dropdown(array, placeholder) {
  return (
    <div>
      <select className="form-select" aria-label="Default select example">
        <option selected disabled value="">{placeholder}</option>
        {array?.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
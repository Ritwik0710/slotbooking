function Checkbox(change) {
  return (
    <div  className="form-check">
      <input
        style ={{"borderColor" : "lightgrey"}}
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
        onChange={change()}
      />
    </div>
  );
}
export default Checkbox;

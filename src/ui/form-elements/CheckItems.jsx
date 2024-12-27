const CheckItems = ({ item, setSelected, selected }) => {
  const isSelected = selected?.find((i) => i?.id === item?.id);

  const handleChange = () => {
    if (isSelected) {
      setSelected((prev) => prev.filter((i) => i?.id !== item?.id));
    } else {
      setSelected((prev) => [...prev, item]);
    }
  };

  return (
    <div className={`addItem ${isSelected ? "active" : ""}`}>
      <label htmlFor={item?.id}>
        <h6>{item?.name}</h6>
        {isSelected ? (
          <i className="fa-light fa-xmark"></i>
        ) : (
          <i className="fa-light fa-plus"></i>
        )}
        <input
          type="checkbox"
          id={item?.id}
          name={item?.id}
          checked={isSelected}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default CheckItems;

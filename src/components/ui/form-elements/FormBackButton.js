export default function FormBackButton({ onClick }) {
  return (
    <button className="back" type="button" onClick={onClick}>
      <i className="fa-light fa-arrow-left" />
    </button>
  );
}

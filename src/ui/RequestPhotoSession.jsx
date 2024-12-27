export default function RequestPhotoSession() {
  return (
    <div className="request_photo_session">
      <div className="content">
        <h5>Request a Photo session</h5>
        <p>
          luxurious documentation that creatively highlights the beauty and
          luxury of the yacht.
        </p>
        <button onClick={(e) => e.preventDefault()}>Request Now</button>
      </div>
      <div className="bread_crumb">
        <img src="/images/photoSession.svg" alt="breadCrumb" />
      </div>
    </div>
  );
}

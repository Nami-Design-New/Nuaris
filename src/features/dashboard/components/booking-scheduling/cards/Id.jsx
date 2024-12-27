const Id = ({ booking }) => {
  return (
    <div className="strocked_wrapper">
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="title">ID</h6>
        </div>
        <div className="col-12 p-2">
          <div className="table">
            <table>
              <thead>
                <th>Name</th>
                <th>ID number</th>
                <th>Date of birth</th>
              </thead>
              <tbody>
                {booking?.clients.map((client, index) => (
                  <tr key={index}>
                    <td>{client.name}</td>
                    <td>{client.id_number}</td>
                    <td>{client.dob}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Id;

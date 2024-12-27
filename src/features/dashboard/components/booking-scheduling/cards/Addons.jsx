import { useSelector } from "react-redux";

function Addons({ booking }) {
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";
  return (
    <div className="strocked_wrapper">
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="title">Addons</h6>
        </div>
        <div className="col-12 p-2">
          <div className="table">
            <table>
              <thead>
                <th>Addon</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </thead>
              <tbody>
                {booking?.addons.map((addon, index) => (
                  <tr key={index}>
                    <td>{addon.addon_name}</td>
                    <td>{addon.quantity}</td>
                    <td>
                      {addon.price} {currency}
                    </td>
                    <td>
                      {addon.quantity * addon.price}
                      {currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addons;

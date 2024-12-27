import { useSelector } from "react-redux";

export default function BookedActivities({ booking }) {
  const currency = useSelector((state) => state?.authedUser?.currency) || "SAR";
  return (
    <div className="strocked_wrapper">
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="title">Activities</h6>
        </div>
        <div className="col-12 p-2">
          <div className="table">
            <table>
              <thead>
                <th>Activity</th>
                <th>Quantity</th>
                <th>Seats</th>
                <th>Price</th>
                <th>Total</th>
              </thead>
              <tbody>
                {booking?.booked_activities.map((ac, index) => (
                  <tr key={index}>
                    <td>{ac?.activity?.name}</td>
                    <td>{ac?.quantity}</td>
                    <td>{ac?.seats_count}</td>
                    <td>
                      {ac?.price?.price} {currency} / {ac?.price?.period?.name}
                    </td>
                    <td>
                      {ac?.price?.period?.type !== 6
                        ? ac?.price?.price * ac?.quantity
                        : ac?.price?.price * ac?.seats_count}{" "}
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

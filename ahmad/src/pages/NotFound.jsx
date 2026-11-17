import { Link } from "react-router-dom";
import { useTitle } from "../hooks";
import { ArtSlot } from "../components/Marks";

export default function NotFound() {
  useTitle("Not found", "That page is not on the AWS SBG CUI site.");
  return (
    <div className="page">
      <div className="wrap page-head has-ridge">
        <ArtSlot kind="peak" />
        <p className="kicker">404</p>
        <h1>That page is not on this site.</h1>
        <p className="lede">The session, the team, or Community Day is a better place to land.</p>
        <Link className="btn btn-light" to="/">
          Back to the start
        </Link>
      </div>
    </div>
  );
}

import React from "react";
import {Link} from "react-router-dom";

export default function Footer(props) {
  return (
    <>
      <Link to="/items/all" target="_blank">
        <div className="ext-footer">
          <img src="/images/logo-footer.svg" />
        </div>
      </Link>
    </>
  );
}

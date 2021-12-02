import React from "react";

import "../css/voucher.scss";
import img1 from "../assets/images/voucherHome/v1.jpeg";
import img2 from "../assets/images/voucherHome/v2.jpeg";
import img3 from "../assets/images/voucherHome/v3.jpeg";
import img4 from "../assets/images/voucherHome/v4.jpeg";

function VoucherHome() {
  return (
    <div className="voucher-introduction">
      <div className="block-voucher-introduction">
        <img className="img-voucher" src={img1} alt="voucher 1" />
        <img className="img-voucher ml-10" src={img2} alt="voucher 2" />
        <img className="img-voucher" src={img3} alt="voucher 3" />
        <img className="img-voucher ml-10" src={img4} alt="voucher 4" />
      </div>
    </div>
  );
}

export default VoucherHome;

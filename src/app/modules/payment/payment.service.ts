import { Booking } from "../booking/booking.model";
import { verifyPayment } from "./payment.util";

const paymentService = async (transactionId: string, status: string) => {
  console.log(transactionId, status);
  const verifyResponse = await verifyPayment(transactionId);
  let result;
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
    result = await Booking.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "paid" }
    );
  }
  return `<div style="text-align:center;margin-top:80px">
 <h3 style="color:#1572d3;">Payment ${status}</h3>
<p style="font-size:18px">Your reservation is all set! We're excited to serve you. You will be redirected shortly."</p>
<button style=" padding: 9px 30px;font-size: 18px;font-weight: 500;text-align: center;text-decoration: none;color: rgb(243, 243, 243);
  background-color: #1572d3;border: none;border-radius: 20px;"><a href="https://car-rental-reservation-system-sooty.vercel.app">Home</a></button>
  </div>`;
};

export const paymentServices = {
  paymentService,
};

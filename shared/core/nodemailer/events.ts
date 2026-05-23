import { Connection } from "./connection";
export const RegisterEvent = async () => {
  let conn = Connection.nodemailer();
  conn.on("error", (error) => {
    console.log("==========================================");
    console.error("Error Connecting to Nodemailer: ", error);
    console.log("==========================================");
  });

  conn.verify((error, success) => {
    if (error) {
      console.log("==========================================");
      console.error("Verification Failed: ", error);
      console.log("==========================================");
    } else {
      console.log("==========================================");
      console.log("Server is ready to take our messages: ", success);
      console.log("Nodemailer is set <-->");
      console.log("==========================================");
    }
  });
};

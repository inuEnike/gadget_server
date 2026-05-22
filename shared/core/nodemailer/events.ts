import { Connection } from "./connection";
export const RegisterEvent = async () => {
  let conn = Connection.nodemailer();
  conn.on("error", (error) => {
    console.log("==========================================");
    console.error("Error Connecting to Nodemailer: ", error?.message);
    console.log("==========================================");
  });

  conn.on("idle", () => {
    console.log("==========================================");
    console.log("Transport is ready to send more mail");
    console.log("==========================================");
  });
  conn.verify((error: Error | null, success: boolean) => {
    if (error) {
      console.log("==========================================");
      console.error("Verification Failed: ", error?.message);
      console.log("==========================================");
    } else {
      console.log("==========================================");
      console.log("Server is ready to take our messages: ", success);
      console.log("Nodemailer is set <-->");
      console.log("==========================================");
    }
  });
};

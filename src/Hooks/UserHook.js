import { create } from "zustand";
import { GetRequest, PostRequest, DeleteRequest } from "../Services/api";
import { Auth } from "../Services/Paths";
import male from "../assets/male_default_profile.jpg";
import female from "../assets/female_default_profile.jpg";

const USER_PATH = "user";

const styles = [
  {
    id: 1,
    name: "Dr. Mosimo B. Kagwang",
    specialization: "Internal Medicine",
    hospital: "Marupok Center",
    status: "Approved",
    url: male,
  },
  {
    id: 2,
    name: "Dr. Mosimo B. Kagwang",
    specialization: "Internal Medicine",
    hospital: "Marupok Center",
    status: "Pending",
    url: male,
  },
  {
    id: 3,
    name: "Dr. Mosimo B. Kagwang",
    specialization: "Internal Medicine",
    hospital: "Marupok Center",
    status: "Approved",
    url: male,
  },
  {
    id: 4,
    name: "Dr. Mosimo B. Kagwang",
    specialization: "Internal Medicine",
    hospital: "Marupok Center",
    status: "Pending",
    url: female,
  },
  {
    id: 5,
    name: "Dr. Mosimo B. Kagwang",
    specialization: "Internal Medicine",
    hospital: "Marupok Center",
    status: "Approved",
    url: female,
  },
];

const useUserHook = create((set) => ({
  user: null,
  usersData: styles,
  search: null,
  setSearch: (value) => set(() => ({ search: value })),
  signIn: (form, callBack) => {
    PostRequest({ url: `/signin` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => {
        const { data } = res;

        set(() => ({
          user: data,
        }));

        console.log(data);

        callBack(200, "/");
      })
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
  validateToken: async (token, callBack) => {
    GetRequest({ url: "validate-user" }, token)
      .then((res) => {
        const { statusText } = res;
        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        return res.data;
      })
      .then((res) => {
        const { data } = res;
        set(() => ({ user: data }));
        callBack(200, "/");
      })
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
  signUp: (form, callBack) => {
    PostRequest({ url: `${Auth}/signup` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => callBack(200, res.data))
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
  signOut: (callBack) => {
    DeleteRequest({ url: "signout" })
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        return res.data;
      })
      .then((res) => {
        const { data } = res.data;

        localStorage.clear();
        set(() => ({
          user: null,
        }));

        callBack(200, data);
      })
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
  sendRecoveryCode: (form, callBack) => {
    PostRequest({ url: `${Auth}/recovery` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => callBack(200, res.data))
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
  validateOTP: (form, callBack) => {
    PostRequest({ url: `${Auth}/recovery-validate` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => callBack(200, res.data))
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
  newPassword: (form, callBack) => {
    PostRequest({ url: `${Auth}/reset-password` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }

        return res.data;
      })
      .then((res) => callBack(200, res.data))
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
  registerAccount: (form, callBack) => {
    PostRequest({ url: `${Auth}/account` }, form)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        return res.data;
      })
      .then(() => callBack(200, "Registered successfully, Wait for approval."))
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
  getUserRecord: (token, callBack) => {
    GetRequest({ url: USER_PATH }, token)
      .then((res) => {
        const { statusText } = res;

        if (statusText !== "OK") {
          throw new Error("Bad response.", { cause: res });
        }
        return res.data;
      })
      .then((res) => {
        const { data } = res;

        set(() => ({ usersData: styles }));
        localStorage.setItem(USER_PATH, JSON.stringify(data));

        callBack(200, "success");
      })
      .catch((err) => {
        try {
          const {
            status,
            data: { message },
          } = err.response;

          callBack(status, message);
        } catch (err) {
          callBack(500, "Something went wrong.");
        }
      });
  },
}));

export default useUserHook;
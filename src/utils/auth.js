export const isUserLoggedIn = () => {
  let user = localStorage.getItem("asimovUsername2");
  try {
    if (user) {
      user = JSON.parse(user);
    }
  } catch (err) {
    console.log("err", err);
  }
  return user && user.username;
};

export const logout = () => {
  localStorage.removeItem("asimovUsername2");
};

export const getUsername = () => {
  let user = localStorage.getItem("asimovUsername2");
  try {
    if (user) {
      user = JSON.parse(user);
    }
  } catch (err) {
    console.log("err", err);
  }
  return user;
};

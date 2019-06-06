export function login(email, password) {
  var url = new URL("http://localhost:3001/users");
  var params = { email: email, password: password };
  url.search = new URLSearchParams(params);

  return fetch(url).then(response => {
    if (!response.ok) throw new Error("Network response was not okay.");
    return response
      .json()
      .then(users => {
        if (users.length !== 1) {
          throw new Error("Invalid username or password.");
        }
        return users[0];
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  });
}

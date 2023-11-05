export default class UserStorage {
  private static storage = localStorage;

  private static GetUser(): User {
    return JSON.parse(this.storage.getItem("user")!);
  }

  private static SetUser(key: string, data: string | boolean | number) {
    const store = this.GetUser();

    const merge = { ...store, [key]: data };

    this.storage.setItem("user", JSON.stringify(merge));
  }

  static getFirstName() {
    try {
      return this.GetUser().first_name;
    } catch (error) {
      return undefined;
    }
  }
  static setFirstName(first_name: string) {
    this.SetUser("first_name", first_name);
  }

  static getLastName() {
    try {
      return this.GetUser().last_name;
    } catch (error) {
      return undefined;
    }
  }
  static setLastName(last_name: string) {
    this.SetUser("last_name", last_name);
  }

  static getEmail() {
    try {
      return this.GetUser().email;
    } catch (error) {
      return undefined;
    }
  }
  static setEmail(email: string) {
    return this.SetUser("email", email);
  }

  static getIsAuth() {
    let is_auth = false;

    try {
      is_auth = this.GetUser().is_auth;

      if (this.getToken()) is_auth = true;

      return is_auth;
    } catch (error) {
      return false;
    }
  }
  static setIsAuth(is_auth: boolean) {
    this.SetUser("is_auth", is_auth);
  }

  static setToken(token: string) {
    this.SetUser("token", token);
  }
  static getToken() {
    try {
      return this.GetUser().token;
    } catch (error) {
      return false;
    }
  }
}

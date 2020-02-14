import React, { Component } from "react";
import authService from "../services/authService";

class Profile extends Component {
  state = {};
  render() {
    const user = authService.getUsersData();
    return <h1>Welcome {user.name}</h1>;
  }
}

export default Profile;

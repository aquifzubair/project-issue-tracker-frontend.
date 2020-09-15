import axios from "axios";

export default axios.create({
  baseURL: "https://project-issue-tracker-backend.herokuapp.com"
});
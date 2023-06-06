import axios from "axios";
import { URL } from ".";

export const fetchUsers = ({ page }) => (
  axios.get(`${URL}/users/${page}`)
)

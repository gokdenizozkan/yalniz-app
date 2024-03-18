import axios from "axios";
import {API_URL as URL} from "@/config";

const API_URL = URL + "vets";

export async function findAll() {
  return await axios.get(API_URL)
}
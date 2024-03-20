import axios from "axios";
import {API_URL as URL} from "@/config";
import {ReportSaveRequest, ReportUpdateRequest} from "@/components/report/objects";

const API_URL = URL + "reports";

export async function findAll() {
  return await axios.get(API_URL)
}

export async function findById(id: number) {
  return await axios.get(`${API_URL}/${id}`)
}

export async function search(name: string) {
  return await axios.get(`${API_URL}/search?name=${name}`)
}

export async function findPetsById(id: number) {
  return await axios.get(`${API_URL}/${id}/pets`)
}

export async function save(values: ReportSaveRequest) {
  return await axios.post(API_URL, values)
}

export async function update(id: number, values: ReportUpdateRequest) {
  return await axios.put(`${API_URL}/${id}`, values)
}

export async function deleteById(id: number) {
  return await axios.delete(`${API_URL}/${id}`)
}

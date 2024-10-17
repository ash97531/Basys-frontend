import React, { useState } from 'react'
import axios from 'axios'
import { X, User, Calendar, Activity, FileText, Clipboard } from 'lucide-react'
import { addPatient } from '../api'

export default function AddPatientModal({ isOpen, onClose, onPatientAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    condition: '',
    medicalHistory: [],
    treatmentPlan: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleMedicalHistoryChange = (e) => {
    const { value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      medicalHistory: value.split(',').map(item => item.trim()),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await addPatient(formData)
      onPatientAdded(response.data)
      onClose()
    } catch (error) {
      console.error('Error adding patient:', error)
      setErrorMessage('Failed to add patient. Please try again.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50 backdrop-blur-sm"> {/* Added background overlay with blur */}
      <div className="relative w-full max-w-xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-2xl font-semibold">Add Patient</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-gray-300 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                <X size={24} />
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            {errorMessage && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-1">
                  <User size={16} className="inline mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 text-base rounded-md border-2 border-gray-300 shadow-sm bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-base font-medium text-gray-700 mb-1">
                  <Calendar size={16} className="inline mr-2" />
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 text-base rounded-md border-2 border-gray-300 shadow-sm bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="condition" className="block text-base font-medium text-gray-700 mb-1">
                  <Activity size={16} className="inline mr-2" />
                  Condition
                </label>
                <input
                  type="text"
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 text-base rounded-md border-2 border-gray-300 shadow-sm bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="medicalHistory" className="block text-base font-medium text-gray-700 mb-1">
                  <FileText size={16} className="inline mr-2" />
                  Medical History (comma-separated)
                </label>
                <input
                  type="text"
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory.join(', ')}
                  onChange={handleMedicalHistoryChange}
                  className="mt-1 block w-full px-3 py-2 text-base rounded-md border-2 border-gray-300 shadow-sm bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="e.g., Asthma, Diabetes"
                  required
                />
              </div>
              <div>
                <label htmlFor="treatmentPlan" className="block text-base font-medium text-gray-700 mb-1">
                  <Clipboard size={16} className="inline mr-2" />
                  Treatment Plan
                </label>
                <textarea
                  id="treatmentPlan"
                  name="treatmentPlan"
                  value={formData.treatmentPlan}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 text-base rounded-md border-2 border-gray-300 shadow-sm bg-white focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                ></textarea>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
            <button
              className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
              onClick={handleSubmit}
            >
              Add Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
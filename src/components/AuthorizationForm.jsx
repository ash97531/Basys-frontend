import React, { useState } from 'react'
import { submitAuthorizationRequest } from '../api'
import { Clipboard, FileText, Calendar, Activity, User, X } from 'lucide-react'

export default function AuthorizationForm({ patientId, handleCancel }) {
  const [formData, setFormData] = useState({
    treatmentType: '',
    insurancePlan: '',
    dateOfService: '',
    diagnosisCode: '',
    doctorNotes: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const requestData = { ...formData, patientId, status: 'pending' }
    try {
      await submitAuthorizationRequest(requestData)
      alert('Authorization request submitted successfully')
      handleCancel()
    } catch (error) {
      console.error('Error submitting authorization request:', error)
      alert('Failed to submit authorization request. Please try again.')
    }
  }

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <Clipboard className="mr-2" />
          Submit Authorization Request
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label htmlFor="treatmentType" className="block text-sm font-medium text-gray-700 mb-1">
            <FileText className="inline mr-2" />
            Treatment Type
          </label>
          <input
            type="text"
            id="treatmentType"
            name="treatmentType"
            value={formData.treatmentType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-base rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="insurancePlan" className="block text-sm font-medium text-gray-700 mb-1">
            <User className="inline mr-2" />
            Insurance Plan
          </label>
          <input
            type="text"
            id="insurancePlan"
            name="insurancePlan"
            value={formData.insurancePlan}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-base rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="dateOfService" className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline mr-2" />
            Date of Service
          </label>
          <input
            type="date"
            id="dateOfService"
            name="dateOfService"
            value={formData.dateOfService}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-base rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="diagnosisCode" className="block text-sm font-medium text-gray-700 mb-1">
            <Activity className="inline mr-2" />
            Diagnosis Code
          </label>
          <input
            type="text"
            id="diagnosisCode"
            name="diagnosisCode"
            value={formData.diagnosisCode}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-base rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
            required
          />
        </div>

        <div>
          <label htmlFor="doctorNotes" className="block text-sm font-medium text-gray-700 mb-1">
            <FileText className="inline mr-2" />
            Doctor's Notes
          </label>
          <textarea
            id="doctorNotes"
            name="doctorNotes"
            value={formData.doctorNotes}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full px-3 py-2 text-base rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-200"
          />
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  )
}
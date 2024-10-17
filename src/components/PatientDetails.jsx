import React, { useState, useEffect } from 'react'
import { getPatientById } from '../api'
import { User, Calendar, Activity, FileText, Clipboard } from 'lucide-react'

export default function PatientDetails({ patientId }) {
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true)
        const response = await getPatientById(patientId)
        setPatient(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch patient details')
        setPatient(null)
      } finally {
        setLoading(false)
      }
    }

    if (patientId) {
      fetchPatientDetails()
    }
  }, [patientId])

  if (!patientId) return (
    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
      <p className="text-gray-500 text-lg">Select a patient to view details.</p>
    </div>
  )

  if (loading) return (
    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-64 bg-red-100 rounded-lg">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  )

  if (!patient) return null

  return (
    <div className="bg-slate-100 mt-5 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <Calendar className="text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-semibold">{patient.age} years</p>
            </div>
          </div>
          <div className="flex items-center">
            <Activity className="text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Condition</p>
              <p className="font-semibold">{patient.condition}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <FileText className="text-gray-500 mr-2" />
            Medical History
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            {patient.medicalHistory.map((record, index) => (
              <li key={index} className="text-gray-700">{record}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Clipboard className="text-gray-500 mr-2" />
            Treatment Plan
          </h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{patient.treatmentPlan}</p>
        </div>
      </div>
    </div>
  )
}
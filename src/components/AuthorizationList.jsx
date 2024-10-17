import React, { useEffect, useState } from 'react'
import { getAuthorizationRequests } from '../api'
import { ClipboardList, Calendar, FileText, User, Activity, CheckCircle, XCircle, Clock } from 'lucide-react'

export default function AuthorizationList() {
  const [authorizations, setAuthorizations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuthorizations = async () => {
      try {
        const response = await getAuthorizationRequests()
        setAuthorizations(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching authorization requests:', error)
        setLoading(false)
      }
    }

    fetchAuthorizations()
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      default:
        return <XCircle className="w-5 h-5 text-red-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
          <ClipboardList className="w-8 h-8 mr-2 text-blue-600" />
          All Authorization Requests
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ul className="space-y-6">
            {authorizations.map((authorization) => (
              <li
                key={authorization._id}
                className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <div className="px-6 py-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {authorization.treatmentType}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center
                      ${authorization.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        authorization.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {getStatusIcon(authorization.status)}
                      <span className="ml-1">{authorization.status}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-gray-500" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Insurance Plan:</span> {authorization.insurancePlan}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Date of Service:</span>{' '}
                        {new Date(authorization.dateOfService).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-gray-500" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Diagnosis Code:</span> {authorization.diagnosisCode}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-gray-500" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Doctor's Notes:</span> {authorization.doctorNotes}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3">
                  <p className="text-xs text-gray-500">
                    Submitted on: {new Date(authorization.createdAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
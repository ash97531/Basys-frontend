import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getPatients } from '../api'
import { selectPatient } from '../actions/patientActions'
import { logout } from '../actions/authActions'
import AddPatientModal from './AddPatientModal'
import AuthorizationForm from './AuthorizationForm'
import { ChevronDown, ChevronUp, X, Search, Plus, FileText, LogOut } from 'lucide-react'
import PatientDetails from './PatientDetails'

export default function PatientDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [patients, setPatients] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [ageFilter, setAgeFilter] = useState('all')
  const [expandedPatientId, setExpandedPatientId] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [selectedPatientForAuth, setSelectedPatientForAuth] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1)
  }
  
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1)
  }

  const showAuthorizationForms = () => {
    navigate('/authorizations')
  }

  const handleAddPatientClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handlePatientAdded = (newPatient) => {
    setPatients((prevPatients) => [...prevPatients, newPatient])
  }
  
  const toggleExpand = (patientId) => {
    setExpandedPatientId((prevPatientId) =>
      prevPatientId === patientId ? null : patientId
    )
  }

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients(currentPage, 5)
        setPatients(response.data.patients)
        setTotalPages(response.data.totalPages)
      } catch (error) {
        console.error('Error fetching patients:', error)
      }
    }
    fetchPatients()
  }, [currentPage])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleAgeFilterChange = (age) => {
    setAgeFilter(age)
  }

  const handleSelectPatient = (patientId) => {
    dispatch(selectPatient(patientId))
  }

  const openAuthModal = (patientId) => {
    setSelectedPatientForAuth(patientId)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
    setSelectedPatientForAuth(null)
  }

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    if (ageFilter === 'all') return matchesSearch

    const patientAge = patient.age
    if (ageFilter === 'under18') return matchesSearch && patientAge < 18
    if (ageFilter === '18to35') return matchesSearch && patientAge >= 18 && patientAge <= 35
    if (ageFilter === '36to60') return matchesSearch && patientAge >= 36 && patientAge <= 60
    if (ageFilter === 'above60') return matchesSearch && patientAge > 60

    return matchesSearch
  })

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <button
            onClick={() => dispatch(logout())}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
        
        <div className="flex justify-end space-x-4 mb-6">
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            onClick={handleAddPatientClick}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Patient
          </button>
          <button
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
            onClick={showAuthorizationForms}
          >
            <FileText className="w-5 h-5 mr-2" />
            Show All Authorization Forms
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        <div className="mb-6">
          <span className="font-semibold mr-2">Filter by Age:</span>
          {['all', 'under18', '18to35', '36to60', 'above60'].map((age) => (
            <button
              key={age}
              onClick={() => handleAgeFilterChange(age)}
              className={`mr-2 px-3 py-1 rounded-md ${
                ageFilter === age
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition duration-300 ease-in-out`}
            >
              {age === 'all' ? 'All' : age === 'under18' ? 'Under 18' : age === 'above60' ? 'Above 60' : age.replace('to', '-')}
            </button>
          ))}
        </div>

        {filteredPatients.length > 0 ? (
          <ul className="space-y-4">
            {filteredPatients.map((patient) => (
              <li
                key={patient._id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
                      <p className="text-gray-600">Age: {patient.age}</p>
                      <p className="text-gray-600">Condition: {patient.condition}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => openAuthModal(patient._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
                      >
                        Request Authorization
                      </button>
                      <button
                        onClick={() => toggleExpand(patient._id)}
                        className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
                      >
                        {expandedPatientId === patient._id ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedPatientId === patient._id && (
                    <PatientDetails patientId={patient._id} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No patients found.</p>
        )}

        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } transition duration-300 ease-in-out`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } transition duration-300 ease-in-out`}
          >
            Next
          </button>
        </div>
      </div>

      <AddPatientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPatientAdded={handlePatientAdded}
      />

      {isAuthModalOpen && selectedPatientForAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <AuthorizationForm patientId={selectedPatientForAuth} handleCancel={closeAuthModal} />
          </div>
        </div>
      )}
    </div>
  )
}
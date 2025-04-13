import React, {useEffect, useState} from 'react'
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/ApiPaths.js'
import toast from 'react-hot-toast';
import {
  DashboardLayout,
  IncomeOverview,
  Modal,
  AddIncomeForm,
  IncomeList,
  DeleteAlert
} from '../index.js'

function Income() {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false)
  const [incomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  })

  const fetchIncomes = async () => {
    if(loading) return;
    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`)
      // console.log("All incomes:", response);
      
      if(response.data){
        setIncomeData(response.data.data)
      }
    } catch (error) {
      console.log("Error fetching incomes: ", error);
    } finally {
      setLoading(false)
    }
  }

  const handleAddIncome = async (data) => {
    const {amount, source, icon, date} = data;

    if(!source.trim()) {
      toast.error("Source is required.");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Invalid Amount!!")
      return;
    }
    if(!date) {
      toast.error("Date is required.")
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });
      setShowAddIncomeModal(false);
      toast.success("Income added successfully!!")
      fetchIncomes();

    } catch (error) {
      console.error("Error adding income", error);
    }

  }

  const deleteIncome = async (id) => {
    // console.log("Delete clicked id: ", id);
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({open: false, data: null});
      toast.success("Income details deleted successfully!!");
      fetchIncomes();
    } catch (error) {
      console.error("Error deleting income:", error.message);
    }
  }

  const handleDownloadIncomes = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );
    
      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "incomes.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details.");
    }
  }
  
  useEffect(() => {
    fetchIncomes();
  }, [])


  return (
    <DashboardLayout activeMenu="Income">
        <div className='my-5 mx-auto px-4'>
          <div className=''>
            <div className=''>
              <IncomeOverview
                transactions = {incomeData}
                onAddIncome = {() => setShowAddIncomeModal(true)}
              />
            </div>
          </div>

          <div className='mt-10'>
            <Modal 
              isOpen={showAddIncomeModal}
              onClose={() => setShowAddIncomeModal(false)}
              title="Add Income"
            >
              <div>
                <AddIncomeForm
                  onAddIncome = {handleAddIncome}
                />
              </div>
            </Modal>

            <IncomeList 
              transactions = {incomeData}
              onDelete = {(id) => {
                // console.log("Delete clicked id: ", id);
                
                setOpenDeleteAlert({open: true, data: id});
              }}
              onDownload = {handleDownloadIncomes}
            />

            <Modal
              isOpen={openDeleteAlert.open}
              onClose={() => setOpenDeleteAlert({open: false, data: null})}
              title= "Delete Income"
            >
              <DeleteAlert
                content="Are you sure to delete this income ?"
                onDelete = {() => deleteIncome(openDeleteAlert.data)}
              />
            </Modal>
          </div>
        </div>
    </DashboardLayout>
  )
}

export default Income

// onClose is triggered when a component (like a modal, dialog, or toast) is dismissed, 
// either by clicking a close button, pressing Esc, clicking outside, or programmatically closing it.
import React, {useEffect, useState} from 'react'
import axiosInstance from '../../utils/axiosInstance.js'
import { API_PATHS } from '../../utils/ApiPaths.js'
import toast from 'react-hot-toast';
import {
  DashboardLayout,
  ExpenseOverview,
  Modal,
  AddExpenseForm,
  ExpenseList,
  DeleteAlert
} from '../index.js'

function Expense() {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [ExpenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  })

  const fetchExpenses = async () => {
    if(loading) return;
    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`)
      console.log("All Expenses:", response);
      
      if(response.data){
        setExpenseData(response.data.data)
      }
    } catch (error) {
      console.log("Error fetching Expenses: ", error);
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (data) => {
    const {amount, category, icon, date} = data;

    if(!category.trim()) {
      toast.error("category is required.");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      });
      setShowAddExpenseModal(false);
      toast.success("Expense added successfully!!")
      fetchExpenses();

    } catch (error) {
      console.error("Error adding Expense", error);
    }

  }

  const deleteExpense = async (id) => {
    console.log("Delete clicked id: ", id);
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({open: false, data: null});
      toast.success("Expense details deleted successfully!!");
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting Expense:", error.message);
    }
  }

  const handleDownloadExpenses = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );
      
    
      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details.");
    }
    
  }
  
  useEffect(() => {
    fetchExpenses();
  }, [])


  return (
    <DashboardLayout activeMenu="Expense">
        <div className='my-5 mx-auto px-4'>
          <div className=''>
            <div className=''>
              <ExpenseOverview
                transactions = {ExpenseData}
                onAddExpense = {() => setShowAddExpenseModal(true)}
              />
            </div>
          </div>

          <div className='mt-10'>
            <Modal 
              isOpen={showAddExpenseModal}
              onClose={() => setShowAddExpenseModal(false)}
              title="Add Expense"
            >
              <div>
                <AddExpenseForm
                  onAddExpense = {handleAddExpense}
                />
              </div>
            </Modal>

            <ExpenseList 
              transactions = {ExpenseData}
              onDelete = {(id) => {
                // console.log("Delete clicked id: ", id);
                
                setOpenDeleteAlert({open: true, data: id});
              }}
              onDownload = {handleDownloadExpenses}
            />

            <Modal
              isOpen={openDeleteAlert.open}
              onClose={() => setOpenDeleteAlert({open: false, data: null})}
              title= "Delete Expense"
            >
              <DeleteAlert
                content="Are you sure to delete this Expense ?"
                onDelete = {() => deleteExpense(openDeleteAlert.data)}
              />
            </Modal>
          </div>
        </div>
    </DashboardLayout>
  )
}

export default Expense

// onClose is triggered when a component (like a modal, dialog, or toast) is dismissed, 
// either by clicking a close button, pressing Esc, clicking outside, or programmatically closing it.